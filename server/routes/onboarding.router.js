const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();
const { google } = require("googleapis");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
// This storage creates a upload folder that will save docs that were sent via google drive POST
const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, callback) {
    const extension = file.originalname.split(".").pop();
    callback(null, `${file.fieldname}-${Date.now()}.${extension}`);
  },
});
const upload = multer({ storage: storage });

// it's attempting to parse the JSON from the process.env.REACT_APP_GOOGLE_JSON_KEY environment variable,
// but if that variable is not defined or is an empty string, it will use an empty object ({}) as a default value to avoid a potential error when calling JSON.parse.
const googleJsonKey = JSON.parse(process.env.REACT_APP_GOOGLE_JSON_KEY || {});

/**
 * The single client GET
 */
router.get("/client/:id", (req, res) => {
  const clientId = [Number(req.params.id)];

  // in query updated client table to c, user to u, service to s... for readability
  const sqlQuery = `
  SELECT
    c.id AS client_id,
    c.business_name,
    c.address_street,
    c.address_city,
    c.address_state,
    c.address_zip,
    c.website,
    c.phone,
    c.hours_of_operation,
    c.micromarket_location,
    c.neighborhood_info,
    c.demographics,
    c.number_of_people,
    c.target_age_group,
    c.industry,
    c.pictures,
    c.dimensions,
    c.wugs_visit,
    c.contract,
    c.last_active,
    s.status_name,
    u.first_name,
    u.last_name,
    u.username,
      ARRAY(SELECT DISTINCT service.service_name FROM client_service JOIN service ON client_service.service_id = service.id WHERE client_service.client_id = c.id) AS service_names,
      ARRAY(SELECT DISTINCT product.type FROM client_product JOIN product ON client_product.product_id = product.id WHERE client_product.client_id = c.id) AS product_types,
      ARRAY(SELECT DISTINCT client_product.product_id FROM client_product WHERE client_product.client_id = c.id) AS product_ids
    FROM
      client AS c
    JOIN
      "user" AS u ON c.manager_id = u.id
    LEFT JOIN
      status AS s ON c.status_id = s.id
    WHERE
      c.id = $1;
  `;
  pool
    .query(sqlQuery, clientId)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error on single client GET", error);
      res.sendStatus(500);
    });
});

// Service Choice router ------------------------------------------------------------------------------------------------------------------

// This route handles a PUT request to update a client's service choices.
router.put("/servicechoice/:id", (req, res) => {
  // Log the request body for debugging purposes.
  console.log("req.body is:", req.body);

  // Extract the client ID from the request parameters.
  const client_id = Number(req.params.id);

  // Extract the array of service IDs from the request body.
  const service_id = req.body.service_id; // Assuming service_id is an array

  // Define a query to delete the existing service choices for the client.
  const deleteQuery = `DELETE FROM client_service WHERE client_id = $1`;
  const deleteValues = [client_id];

  // Use a connection pool to execute the delete query.
  pool
    .query(deleteQuery, deleteValues)
    .then(() => {
      // Use a loop to insert multiple rows into the client_service table.

      // Define a query to insert the new service choices for the client.
      const insertQuery = `
        INSERT INTO client_service (client_id, service_id)
        SELECT $1, unnest($2::int[]);
      `;
      const insertValues = [client_id, service_id];

      // Execute the insert query to update the service choices.
      return pool.query(insertQuery, insertValues);
    })
    .then(() => {
      // Log a success message and send a 200 (OK) response to the client.
      console.log("successful PUT");
      res.sendStatus(200);
    })
    .catch((err) => {
      // If an error occurs, log an error message and send a 500 (Internal Server Error) response.
      console.log("Error completing PUT service query", err);
      res.sendStatus(500);
    });
});

// Client Location router ------------------------------------------------------------------------------------------------------------------

// This route handles a PUT request to update client location information.

router.put("/clientlocationinfo/:id", (req, res) => {
  const clientId = Number(req.params.id);

  // Create an array of query parameters for the SQL update statement.
  let queryParams = [
    req.body.business_name, //1
    req.body.address_street, //2
    req.body.address_city, //3
    req.body.address_state, //4
    req.body.address_zip, //5
    req.body.website, //6
    req.body.phone, //7
    req.body.hours_of_operation, //8
    req.body.micromarket_location, //9
    clientId, //10
  ];

  // Define the SQL update statement to modify client location information.
  let sqlText = `
  UPDATE client
  SET 
    business_name = $1,
    address_street = $2,
    address_city = $3,
    address_state = $4,
    address_zip = $5,
    website = $6,
    phone = $7,
    hours_of_operation = $8,
    micromarket_location = $9,
    last_active = NOW()
  WHERE client.id = $10;
  `;

  pool
    .query(sqlText, queryParams)
    .then((result) => {
      // Log a success message and send a 200 (OK) response to the client.
      console.log("successful PUT");
      res.sendStatus(200);
    })
    .catch((err) => {
      // If an error occurs, log the error message and send a 500 (Internal Server Error) response.

      console.log(err);
      res.sendStatus(500);
    });
});

// Demographic router ------------------------------------------------------------------------------------------------------------------

// This route handles a PUT request to update client demographic information.

router.put("/demographics/:id", (req, res) => {
  // Extract the client ID from the request parameters.
  const clientId = Number(req.params.id);
  console.log("clientId:", clientId);

  // Create an array of query parameters for the SQL update statement.
  let queryParams = [
    req.body.number_of_people, // 1
    req.body.demographics, // 2
    req.body.neighborhood_info, // 3
    req.body.industry, // 4
    req.body.age_group, // 5
    clientId, // 6
  ];

  // Define the SQL update statement to modify client demographic information.
  let queryText = `
    UPDATE client
    SET 
      number_of_people = $1,
      demographics = $2,
      neighborhood_info = $3,
      industry = $4,
      target_age_group = $5,
      last_active = NOW()
    WHERE client.id = $6;
  `;

  // Use the connection pool to execute the SQL update query.
  pool
    .query(queryText, queryParams)
    .then((result) => {
      // Log a success message and send a 200 (OK) response to the client.
      console.log("successful PUT");
      res.sendStatus(200);
    })
    .catch((err) => {
      // If an error occurs, log the error message and send a 500 (Internal Server Error) response.
      console.log(err);
      res.sendStatus(500);
    });
});

// Product Choice router ------------------------------------------------------------------------------------------------------------------

// This route handles a POST request to update client food preferences.

router.post("/foodpreferences", (req, res) => {
  // Extract the client ID and selected product IDs from the request body.
  const client_id = req.body.client_id;
  const product_ids = req.body.clickedButtons;

  // Define a query to delete client product preferences that are not in the updated list.
  const deleteQuery = `DELETE FROM client_product WHERE client_id = $1 AND product_id NOT IN (${product_ids.join()})`;
  const deleteValues = [client_id];

  // Use the connection pool to execute the delete query.
  pool
    .query(deleteQuery, deleteValues)
    .then(() => {
      // Define a query to insert the updated client product preferences.
      // The "ON CONFLICT" clause ensures that conflicts (duplicates) are handled by doing nothing.
      const insertQuery = `
        INSERT INTO client_product (client_id, product_id)
        SELECT $1, unnest($2::int[])
        ON CONFLICT (client_id, product_id) DO NOTHING
      `;

      const insertValues = [client_id, product_ids];

      // Execute the insert query to update the client's food preferences.
      return pool.query(insertQuery, insertValues);
    })
    .then(() => {
      // Log a success message and send a 200 (OK) response to the client.
      console.log("successful POST");
      res.sendStatus(200);
    })
    .catch((err) => {
      // If an error occurs, log the error message and send a 500 (Internal Server Error) response.
      console.log("Error completing POST food preferences query", err);
      res.sendStatus(500);
    });
});

// addtional info router ------------------------------------------------------------------------------------------------------------------

// This route handles a PUT request to update additional client information.

router.put("/additionalinfo/:id", (req, res) => {
  // Extract the client ID from the request parameters.
  const clientId = Number(req.params.id);
  console.log("clientId:", clientId);

  // Create an array of query parameters for the SQL update statement.
  const queryParams = [
    req.body.dimensions, // 1
    req.body.wugs_visit, // 2
    clientId, // 3
  ];

  // Define the SQL update statement to modify additional client information.
  const queryText = `
    UPDATE client
    SET 
      dimensions = $1,
      wugs_visit = $2,
      last_active = NOW()
    WHERE client.id = $3;
  `;

  // Use the connection pool to execute the SQL update query.
  pool
    .query(queryText, queryParams)
    .then((result) => {
      // Log a success message and send a 200 (OK) response to the client.
      console.log("successful PUT");
      res.sendStatus(200);
    })
    .catch((err) => {
      // If an error occurs, log the error message and send a 500 (Internal Server Error) response.
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * PUT - transaction type PUT for 2 queries!
 */

// This route handles a PUT request to change contact information for a client.

// Require authentication using 'rejectUnauthenticated' middleware.

router.put("/changecontact/:id", rejectUnauthenticated, async (req, res) => {
  // Extract the client ID from the request parameters.
  const clientId = Number(req.params.id);
  console.log("clientId:", clientId);
  console.log("req.body:", req.body);

  // Define query parameters for updating client and user information.
  const clientQueryParams = [
    req.body.phone, // 1
    clientId, // 2
  ];

  const userQueryParams = [
    req.body.first_name, // 1
    req.body.last_name, // 2
    req.body.username, // 3
    req.body.user_id, // 4
  ];

  // Establish a database connection and start a transaction.
  const connection = await pool.connect();

  try {
    await connection.query("BEGIN");

    // Define SQL statements for updating client and user tables.
    const clientSqlText = `
      UPDATE client
      SET 
        phone = $1,
        last_active = NOW()
      WHERE id = $2;
    `;

    const userSqlText = `
      UPDATE "user"
      SET 
        first_name = $1,
        last_name = $2,
        username = $3
      WHERE id = $4;
    `;

    // Execute the client update query.
    await connection.query(clientSqlText, clientQueryParams);

    // Execute the user update query.
    await connection.query(userSqlText, userQueryParams);

    // Commit the transaction if everything was successful.
    await connection.query("COMMIT");
    res.sendStatus(200);
  } catch (error) {
    // Roll back the transaction and handle any errors.
    await connection.query("ROLLBACK");
    console.log("Transaction Error - Rolling back transfer", error);
    res.sendStatus(500);
  } finally {
    // Release the database connection.
    connection.release();
  }
});

// post for pictures
router.post("/upload/pictures/:id", upload.array("files"), async (req, res) => {
  try {
    // Set up Google Drive authentication using service account credentials
    const auth = new google.auth.GoogleAuth({
      credentials: googleJsonKey, // Use the service account key file
      scopes: ["https://www.googleapis.com/auth/drive"], // Specify access scope for Google Drive
    });

    // Create a Google Drive client for API operations
    const drive = google.drive({
      version: "v3", // Use version 3 of the Google Drive API
      auth, // Authenticate using the 'auth' object
    });

    // Initialize an array to store information about uploaded files
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];

      // Use the Google Drive API to create a new file
      const response = await drive.files.create({
        requestBody: {
          name: file.originalname, // Set the file's name
          mimeType: file.mimetype, // Specify the MIME type of the file
          parents: ["16QMGnPCThQNWRsGubgH9CBDAAeuUaxom"], // Destination folder ID
        },
        media: {
          body: fs.createReadStream(file.path), // Read and upload the file from the server
        },
      });

      // Add information about the uploaded file to the 'uploadedFiles' array
      uploadedFiles.push(response.data);
    }

    // fileUrl = `https://drive.google.com/uc?id=${formData.id}`
    console.log("uploadedFiles.id", uploadedFiles[0].id);
    console.log("uploadedFiles array:", uploadedFiles);

    let uploadedFileURLs = [];
    for (let file of uploadedFiles) {
      const fileUrl = `https://drive.google.com/uc?id=${file.id}`;
      uploadedFileURLs.push(fileUrl);
    }
    console.log("uploadedFileURLs", uploadedFileURLs);
    console.log("client ID:", req.params.id);
    const sqlText = `
    UPDATE client
    SET pictures = pictures || $1
    WHERE id = $2;
    `;
    const queryParams = [uploadedFileURLs, req.params.id];
    pool
      .query(sqlText, queryParams)
      .then(() => {
        console.log("successful PUT for pictures");
        res.send({ files: uploadedFiles });
      })
      .catch((err) => {
        console.log("Error completing PUT service query", err);
        res.sendStatus(500);
      });
  } catch (error) {
    // Handle and log any errors that occur during the file upload process
    console.error(error);
    res.sendStatus(500);
  }
});

// post for contract
router.post("/upload/contract/:id", upload.array("files"), async (req, res) => {
  try {
    // Set up Google Drive authentication using service account credentials
    const auth = new google.auth.GoogleAuth({
      credentials: googleJsonKey, // Use the service account key file
      scopes: ["https://www.googleapis.com/auth/drive"], // Specify access scope for Google Drive
    });

    // Create a Google Drive client for API operations
    const drive = google.drive({
      version: "v3", // Use version 3 of the Google Drive API
      auth, // Authenticate using the 'auth' object
    });

    // Initialize an array to store information about uploaded files
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];

      // Use the Google Drive API to create a new file
      const response = await drive.files.create({
        requestBody: {
          name: file.originalname, // Set the file's name
          mimeType: file.mimetype, // Specify the MIME type of the file
          parents: ["16QMGnPCThQNWRsGubgH9CBDAAeuUaxom"],
        },
        media: {
          body: fs.createReadStream(file.path), // Read and upload the file from the server
        },
      });

      // Add information about the uploaded file to the 'uploadedFiles' array
      uploadedFiles.push(response.data);
    }



    let uploadedFileURLs = [];
    for (let file of uploadedFiles) {
      const fileUrl = `https://drive.google.com/uc?id=${file.id}`;
      uploadedFileURLs.push(fileUrl);
    }

    const sqlText = `
    UPDATE client
    SET contract = contract || $1
    WHERE id = $2;
    `;
    const queryParams = [uploadedFileURLs, req.params.id];
    pool
      .query(sqlText, queryParams)
      .then(() => {
        console.log("successful PUT for contract");
        res.send({ files: uploadedFiles });
      })
      .catch((err) => {
        console.log("Error completing PUT service query", err);
        res.sendStatus(500);
      });
  } catch (error) {
    // Handle and log any errors that occur during the file upload process
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;

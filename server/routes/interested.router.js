const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

/**
 * GET route template
 */
router.get("/", (req, res) => {
  const query = `SELECT * FROM interested ORDER BY id DESC`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all user", err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  console.log('req.body:', req.body);
  const queryParams = [
    req.body.name,  //1
    req.body.email,  //2
    req.body.phone_number,  //3
    req.body.industry,  //4
    req.body.about_you,  //5
    req.body.why_wugs  //6
  ];

  const sqlQuery = `
        INSERT INTO interested (name, email, phone_number, industry, about_you, why_wugs)
        VALUES
        ($1, $2, $3, $4, $5, $6);
    `;
  pool.query(sqlQuery, queryParams)
    .then(result => {
      console.log("success with POST server-side")
      res.sendStatus(201);
    })
    .catch(error => {
      console.log("error with POST server-side:", error)
      res.sendStatus(500);
    })
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const interestedId = req.params.id;

  const deleteQuery1 = "DELETE FROM interested WHERE interested.id=$1";

  // Execute the first DELETE query
  pool
    .query(deleteQuery1, [interestedId])

    .then(() => {
      // Both DELETE operations were successful
      console.log("success with DELETE server-side")
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error DELETE /api/interested", error);
      res.sendStatus(500);
    });
});

module.exports = router;

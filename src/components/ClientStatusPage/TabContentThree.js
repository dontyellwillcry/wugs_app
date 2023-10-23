import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import "./TabContent.css"; 

const TabContentThree= () => {
  const client = useSelector((store) => store.client);
  const user= useSelector((store) => store.user)
  const history = useHistory();

  function handlePrevious(path) {
    switch (path) {
      case "/servicechoice":
        history.push("/servicechoice");
        break;
      case "/foodpreferences":
        history.push("/foodpreferences");
        break;
      case "/clientlocationinfo":
        history.push("/clientlocationinfo");
        break;
      case "/additionalinfo":
        history.push("/additionalinfo");
        break;
      case "/demographics":
        history.push("/demographics");
        break;
      default:
      // code block? Not sure what to add for default
    }
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          variant="outlined"
          onClick={() => handlePrevious("/clientlocationinfo")}
          sx={{
            width: "500px", // Set the desired width
            height: "400px", // Set the desired height
            backgroundColor: "#eaeaea",
            boxShadow: 5,
            color: "black",
            margin: "50px", // Adjust the margin as needed
          }}
          className="hover-card" 
        >
          <CardContent >
            <Typography sx={{ fontSize: 24 }} color="black" gutterBottom>
              Who we are...
            </Typography>
            <Typography variant="body2" component="div">
                      Point of Contact: {user.first_name} {user.last_name}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Email: {user.username}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Phone: {client.phone}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Business: {client.business_name}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Street Address: {client.address_street}
                    </Typography>
                    <Typography variant="body2" component="div">
                      State: {client.address_state}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Zip Code: {client.address_zip}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Website: {client.website}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Hours of Operation: {client.hours_of_operation}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Micro Market Location: {client.micromarket_location}
                    </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TabContentThree;

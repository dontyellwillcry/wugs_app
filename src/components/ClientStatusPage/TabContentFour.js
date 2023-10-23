import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import "./TabContent.css";

const TabContentFour = () => {
  const client = useSelector((store) => store.client);
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
          onClick={() => handlePrevious("/additionalinfo")}
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
          <CardContent>
            <Typography sx={{ fontSize: 24 }} color="black" gutterBottom>
              Additional info
            </Typography>
            <Typography variant="body2" component="div">
              Micro-market Area Dimensions:{client.dimensions}
            </Typography>
            <Typography variant="body2">
              Wugs Visit Requested: {client.wugs_visit ? "Yes" : "No"}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TabContentFour;

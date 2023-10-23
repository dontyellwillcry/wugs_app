import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Card, CardActions, CardContent, Button, Typography } from "@mui/material"
import FastfoodIcon from "@mui/icons-material/Fastfood";

// Path: /priming

function PrimingPage() {
  const history = useHistory();

  const styles = {
    cardContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "auto",
    },
    card: {
      borderRadius: 4,
      padding: 1,
      backgroundColor: "#484747",
      marginBottom: 5
    },
  };

  return (
    <div className="container">
      <Typography
        style={{ textAlign: "center" }}
        variant="h4"
        color="beige"
        marginBottom={3}
      >
        WELCOME
      </Typography>
      <Box sx={styles.cardContainer}>
        <Card elevation={15} sx={styles.card}>
          <CardContent>
            <Typography
              style={{ textAlign: "center" }}
              color="beige"
              variant="h5"
              component="div"
              marginBottom={2}
            >
              We're here to help <br /> your onboarding experience
            </Typography>
            <hr color="beige" />
            <Typography
              style={{ textAlign: "center" }}
              variant="body1"
              sx={{ mb: 1.5 }}
              padding={1}
              color="beige"
            >
              Here are some things that will help to complete the onboarding process:
            </Typography>
            <hr color="beige" />
            <Typography
              style={{ textAlign: "center" }}
              color="beige"
              variant="body1"
            >
              <br />
              Details about your business location
              <br />
              <br />
              Hours of operation and idea of who may frequent the vending areas
              <br />
              <br />
              Pictures of your space (optional)
              <br />
              <br />
              Dimensions of your space (optional)
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          </CardActions>
        </Card>
      </Box>
      <Button sx={{ display: "flex", margin: 'auto', padding: 3, borderRadius: 2, boxShadow: 12, marginBottom: 3 }}
        size="large"
        variant="contained"
        color="success"
        onClick={() => {
          history.push("/servicechoice");
        }}
      >
        <FastfoodIcon size="large" style={{ padding: 6 }} /> GET SNACKING!
      </Button>
    </div>
  );
}
export default PrimingPage;

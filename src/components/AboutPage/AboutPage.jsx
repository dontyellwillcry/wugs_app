import React from "react";
import { Typography, Box } from "@mui/material";

function AboutPage() {
  return (
    <div className="container">
      <Box
        margin={"auto"}
        component="form"
        sx={{
          backgroundColor: "transparent",
          borderRadius: 9,
          border: 'solid',
          borderColor: '#484747',
          width: 430,
          height: 830,
          padding: 1,
          marginBottom: 8,
          boxShadow: 24
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ textAlign: "center" }}>
          <Typography variant='h4' marginTop={3} marginBottom={3} style={{ color: "beige" }}>About Us</Typography>
        </div>{" "}
        <hr width={200} style={{ marginBottom: 40, color: "beige" }} />
        <div>
          <img
            src="https://thumb.tildacdn.com/tild6135-6332-4735-b064-643336306437/-/format/webp/IMG_5076.jpg"
            style={{ display: 'flex', margin: 'auto', height: 500, borderRadius: '15px' }}
            alt="Your Image"
          />
          <div style={{ textAlign: 'center', margin: 'auto', height: 140, width: 360 }}>
            <p>
              Wugs spurs inclusivity through global foods and beverages. Our
              convenient self-checkout markets serve to celebrate the diversity of
              your workplace. Our grab & go markets and smart fridges offer
              everything from delicious fresh sushi to flavorful Jarritos, plantain
              chips, and halal options.
            </p>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default AboutPage;

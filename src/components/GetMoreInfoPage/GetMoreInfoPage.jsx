import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Typography } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import "./GetMoreInfoPage.css";

// Path: /getmoreinfo

function GetMoreInfoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const [aboutClient, setAboutClient] = useState("");
  const [whyWugs, setWhyWugs] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  // captures characters into 3 groups, adding parentheses around first group and - between 2nd/3rd groups
  function getFormattedPhoneNum(input) {
    let output = "(";
    input.replace(
      /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/,
      function (match, g1, g2, g3) {
        if (g1.length) {
          output += g1;
          if (g1.length == 3) {
            output += ")";
            if (g2.length) {
              output += " " + g2;
              if (g2.length == 3) {
                output += " - ";
                if (g3.length) {
                  output += g3;
                }
              }
            }
          }
        }
      }
    );
    return output;
  }

  // Function to format the phone number as you type
  const handleFormatPhoneNumber = (event) => {
    const inputValue = event.target.value.replace(/\D/g, "");
    // Remove non-digit characters
    let formattedValue = getFormattedPhoneNum(inputValue);
    setPhone(formattedValue);
  };

  const handleConfirmSubmit = () => {
    setOpenConfirmation(false);
    history.push("/home");
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleSubmit = (event) => {
    setOpenConfirmation(true);
    event.preventDefault();

    let getMoreInfoObject = {
      name: name,
      email: email,
      phone_number: phone,
      industry: industry,
      about_you: aboutClient,
      why_wugs: whyWugs,
    };

    dispatch({ type: "NEW_INTERESTED", payload: getMoreInfoObject });

    setName("");
    setEmail("");
    setPhone("");
    setIndustry("");
    setAboutClient("");
    setWhyWugs("");
  };

  return (
    <div className="container">
      {/* <CssBaseline /> */}
      <div style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          marginTop={0}
          marginBottom={3}
          style={{ color: "beige" }}
        >
          Get In Touch With Us
        </Typography>
      </div>{" "}
      <Box
        margin={"auto"}
        component="form"
        sx={{
          backgroundColor: "#484747",
          borderRadius: 3,
          width: 850,
          padding: 2,
          boxShadow: 24,
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="name"
          label="Name"
          variant="standard"
          style={{ width: 800 }}
          inputProps={{ style: { color: "beige" }, maxLength: 45 }}
          InputLabelProps={{ style: { color: "beige" } }}
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "beige",
              },
              "&.Mui-focused fieldset": {
                borderColor: "beige",
              },
            },
          }}
        />
        <br />

        <TextField
          id="email"
          label="Email Address"
          variant="standard"
          style={{ width: 800 }}
          inputProps={{ style: { color: "beige" }, maxLength: 45 }}
          InputLabelProps={{ style: { color: "beige" } }}
          type="email"
          placeholder="john.doe@gmail.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray", 
              },
              "&:hover fieldset": {
                borderColor: "beige",
              },
              "&.Mui-focused fieldset": {
                borderColor: "beige",
              },
            },
          }}
        />
        <br />

        <TextField
          id="phone"
          label="Phone Number"
          variant="standard"
          style={{ width: 800 }}
          inputProps={{ style: { color: "beige" }, maxLength: 18 }}
          InputLabelProps={{ style: { color: "beige" } }}
          type="tel"
          placeholder="(123) 456-7890"
          value={phone}
          onChange={handleFormatPhoneNumber}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "beige",
              },
              "&.Mui-focused fieldset": {
                borderColor: "beige",
              },
            },
          }}
        />
        <br />

        <TextField
          id="industry"
          label="Business / Industry"
          variant="standard"
          style={{ width: 800 }}
          inputProps={{ style: { color: "beige" }, maxLength: 80 }}
          InputLabelProps={{ style: { color: "beige" } }}
          type="text"
          placeholder="School, Office, Warehouse, etc"
          value={industry}
          onChange={(event) => setIndustry(event.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "beige",
              },
              "&.Mui-focused fieldset": {
                borderColor: "beige",
              },
            },
          }}
        />
        <br />

        <TextField
          id="aboutClient"
          label="About You"
          variant="standard"
          style={{ width: 800 }}
          inputProps={{ style: { color: "beige" }, maxLength: 280 }}
          InputLabelProps={{ style: { color: "beige" } }}
          multiline
          rows={3}
          placeholder="Example: We operate a university library serving students and faculty."
          value={aboutClient}
          onChange={(event) => setAboutClient(event.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "beige",
              },
              "&.Mui-focused fieldset": {
                borderColor: "beige",
              },
            },
          }}
        />
        <br />

        <TextField
          id="whyWugs"
          label="What Brings You To Wugs Today?"
          variant="standard"
          style={{ width: 800 }}
          inputProps={{ style: { color: "beige" }, maxLength: 280 }}
          InputLabelProps={{ style: { color: "beige" } }}
          multiline
          rows={5}
          placeholder="Example: Having a mini-market on-site would be a great convenience for our students and staff."
          value={whyWugs}
          onChange={(event) => setWhyWugs(event.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "beige",
              },
              "&.Mui-focused fieldset": {
                borderColor: "beige",
              },
            },
          }}
        />
        <br />
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginRight: "200px",
        }}
      >
        <Button
          onClick={handleSubmit}
          sx={{
            marginTop: 1.5,
            marginLeft: 100,
            marginBottom: 30,
            height: 50,
            width: 120,
            borderRadius: 1,
          }}
          color="success"
          variant="contained"
          autoFocus
        >
          Submit
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            background: "beige",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          Thank You For Expressing Interest!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will be emailed soon with follow-up information. Once you click
            'Go Back' you will be redirected to the home page where you can get
            started on the onboarding process.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmSubmit}
            color="success"
            variant="contained"
            autoFocus
          >
            Go Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default GetMoreInfoPage;

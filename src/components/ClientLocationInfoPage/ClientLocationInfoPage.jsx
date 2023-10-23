import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, MenuItem, Select, Typography, FormControl, InputLabel, Grid, Box, TextField } from "@mui/material";
import MyStepper from "../MyStepper/MyStepper";

// Path: /clientlocationmoreinfo

function ClientLocationInfoPage() {
  const client = useSelector((store) => store.client);

  const allStates = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

  const [businessname, setBusinessName] = useState(client.business_name || "");
  const [businessnameError, setBusinessNameError] = useState("");
  const [addressStreet, setAddressStreet] = useState(client.address_street || "");
  const [addressStreetError, setAddressStreetError] = useState("");
  const [addressCity, setAddressCity] = useState(client.address_city || "");
  const [addressCityError, setAddressCityError] = useState("");
  const [addressState, setAddressState] = useState(client.address_state || "");
  const [addressZip, setAddressZip] = useState(client.address_zip || "");
  const [addressZipError, setAddressZipError] = useState("");
  const [website, setWebsite] = useState(client.website || "");
  const [phone, setPhone] = useState(client.phone || "");
  const [phoneError, setPhoneError] = useState("");

  const [hours, setHours] = useState(client.hours_of_operation || "");
  const [micromarket, setMicroMarket] = useState(client.micromarket_location || "");

  const [openConfirmation, setOpenConfirmation] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  // captures characters into 3 groups, adding parentheses around first group and - between 2nd/3rd groups
  // these functions are used to format a 10-digit US phone number as it's being typed: (XXX) XXX - XXXX)
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
    const errorMessageStyle = {
      color: "orange",
    };

    return output;
  }

  // Function to format the phone number as you type
  const handleFormatPhoneNumber = (event) => {
    const inputValue = event.target.value;
    // Remove non-digit characters
    let formattedValue = getFormattedPhoneNum(inputValue);
    setPhone(formattedValue);

    setPhoneError(validatePhoneNumber(formattedValue));
  };

  const validatePhoneNumber = (input) => {
    // Remove non-digit characters to check if it's empty
    const cleanValue = input.replace(/\D/g, "");
    return cleanValue.length === 0 ? "Phone Number is required" : "";
  };

  const handleStateSelect = (event) => {
    setAddressState(event.target.value);
  };

  const handleConfirmSubmit = () => {
    setOpenConfirmation(false);
    history.push("/demographics");
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleSubmit = () => {
    // .trim removes any unnecessary spaces from the text field.
    if (!businessname.trim()) {
      setBusinessNameError("Business Name is required");
      return;
    }
    if (!addressStreet.trim()) {
      setAddressStreetError("Street Name is required");
      return;
    }
    if (!addressCity.trim()) {
      setAddressCityError("City Name is required");
      return;
    }
    if (!addressZip.trim()) {
      setAddressZipError("Zip Code is required");
      return;
    }
    if (!phone.trim()) {
      setPhoneError("Phone Number is required");
      return;
    }

    let clientLocationInfoObject = {
      client_id: client.client_id,
      business_name: businessname,
      address_street: addressStreet,
      address_city: addressCity,
      address_state: addressState,
      address_zip: addressZip,
      website: website,
      phone: phone,
      hours_of_operation: hours,
      micromarket_location: micromarket,
    };
    dispatch({
      type: "UPDATE_CLIENT_LOCATION",
      payload: clientLocationInfoObject,
    });
    history.push("/demographics");
  };

  return (
    <div className="container">
      <div>
        <MyStepper step={1} />
      </div>
      <div style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          marginTop={3}
          style={{ color: "beige" }}
        >
          Location Information
        </Typography>
        <Typography
          variant="h6"
          marginTop={1}
          marginBottom={2}
          style={{ color: "beige" }}
        >
          Who Are We Serving?
        </Typography>
      </div>{" "}
      <Grid margin={"auto"} container spacing={-75}>
        <Box
          margin={"auto"}
          component="form"
          sx={{
            backgroundColor: "#484747",
            borderRadius: 3,
            width: 360,
            padding: 2,
            boxShadow: 24,
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="businessname"
            label="Business Name"
            variant="outlined"
            style={{ width: 310 }}
            inputProps={{ style: { color: "beige" }, maxLength: 90 }}
            InputLabelProps={{ style: { color: "beige" } }}
            type="text"
            placeholder="Business Name"
            value={businessname}
            onChange={(event) => {
              setBusinessName(event.target.value);
              setBusinessNameError(
                event.target.value.trim() === ""
                  ? "Business Name is required"
                  : ""
              );
            }}
            error={!!businessnameError}
            helperText={
              <span style={{ color: "yellow" }}>{businessnameError}</span>
            }
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
            id="addressStreet"
            label="Street Address"
            variant="outlined"
            style={{ width: 310 }}
            inputProps={{ style: { color: "beige" }, maxLength: 90 }}
            InputLabelProps={{ style: { color: "beige" } }}
            type="address"
            placeholder="123 Snack St N"
            value={addressStreet}
            onChange={(event) => {
              setAddressStreet(event.target.value);
              setAddressStreetError(
                event.target.value.trim() === ""
                  ? "Street Address is required"
                  : ""
              );
            }}
            error={!!addressStreetError}
            helperText={
              <span style={{ color: "yellow" }}>{addressStreetError}</span>
            }
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
            id="addressCity"
            label="City"
            variant="outlined"
            style={{ width: 310 }}
            inputProps={{ style: { color: "beige" }, maxLength: 90 }}
            InputLabelProps={{ style: { color: "beige" } }}
            type="text"
            placeholder="Minneapolis"
            value={addressCity}
            onChange={(event) => {
              setAddressCity(event.target.value);
              setAddressCityError(
                event.target.value.trim() === "" ? "City is required" : ""
              );
            }}
            error={!!addressCityError}
            helperText={
              <span style={{ color: "yellow" }}>{addressCityError}</span>
            }
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
          <FormControl variant="outlined" style={{ width: 310 }}>
            <InputLabel style={{ color: "beige" }} htmlFor="addressState">
              State
            </InputLabel>
            <Select
              id="addressState"
              value={addressState}
              onChange={handleStateSelect}
              defaultValue="MN"
              required
              sx={{
                "& .MuiSvgIcon-root":
                {
                  color: "beige !important"
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "gray",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "beige",
                },
                "& .MuiOutlinedInput-root": {
                  borderColor: "beige",
                  "&:hover fieldset": {
                    borderColor: "beige",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "beige",
                  },
                },
              }}
            >
              {allStates.map((stateAbbr) => (
                <MenuItem key={stateAbbr} value={stateAbbr}>
                  {stateAbbr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <br />
          <TextField
            id="addressZip"
            label="Zip Code"
            variant="outlined"
            style={{ width: 310 }}
            inputProps={{ style: { color: "beige" }, maxLength: 10 }}
            InputLabelProps={{ style: { color: "beige" } }}
            type="text"
            placeholder="55415"
            value={addressZip}
            onChange={(event) => {
              setAddressZip(event.target.value);
              setAddressZipError(event.target.value.trim() === "" ? "Zip is required" : "");
            }}
            error={!!addressZipError}
            helperText={
              <span style={{ color: "yellow" }}>{addressZipError}</span>
            }
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
        </Box>
        <Box
          margin={"auto"}
          component="form"
          sx={{
            backgroundColor: "#484747",
            borderRadius: 3,
            width: 360,
            padding: 2,
            boxShadow: 24,
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="website"
            label="Website (optional)"
            variant="outlined"
            style={{ width: 310 }}
            inputProps={{ style: { color: "beige" }, maxLength: 230 }}
            InputLabelProps={{ style: { color: "beige" } }}
            type="text"
            placeholder="munch.com"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
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
            variant="outlined"
            style={{ width: 310 }}
            inputProps={{ style: { color: "beige" }, maxLength: 17 }}
            InputLabelProps={{ style: { color: "beige" } }}
            type="tel"
            placeholder="(123) 456-7890"
            value={phone}
            onChange={handleFormatPhoneNumber}
            error={!!phoneError}
            helperText={phoneError}
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
            id="hours"
            label="Hours Of Operation?"
            variant="outlined"
            style={{ width: 310 }}
            inputProps={{ style: { color: "beige" }, maxLength: 150 }}
            InputLabelProps={{ style: { color: "beige" } }}
            multiline
            rows={1}
            placeholder="9am-5pm"
            value={hours}
            onChange={(event) => setHours(event.target.value)}
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
            id="micromarket"
            label="Micro-Market Location Inside Building"
            variant="outlined"
            style={{ width: 310 }}
            inputProps={{ style: { color: "beige" }, maxLength: 150 }}
            InputLabelProps={{ style: { color: "beige" } }}
            multiline
            rows={1}
            placeholder="Ex: Lobby, Cafeteria"
            value={micromarket}
            onChange={(event) => setMicroMarket(event.target.value)}
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
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "30px",
        }}
      >
        <Button
          onClick={handleSubmit}
          sx={{
            marginTop: 17,
            marginLeft: 2,
            height: 50,
            width: 150,
            borderRadius: 1,
            fontSize: "1.25em",
          }}
          color="success"
          variant="contained"
          autoFocus
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default ClientLocationInfoPage;

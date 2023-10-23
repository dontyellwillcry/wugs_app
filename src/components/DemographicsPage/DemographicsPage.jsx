import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MyStepper from "../MyStepper/MyStepper";
import HelpIcon from "@mui/icons-material/Help";
import { Button, Dialog, DialogContent, DialogContentText, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Box, Grid } from "@mui/material";

function DemographicsPage() {
  const client = useSelector((store) => store.client);
  const dispatch = useDispatch();
  const history = useHistory();

  const [peopleCount, setPeopleCount] = useState(client.number_of_people || "");
  const [demographics, setDemographics] = useState(client.demographics || "");
  const [ageGroup, setAgeGroup] = useState(client.target_age_group || "");
  const [industry, setIndustry] = useState(client.industry || "");
  const [neighborhood, setNeighborhood] = useState(
    client.neighborhood_info || ""
  );
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleChange = (event) => {
    setPeopleCount(event.target.value);
  };

  const handleHelpIconHover = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPosition({
      top: rect.top - 200,
      left: rect.left + rect.width,
    });
    setOpenConfirmation(true);
  };

  const handleHelpIconLeave = () => {
    setOpenConfirmation(false);
  };

  const postDemographics = () => {
    dispatch({
      type: "UPDATE_DEMOGRAPHICS",
      payload: {
        client_id: client.client_id,
        number_of_people: peopleCount,
        age_group: ageGroup,
        demographics: demographics,
        industry: industry,
        neighborhood_info: neighborhood,
      },
    });
    history.push("/foodpreferences");
  };

  return (
    <div className="container">
      <MyStepper step={2} />
      <div style={{ textAlign: "center" }}>
        <Typography variant="h4" marginTop={3} style={{ color: "beige" }}>
          About Your Community
        </Typography>
        <Typography variant="h6" marginTop={1} marginBottom={1} style={{ color: "beige" }}>
          Who Are You Serving?
        </Typography>
        <HelpIcon
          style={{ marginTop: 10, color: "beige" }}
          onMouseEnter={handleHelpIconHover}
        />
      </div>{" "}
      <div style={{ padding: "1em" }}>
        <Grid margin={"auto"}>
          <Box
            margin={"auto"}
            component="form"
            sx={{
              backgroundColor: "#484747",
              borderRadius: 3,
              width: 620,
              padding: 2,
              paddingY: 4,
              boxShadow: 24,
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl>
              <InputLabel style={{ color: "beige", marginLeft: 85 }} id="age-select-label">
                # of people on site
              </InputLabel>
              <Select
                labelId="age-select-label"
                id="age-select"
                value={peopleCount}
                label="# of people on site"
                inputProps={{ style: { color: "beige" } }}
                InputLabelProps={{ style: { color: "beige" } }}
                style={{ width: 400, marginLeft: 85 }}
                onChange={handleChange}
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
                <MenuItem value={"Less than 10"}>Less than 10</MenuItem>
                <MenuItem value={"10-25"}>10-25</MenuItem>
                <MenuItem value={"26-100"}>26-100</MenuItem>
                <MenuItem value={"100+"}>100+</MenuItem>
              </Select>
              <br />

              <TextField
                id="demographics"
                label="Demographics (optional)"
                variant="outlined"
                inputProps={{ style: { color: "beige" }, maxLength: 200 }}
                InputLabelProps={{ style: { color: "beige" } }}
                style={{ width: 400, marginLeft: 85 }}
                placeholder="Ex: Professional, International, Health Enthusiasts, Students, Senior Community, Eco-conscious, Tourist-heavy, Religious, Trendy, Urban, Rural..."
                value={demographics}
                multiline
                rows={3}
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
                onChange={(event) => setDemographics(event.target.value)}
              />
              <br />
              <TextField
                id="ageGroup"
                label="Age Group (optional)"
                variant="outlined"
                inputProps={{ style: { color: "beige" }, maxLength: 150 }}
                InputLabelProps={{ style: { color: "beige" } }}
                style={{ width: 400, marginLeft: 85 }}
                placeholder="Ex: Adults, Teens, Children (0-5 years), All Ages..."
                value={ageGroup}
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
                onChange={(event) => setAgeGroup(event.target.value)}
              />
              <br />
              <TextField
                id="industry"
                label="Industry"
                variant="outlined"
                inputProps={{ style: { color: "beige" }, maxLength: 200 }}
                InputLabelProps={{ style: { color: "beige" } }}
                style={{ width: 400, marginLeft: 85 }}
                placeholder="Ex: Office, School, Healthcare, Factory, Gym..."
                value={industry}
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
                onChange={(event) => setIndustry(event.target.value)}
              />
              <br />
              <TextField
                id="neighborhood"
                label="About Your Neighborhood (optional)"
                variant="outlined"
                multiline
                rows={4}
                style={{ width: 400, marginLeft: 85 }}
                inputProps={{ style: { color: "beige" } }}
                InputLabelProps={{ style: { color: "beige" } }}
                placeholder="Ex: In the area, there's a vending machine that offers a conventional selection of snacks like classic potato chips, standard chocolate bars, and popular soda brands."
                value={neighborhood}
                onChange={(event) => setNeighborhood(event.target.value)}
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
            </FormControl>
          </Box>
        </Grid>
      </div>
      <Dialog
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            background: "beige",
            position: "absolute",
            top: `${position.top}px`,
            left: `${position.left}px`,
          },
        }}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <strong># OF PEOPLE ON SITE:</strong>
            <br />
            Your best estimation of the number of people on site in any given day.
            <br />
            <br />
            <strong>DEMOGRAPHICS:</strong>
            <br />
            We'd love to hear about the culture and diversity of your
            location. This helps us to best serve you and provide recommendations for a unique selection of snacking options.
            <br />
            <br />
            <strong>AGE GROUP:</strong>
            <br />
            The general age groups of people who will use the services to help us provide product recommendations.
            <br />
            <br />
            <strong>INDUSTRY:</strong>
            <br />
            Describe the primary operations and business of your location.
            <br />
            <br />
            <strong>YOUR NEIGHBORHOOD:</strong>
            <br />
            If there are any neighboring vending or snack alternatives, kindly share any specifics about these options that customers might have access to. This information will assist us in offering distinctive products for this micro-market.
            <br />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "30px",
        }}
      >
        <Button
          onClick={postDemographics}
          sx={{
            marginTop: 1.5,
            marginLeft: 2,
            height: 50,
            width: 150,
            borderRadius: 1,
            fontSize: "1.25em"
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

export default DemographicsPage;

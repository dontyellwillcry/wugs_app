import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, Box, Container, Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import MyStepper from "../MyStepper/MyStepper";
import { PopupWidget } from "react-calendly";
import { withRouter } from 'react-router-dom';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Path: /clientstatus

const theme = createTheme({
  palette: {
    mode: "dark", // or 'dark' for the dark theme
  },
});

function ReviewPage() {
  const client = useSelector((store) => store.client);
  const user = useSelector((store) => store.user);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const history = useHistory();
  const rootElement = document.getElementById("popup-root");
  const dispatch = useDispatch();

  const handleSubmit1 = () => {
    history.push("/servicechoice");
  };
  const handleSubmit2 = () => {
    history.push("/foodpreferences");
  };
  const handleSubmit3 = () => {
    history.push("/demographics");
  };
  const handleSubmit4 = () => {
    history.push("/clientlocationinfo");
  };

  const handleSubmit5 = () => {
    history.push("/additionalinfo");
  };

  const openCalendlyLink = () => {
    Calendly.initPopupWidget({ url: "https://calendly.com/seleymolubah/meeting" });
  };

  const handleConfirmSubmit = () => {
    setOpenConfirmation(false);
    dispatch({
      type: "UPDATE_CLIENT",
      payload: {
        admin_notes: null,
        status_id: 2,
        id: client.client_id,
      },
    });
    dispatch({
      type: "FETCH_USER",
    });
    history.push("/home");
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
    event.preventDefault();
  };

  console.log("client", client);

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <MyStepper step={5} />
        <CssBaseline />
        <div style={{ textAlign: "center" }}>
          <Typography variant="h4" marginTop={3} style={{ color: "beige" }}>
            Review and Complete
          </Typography>
        </div>
        <Container
          maxWidth="lg"
          sx={{
            width: "100%",
            height: "60vh",
            marginBottom: "200px",
          }}
        >
          <div style={{ color: "beige", textAlign: "center" }}>
            <Typography variant="h6" marginTop={1} marginBottom={2}>
              Your Current Info With Wugs
            </Typography>
          </div>
          <hr width={800} style={{ color: "beige" }} />
          <br />
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={6} md={4}>
                <Card variant="outlined" sx={{ borderRadius: 3, height: 325, backgroundColor: '#484747', boxShadow: 5, overflowY: "auto" }}>
                  <CardContent>
                    <Box sx={{
                      display: "flex", justifyContent: "right",
                      flexDirection: "row",
                    }}>
                      <Button onClick={handleSubmit1}
                        sx={{

                          marginTop: 0,
                          marginLeft: 2,
                          height: 50,
                          width: 120,
                          borderRadius: 1,
                        }}
                        color="success"
                        variant="outlined"
                        autoFocus
                      >
                        Edit
                      </Button>
                    </Box>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="beige"
                      gutterBottom
                    >
                      Services:
                    </Typography>
                    {client.service_names ? (
                      client.service_names.map((service, index) => (
                        <Typography variant="h8" component="div" key={index}>
                          {service}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="h8" component="div">
                        None Indicated
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card variant="outlined" sx={{ borderRadius: 3, height: 325, backgroundColor: '#484747', boxShadow: 5, overflowY: "auto" }}>
                  <CardContent>
                    <Box sx={{
                      display: "flex", justifyContent: "right",
                      flexDirection: "row",
                    }}>
                      <Button onClick={handleSubmit4}
                        sx={{
                          marginTop: 0,
                          marginLeft: 2,
                          height: 50,
                          width: 120,
                          borderRadius: 1,
                        }}
                        color="success"
                        variant="outlined"
                        autoFocus
                      >
                        Edit
                      </Button>
                    </Box>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="beige"
                      gutterBottom
                    >
                      Location Info:
                    </Typography>
                    <Typography variant="body2" component="div">
                      Business Name: {client.business_name}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Street Address: {client.address_street}
                    </Typography>
                    <Typography variant="body2" component="div">
                      City: {client.address_city}
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
                      Phone Number: {client.phone}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Hours of Operation: {client.hours_of_operation}
                    </Typography>
                    <Typography variant="body2" component="div">
                      Micro Market Location: {client.micromarket_location}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card variant="outlined" sx={{ borderRadius: 3, height: 325, backgroundColor: '#484747', boxShadow: 5, overflowY: "auto" }}>
                  <CardContent>
                    <Box sx={{
                      display: "flex", justifyContent: "right",
                      flexDirection: "row",
                    }}>
                      <Button onClick={handleSubmit3}
                        sx={{
                          marginTop: 0,
                          marginLeft: 2,
                          height: 50,
                          width: 120,
                          borderRadius: 1,
                        }}
                        color="success"
                        variant="outlined"
                        autoFocus
                      >
                        Edit
                      </Button>
                    </Box>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="beige"
                      gutterBottom
                    >
                      About Your Community:
                    </Typography>
                    <Typography>
                      # of People on Site: {client.number_of_people}
                    </Typography>
                    <Typography>Demographics: {client.demographics}</Typography>
                    <Typography>
                      Age Group: {client.target_age_group}
                    </Typography>
                    <Typography>Industry: {client.industry}</Typography>
                    <Typography>
                      Neighborhood Info: {client.neighborhood_info}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card variant="outlined" sx={{ borderRadius: 3, height: 325, backgroundColor: '#484747', boxShadow: 5, overflowY: "auto" }}>
                  <CardContent>
                    <Box sx={{
                      display: "flex", justifyContent: "right",
                      flexDirection: "row",
                    }}>
                      <Button onClick={handleSubmit2}
                        sx={{
                          marginTop: 0,
                          marginLeft: 2,
                          height: 50,
                          width: 120,
                          borderRadius: 1,
                        }}
                        color="success"
                        variant="outlined"
                        autoFocus
                      >
                        Edit
                      </Button>
                    </Box>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="beige"
                      gutterBottom
                    >
                      Food Choices:
                    </Typography>
                    {client.product_types ? (
                      client.product_types.map((product, index) => (
                        <Typography variant="h8" component="div" key={index}>
                          {product}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="h8" component="div">
                        None Indicated
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card variant="outlined" sx={{ borderRadius: 3, height: 325, backgroundColor: '#484747', boxShadow: 5, overflowY: "auto" }}>
                  <CardContent>
                    <Box sx={{
                      display: "flex", justifyContent: "right",
                      flexDirection: "row",
                    }}>
                      <Button onClick={handleSubmit5}
                        sx={{
                          marginTop: 0,
                          marginLeft: 2,
                          height: 50,
                          width: 120,
                          borderRadius: 1,
                        }}
                        color="success"
                        variant="outlined"
                        autoFocus
                      >
                        Edit
                      </Button>
                    </Box>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="beige"
                      gutterBottom
                    >
                      Additional Information:
                    </Typography>
                    <Typography>
                      Space dimensions: {client.dimensions}
                    </Typography>
                    <Typography>
                      Visit Requested: {client.wugs_visit ? "Yes" : "No"}
                    </Typography>
                    <Typography variant='subtitle2'>
                      Feel free to schedule a meeting with Wugs here:
                    </Typography>
                    <Box sx={{
                      display: "flex", justifyContent: "center",
                      flexDirection: "row",
                    }}>
                      <Button onClick={openCalendlyLink}
                        sx={{
                          marginTop: 2,
                          marginLeft: 2,
                          height: 50,
                          width: 150,
                          borderRadius: 1,
                        }}
                        color="success"
                        variant="contained"
                        autoFocus
                      >
                        Schedule Meeting
                        <ScheduleIcon sx={{ marginLeft: 1 }} />
                      </Button>
                    </Box>

                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={4} container justifyContent="center" alignItems="center">
                <Box textAlign={"right"} >
                  <Button
                    onClick={handleOpenConfirmation}
                    sx={{
                      marginTop: 1.5,
                      marginLeft: 2,
                      height: 120,
                      width: 250,
                      borderRadius: 1,
                    }}
                    color="success"
                    variant="contained"
                    autoFocus
                    style={{ fontSize: "18px" }}
                  >
                    CONFIRM AND SUBMIT
                    <CheckCircleIcon sx={{ marginLeft: 1, fontSize: "35px" }} />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>

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
            Thank You For Completing The Onboarding Process!
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              We are excited to bring diverse snacking options into your
              community and space! You will be contacted by Wugs soon with
              follow-up information. Once you click 'Go Back' you will be
              redirected to the home page where you can view your current
              onboarding status and edit your profile.
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
    </ThemeProvider>
  );
};

export default ReviewPage;

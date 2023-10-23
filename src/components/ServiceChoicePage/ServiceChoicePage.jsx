import React, { useState } from "react";
import MyStepper from "../MyStepper/MyStepper";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button, Card, CardContent, CardMedia, Grid, CssBaseline, Checkbox, } from "@mui/material";

// Path: /servicechoice

function ServiceChoicePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const singleClient = useSelector((store) => store.client);
  const client = useSelector((store) => store.client);

  let defaultMicroMarketCheckedState =
    client?.service_names?.includes("Micro Markets");
  let defaultSmartCoolerChecked =
    client?.service_names?.includes("Smart Coolers");
  let defaultSnackBoxesChecked = client?.service_names?.includes("Snack Boxes");

  const [micromarketChecked, setMicromarketChecked] = useState(
    defaultMicroMarketCheckedState || false
  );
  const [smartcoolersChecked, setSmartcoolersChecked] = useState(
    defaultSmartCoolerChecked || false
  );
  const [snackboxesChecked, setSnackboxesChecked] = useState(
    defaultSnackBoxesChecked || false
  );

  const handleMicromarketChange = () => {
    setMicromarketChecked(!micromarketChecked);
  };
  const handleSmartcoolersChange = () => {
    setSmartcoolersChecked(!smartcoolersChecked);
  };
  const handleSnackboxesChange = () => {
    setSnackboxesChecked(!snackboxesChecked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let servicesArray = [];
    if (micromarketChecked) {
      servicesArray.push(1);
    }
    if (smartcoolersChecked) {
      servicesArray.push(2);
    }
    if (snackboxesChecked) {
      servicesArray.push(3);
    }
    let servicesObj = {
      client_id: singleClient.client_id,
      service_id: servicesArray,
    };
    dispatch({ type: "UPDATE_SERVICES", payload: servicesObj });
    history.push("/clientlocationinfo");
  };

  return (
    <div className="container">
      <MyStepper step={0} />
      <CssBaseline />
      <div style={{ textAlign: "center" }}>
        <Typography variant="h4" marginTop={3} marginBottom={1} style={{ color: "beige" }}>
          Services
        </Typography>
        <Typography variant="h6" marginBottom={4} style={{ color: "beige" }}>
          Select Products You're Interested In
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <form className="checkbox-container">
          <Grid container spacing={5}>

            {/* Micro Markets */}
            <Grid item xs={12} sm={6} md={4}>
              <Checkbox
                id="micromarket"
                name="micromarket"
                value="Micromarket"
                checked={micromarketChecked}
                onChange={handleMicromarketChange}
                sx={{ fontSize: 18, color: "beige" }}
              />
              <label htmlFor="micromarket" style={{ fontSize: 18, color: "beige" }}>
                Micro Markets
              </label>
              <br />
              <Card
                sx={{
                  width: 450,
                  height: 480,
                  borderRadius: 5,
                  backgroundColor: "beige",
                  boxShadow: 24,
                }}
              >
                <CardMedia
                  component="img"
                  alt="Micro Market"
                  height="320"
                  image="https://www.bernicks.com/hubfs/social-suggested-images/micro_market.png"
                />
                <CardContent>
                  <Typography variant="h5">Micro Market</Typography>
                  <Typography variant="body1">
                    Self-service store equipped with open shelves, coolers, and self-checkout kiosks that offer a diverse range of food and drinks. They are an excellent addition to any break room.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Smart Coolers */}
            <Grid item xs={12} sm={6} md={4} >
              <Checkbox
                id="smartcoolers"
                name="smartcoolers"
                value="SmartCoolers"
                checked={smartcoolersChecked}
                onChange={handleSmartcoolersChange}
                sx={{ fontSize: 18, color: "beige" }}
              />
              <label htmlFor="smartcoolers" style={{ fontSize: 18, color: "beige" }}>
                Smart Coolers
              </label>
              <br />
              <Card
                sx={{
                  width: 450,
                  height: 480,
                  borderRadius: 5,
                  backgroundColor: "beige",
                  boxShadow: 24,
                }}
              >
                <CardMedia
                  component="img"
                  alt="Smart Coolers"
                  height="320"
                  image="https://cdn-dppck.nitrocdn.com/mebfXXXDMymVFbKVdxsHUesbzFkXXUGk/assets/images/optimized/rev-434f8f1/connectvending.co.uk/wp-content/uploads/2023/04/PicoCooler-ProductScan-WebRes-sml.jpg"
                />
                <CardContent>
                  <Typography variant="h5">Smart Coolers</Typography>
                  <Typography variant="body1">
                    Modern vending fridge with a grab-and-go experience. Just open the door, take and scan the product, swipe or tap to pay and go.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Snack Boxes */}
            <Grid item xs={12} sm={6} md={4}>
              <Checkbox
                id="snackboxes"
                name="snackboxes"
                value="SnackBoxes"
                checked={snackboxesChecked}
                onChange={handleSnackboxesChange}
                sx={{ fontSize: 18, color: "beige" }}
              />
              <label htmlFor="snackboxes" style={{ fontSize: 18, color: "beige" }}>
                Snack Boxes
              </label>
              <br />

              <Card
                sx={{
                  width: 450,
                  height: 480,
                  borderRadius: 5,
                  backgroundColor: "beige",
                  boxShadow: 24,
                }}
              >
                <CardMedia
                  component="img"
                  alt="Snack Boxes"
                  height="320"
                  image="https://i.etsystatic.com/33431484/r/il/046fbf/5169950532/il_1588xN.5169950532_8ddb.jpg"
                />
                <CardContent>
                  <Typography variant="h5">Snack Boxes</Typography>
                  <Typography variant="body1">
                    A box of international treats and snacks. Choose between medium or large and have it delivered bi-weekly or monthly. Great for smaller spaces.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </form>
      </div>
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

export default ServiceChoicePage;

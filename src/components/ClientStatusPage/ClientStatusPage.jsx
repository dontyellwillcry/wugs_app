import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TabContentOne from "./TabContentOne";
import TabContentTwo from "./TabContentTwo";
import TabContentThree from "./TabContentThree";
import TabContentFour from "./TabContentFour";
import TabContentFive from "./TabContentFive";
import { Tab, Tabs, Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";


// Path: /review

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function ClientStatusPage() {

  const history = useHistory();
  const client = useSelector((store) => store.client);

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
    }
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='container'>
        <style type="text/css">
        </style>
        <Typography
          variant='h5'
          style={{
            textAlign: "left",
            margin: 'auto',
            padding: "5px",
            color: 'beige',
          }}
        >
          Current Status: {client.status_name}
        </Typography>
        <CssBaseline />
        <div style={{ textAlign: "center" }}>
          <Typography variant='h4' marginTop={3} marginBottom={2} style={{ color: "beige" }}>Current Information</Typography>
          <Typography variant="subtitle2">If any edits are needed, click on one of the boxes below to go to that onboarding step</Typography>
        </div>{" "}
        <hr width={800} style={{ color: "beige" }} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Services I'm interested in..." />
            <Tab label="Who we are..." />
            <Tab label="Who we're serving..." />
            <Tab label="Foods we're interested in..." />
            <Tab label="Additional info" />
          </Tabs>
        </div>
        <Container
          maxWidth="lg"
        >
          {value === 0 && <TabContentOne />}
          {value === 1 && <TabContentThree />}
          {value === 2 && <TabContentFive />}
          {value === 3 && <TabContentTwo />}
          {value === 4 && <TabContentFour />}
        </Container>

      </div>
    </ThemeProvider>
  );
}

export default ClientStatusPage;

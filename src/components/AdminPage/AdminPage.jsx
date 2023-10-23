import React, { useState } from "react";
import AdminClientTable from "./AdminClientTable";
import AdminInterestedTable from "./AdminInterestedTable";
import "./AdminPage.css";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";

//Path: /admin

function AdminPage() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container">
      <Box style={{ textAlign: "center" }}>
        <Typography variant="h4" marginTop={0} marginBottom={4} sx={{ color: "beige" }}>
          WUGS Admin Page
        </Typography>
      </Box>
      <hr width={800} style={{ color: "beige" }} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          // to change color of tabs:
          // sx={{
          //   "& .MuiButtonBase-root.MuiTab-root.Mui-selected": {
          //     color: "orange"
          //   }
          // }}
        >
          <Tab label="Onboarding Clients" sx={{ color: "beige" }} />
          <Tab label="Interested in Wugs" sx={{ color: "beige" }} />
        </Tabs>
      </div>
      <Container maxWidth="lg">
        {value === 0 && <AdminClientTable />}
        {value === 1 && <AdminInterestedTable />}
      </Container>
    </div>
  );
}

export default AdminPage;


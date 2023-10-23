import React from "react";

const textStyle = { color: "beige" }

const Columns = () => {
  return [
    {
      field: "business_name",
      headerName: (
        <div style={{ textStyle }}>Business Name</div>
      ),
      width: 200,
      renderCell: (params) => (
        <div style={{ textStyle }}>{params.value}</div>
      ),
    },
    {
      field: "address_city",
      headerName: (
        <div style={{ textStyle }}>City</div>
      ),
      width: 120,
      renderCell: (params) => (
        <div style={{ textStyle }}>{params.value}</div>
      ),
    },
    {
      field: "address_state",
      headerName: (
        <div style={{ textStyle }}>State</div>
      ),
      width: 80,
      renderCell: (params) => (
        <div style={{ textStyle }}>{params.value}</div>
      ),
    },
    {
      field: "address_zip",
      headerName: (
        <div style={{ textStyle }}>Zip Code</div>
      ),
      width: 100,
      renderCell: (params) => (
        <div style={{ textStyle }}>{params.value}</div>
      ),
    },
    {
      field: "first_name",
      headerName: (
        <div style={{ textStyle }}>First Name</div>
      ),
      width: 110,
      renderCell: (params) => (
        <div style={{ textStyle }}>{params.value}</div>
      ),
    },
    {
      field: "last_name",
      headerName: (
        <div style={{ textStyle }}>Last Name</div>
      ),
      width: 110,
      renderCell: (params) => (
        <div style={{ textStyle }}>{params.value}</div>
      ),
    },
    {
      field: "status_name",
      headerName: (
        <div style={{ textStyle }}>Status</div>
      ),
      width: 180,
      renderCell: (params) => (
        <div style={{ textStyle }}>{params.value}</div>
      ),
    },
    {
      field: "last_active",
      headerName: (
        <div style={{ textStyle }}>Last Active</div>
      ),
      width: 200,
      renderCell: (params) => (
        <div style={{ textStyle }}>{params.value}</div>
      ),
    },
  ];
};

export default Columns
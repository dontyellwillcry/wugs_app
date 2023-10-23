import React from "react";

const textStyle = { color: "beige" };

const InterestedColumns = () => {
  return [
    {
      field: "name",
      headerName: <div style={textStyle}>Name</div>,
      width: 200,
      renderCell: (params) => <div style={textStyle}>{params.value}</div>,
    },
    {
      field: "email",
      headerName: <div style={textStyle}>Email</div>,
      width: 270,
      renderCell: (params) => <div style={textStyle}>{params.value}</div>,
    },
    {
      field: "phone_number",
      headerName: <div style={textStyle}>Phone Number</div>,
      width: 180,
      renderCell: (params) => <div style={textStyle}>{params.value}</div>,
    },
    {
      field: "industry",
      headerName: <div style={textStyle}>Industry</div>,
      width: 180,
      renderCell: (params) => <div style={textStyle}>{params.value}</div>,
    },
    {
      field: 'actions',
      headerName: <div style={textStyle}>Actions</div>,
      sortable: false,
      width: 250,
      renderCell: () => (
        <div style={textStyle}>Click for More Information</div>
      ),
    },
  ];
};

export default InterestedColumns;

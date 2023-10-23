import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CssBaseline, Box, Button, Modal, Container, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import InterestedColumns from "./Interestedcolumns";
import "./AdminPage.css";
import { DataGrid } from "@mui/x-data-grid";

function AdminInterestedTable() {

    const dispatch = useDispatch();
    const interested = useSelector((store) => store.interested);

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const handleDeleteConfirmationOpen = () => setDeleteConfirmationOpen(true);
    const handleDeleteConfirmationClose = () => setDeleteConfirmationOpen(false);

    const interestedColumns = InterestedColumns(); // The actual Column is saved in Columns.js as its own component
    const interestedRows = interested?.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone_number: item.phone_number,
        industry: item.industry,
        why_wugs: item.why_wugs,
        about_you: item.about_you,
    }));

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: 600,
        width: 500,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const [selectedRowData, setSelectedRowData] = useState({
        id: "",
        business_name: "",
        first_name: "",
        last_name: "",
        phone: "",
        admin_notes: "",
    });

    const [open, setOpen] = useState(false);

    const handleRowClick = (params) => {
        setSelectedRowData(params.row); // Sets the entire row data
        handleOpen(); // Opens the modal when a row is clicked
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function deleteClient() {
        dispatch({
            type: "DELETE_INTERESTED",
            payload: {
                id: selectedRowData.id,
            },
        });
        setDeleteConfirmationOpen(false);
        handleClose();
    }

    return (
        <div className="container">
            <CssBaseline />
            <Container sx={{ boxShadow: 24, padding: 3, marginBottom: 16, borderRadius: 3, backgroundColor: "#484747" }}>
                <Typography variant='h4' style={{ padding: 18, color: "beige" }}>Interested Clients to Contact</Typography>

                <DataGrid
                    rows={interestedRows}
                    columns={interestedColumns}
                    onRowClick={handleRowClick}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd'
                    }
                />

                {/* -----------  MODAL START ----------- */}

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    backgroundColor='#484747'
                >

                    <Box
                        sx={style}
                        style={{
                            borderRadius: 30,
                            backgroundColor: '#484747',
                            color: "beige",
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                            gridTemplateAreas: '"contact" "business"',
                            overflowY: "auto"
                        }}>



                        {/* Contact Information */}
                        <div style={{ gridArea: 'contact' }}>
                            <Typography variant="h6">Contact Information</Typography>
                            <ul>
                                <li>Name: {selectedRowData.name}</li>
                                <li>Email: {selectedRowData.email}</li>
                                <li>Phone #: {selectedRowData.phone_number || "N/A"}</li>
                            </ul>
                        </div>

                        {/* Business Information */}
                        <div style={{ gridArea: 'business' }}>
                            <Typography variant="h6">Business Information</Typography>
                            <ul>
                                <li>Industry: {selectedRowData.industry || "N/A"}</li>

                                <li>About Client: {selectedRowData.about_you || "N/A"}</li>
                                <li>Why Wugs: {selectedRowData.why_wugs || "N/A"}</li>
                            </ul>
                        </div>
                        <div>
                            <Box textAlign={"center"}>
                                <Button
                                    onClick={handleDeleteConfirmationOpen}
                                    style={{
                                        borderRadius: 4,
                                        marginTop: 90,
                                        color: "white",
                                        backgroundColor: "red",
                                    }}
                                >
                                    Delete Client From Table
                                </Button>
                            </Box>
                        </div>
                    </Box>
                </Modal>

                {/* -----------  MODAL END ----------- */}

            </Container>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteConfirmationOpen}
                onClose={handleDeleteConfirmationClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirmation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this client's information?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirmationClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={deleteClient}
                        style={{ color: "white", backgroundColor: "red" }}
                    >
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default AdminInterestedTable;

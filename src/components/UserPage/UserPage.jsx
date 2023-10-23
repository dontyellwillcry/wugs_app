import React, { useState, useEffect, useRef, createRef } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Card, CardContent, Modal, TextField, Typography, Container, Grid, } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useHistory } from "react-router-dom";
import { PopupWidget } from "react-calendly";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function UserPage() {
  const rootElement = document.getElementById("popup-root");

  const user = useSelector((store) => store.user);
  const client = useSelector((store) => store.client);

  const dispatch = useDispatch();
  const history = useHistory();

  const pictureFileInputRef = useRef(null); // Needed for the google drive post
  const contractFileInputRef = useRef(null); // Needed for the google drive post

  const [pictureFileLength, setPictureFileLength] = useState(0);
  const [contractFileLength, setContractFileLength] = useState(0);

  const handlePictureSelected = (event) => {
    const selectedFiles = event.target.files;
    setPictureFileLength(selectedFiles.length);
  };
  const handleContractSelected = (event) => {
    const selectedFiles = event.target.files;
    setContractFileLength(selectedFiles.length);
  };

  const handleButton = () => {
    history.push("/clientstatus");
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dioOpen, dioSetOpen] = useState(false);

  const handleClickOpen = () => {
    dioSetOpen(true);
  };

  const handleCloseDio = () => {
    dioSetOpen(false);
  };
  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [phone, setPhone] = useState(client.phone || "");
  const [username, setUsername] = useState(user.username || "");
  const [confirmUsername, setConfirmUsername] = useState(user.username || "");

  // New state variables for photo slider
  const [photoIndex, setPhotoIndex] = useState(0);

  // Array of photo URLs
  const photos = [
    "https://thumb.tildacdn.com/tild3334-3861-4632-a237-663363353830/-/format/webp/Follow_Wugs_On.jpg",
    "https://thumb.tildacdn.com/tild6230-3666-4663-b236-323863323562/-/format/webp/IMG_4905.jpg",
    "https://thumb.tildacdn.com/tild3636-6236-4366-a165-313136626436/-/format/webp/IMG_5099.jpg",
    "https://thumb.tildacdn.com/tild6135-6332-4735-b064-643336306437/-/format/webp/IMG_5076.jpg",
  ];

  // Function to handle photo navigation
  const goToNextPhoto = () => {
    setPhotoIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Use useEffect to automatically advance photos after 5 seconds
  useEffect(() => {
    const timer = setTimeout(goToNextPhoto, 5000); // 5000 milliseconds (5 seconds)
  }, [photoIndex]);

  const handleSave = () => {
    if (!firstName || !lastName || !phone || !username || !confirmUsername) {
      alert("please complete all inputs");
    } else if (username !== confirmUsername) {
      alert("usernames do not match");
    } else {
      let contactInfoObj = {
        client_id: client.client_id,
        user_id: user.id,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        username: username,
      };
      dispatch({ type: "UPDATE_CONTACT_INFO", payload: contactInfoObj });
    }
  };

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

  // Function to handle file upload to Google Drive
  const handlePictureUpload = async () => {
    const files = pictureFileInputRef.current.files;
    console.log("files length:", files.length);
    // Check if there are selected files
    if (files.length > 0) {
      const formData = new FormData();

      // Iterate over the selected files and append them to the form data
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      const clientId = client.client_id;

      try {
        // Send a POST request to the '/api/onboarding/upload' endpoint with the form data
        const response = await axios.post(
          `/api/onboarding/upload/pictures/${clientId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data for file uploads
            },
          }
        );

        const data = response.data;
        if (data) {
          handleClickOpen();
          setPictureFileLength(0);
        } else {
          handleCloseDio();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleContractUpload = async () => {
    const files = contractFileInputRef.current.files;

    // // Check if there are selected files
    if (files.length > 0) {
      const formData = new FormData();

      // Iterate over the selected files and append them to the form data
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      console.log("Uploading files:", formData);
      const clientId = client.client_id;
      console.log("clientId is:", clientId);

      try {
        // Send a POST request to the '/api/onboarding/upload' endpoint with the form data
        const response = await axios.post(
          `/api/onboarding/upload/contract/${clientId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data for file uploads
            },
          }
        );

        const data = response.data;
        console.log("Uploaded files: ", data.files);
        if (data) {
          handleClickOpen();
          setContractFileLength(0);
        } else {
          handleCloseDio();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const openCalendlyLink = () => {
    Calendly.initPopupWidget({
      url: "https://calendly.com/seleymolubah/meeting",
    });
  };

  return (
    <div className="container">
      <Typography marginLeft={40} variant="h4">
        Welcome, {user.first_name || user.username}!
      </Typography>
      <Typography marginLeft={40} variant="h6">
        Onboarding Status: {client.status_name}
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          marginRight: "40px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => dispatch({ type: "LOGOUT" })}
          style={{
            marginRight: "300px",
            marginTop: -50,
            marginBottom: 120,
          }}
        >
          Log Out
        </Button>
      </div>
      <Container
        maxWidth="lg"
        sx={{
          width: "100%",
          height: "60vh",
          marginBottom: "100px",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={4} md={6}>
            <Card
              variant="outlined"
              sx={{
                backgroundColor: "#eaeaea",
                boxShadow: 5,
                color: "black",
                margin: "10px",
                width: "450px",
                height: "230px",
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 24 }} color="black" gutterBottom>
                  Your Contact Info:
                </Typography>
                <Typography variant="h8" component="div">
                  <ul>
                    <li>Email: {user.username}</li>
                    <li>
                      Primary Contact: {user.first_name} {user.last_name}
                    </li>
                    <li>Phone: {client.phone || "Phone number required"}</li>
                  </ul>
                </Typography>
                <Button
                  onClick={handleOpen}
                  sx={{
                    marginTop: 1.5,
                    marginLeft: 2,
                    height: 50,
                    width: 120,
                    borderRadius: 1,
                  }}
                  color="primary"
                  variant="contained"
                  autoFocus
                >
                  Edit
                </Button>

                <Button
                  onClick={handleButton}
                  sx={{
                    marginTop: 1.5,
                    marginLeft: 2,
                    height: 50,
                    width: 120,
                    borderRadius: 1,
                  }}
                  color="primary"
                  variant="contained"
                  autoFocus
                >
                  Update Selections
                </Button>
                <Button
                  onClick={openCalendlyLink}
                  sx={{
                    marginTop: 1.5,
                    marginLeft: 2,
                    height: 50,
                    width: 120,
                    borderRadius: 1,
                  }}
                  color="primary"
                  variant="contained"
                  autoFocus
                >
                  Schedule Meeting
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4} md={6}>
            <img
              src={photos[photoIndex]}
              alt={`Photo ${photoIndex + 1}`}
              style={{
                width: "600px",
                height: "600px",
                objectFit: "cover",
                borderRadius: "2%",
              }}
            />
          </Grid>

          <Grid item xs={6} md={6}>
            <Card
              variant="outlined"
              sx={{
                backgroundColor: "#eaeaea",
                boxShadow: 5,
                color: "black",
                margin: "10px",
                width: "450px",
                height: "300px",
                marginTop: -34,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  style={{ marginBottom: "15px", color: "#f5f5dc" }}
                >
                  Upload Image of Vending Space to WUGS
                </Typography>
                <div className="custom-upload-button">
                  <label htmlFor="picture-input">
                    <input
                      id="picture-input"
                      type="file"
                      ref={pictureFileInputRef}
                      style={{ display: "none" }}
                      multiple
                      onChange={handlePictureSelected}
                    />
                    <Button variant="contained" component="span">
                      {pictureFileLength > 1
                        ? `${pictureFileLength} Files Selected`
                        : pictureFileLength > 0
                          ? `${pictureFileLength} File Selected`
                          : "Choose Files"}
                    </Button>
                  </label>
                  <Button
                    variant="contained"
                    onClick={handlePictureUpload}
                    style={{
                      marginLeft: "10px",
                    }}
                    autoFocus
                    disabled={pictureFileLength == 0}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Files
                  </Button>
                </div>

                <hr
                  style={{
                    marginBottom: "20px",
                    marginTop: "25px",
                  }}
                />

                <div className="custom-upload-button">
                  <Typography
                    variant="h6"
                    style={{ marginBottom: "15px", color: "#f5f5dc" }}
                  >
                    Upload Signed Contract to WUGS
                  </Typography>
                  <label htmlFor="contract-input">
                    <input
                      id="contract-input"
                      type="file"
                      ref={contractFileInputRef}
                      style={{ display: "none" }}
                      multiple
                      onChange={handleContractSelected}
                    />
                    <Button variant="contained" component="span">
                      {contractFileLength > 1
                        ? `${contractFileLength} Files Selected`
                        : contractFileLength > 0
                          ? `${contractFileLength} File Selected`
                          : "Choose Files"}
                    </Button>
                  </label>
                  <Button
                    variant="contained"
                    onClick={handleContractUpload}
                    style={{
                      marginLeft: "10px",
                    }}
                    autoFocus
                    disabled={contractFileLength == 0}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* ----------- MODAL START ----------- */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 270,
            bgcolor: "#484747",
            boxShadow: 24,
            borderRadius: 4,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit your contact info:
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="firstName"
              label="First Name"
              variant="outlined"
              InputLabelProps={{ style: { color: "beige" } }}
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // Outline color when not focused
                  },
                  "&:hover fieldset": {
                    borderColor: "red", // Outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red", // Outline color when focused
                  },
                },
              }}
            />
            <br />
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              InputLabelProps={{ style: { color: "beige" } }}
              type="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // Outline color when not focused
                  },
                  "&:hover fieldset": {
                    borderColor: "red", // Outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red", // Outline color when focused
                  },
                },
              }}
            />
            <br />
            <TextField
              id="phone"
              label="Phone Number"
              variant="outlined"
              InputLabelProps={{ style: { color: "beige" } }}
              type="phone"
              value={phone}
              onChange={handleFormatPhoneNumber}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // Outline color when not focused
                  },
                  "&:hover fieldset": {
                    borderColor: "red", // Outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red", // Outline color when focused
                  },
                },
              }}
            />
            <br />
            <TextField
              id="username"
              label="Username / Email"
              variant="outlined"
              InputLabelProps={{ style: { color: "beige" } }}
              type="email"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // Outline color when not focused
                  },
                  "&:hover fieldset": {
                    borderColor: "red", // Outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red", // Outline color when focused
                  },
                },
              }}
            />
            <TextField
              id="confirmusername"
              label="Confirm Username / Email"
              variant="outlined"
              InputLabelProps={{ style: { color: "beige" } }}
              type="email"
              value={confirmUsername}
              onChange={(event) => setConfirmUsername(event.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // Outline color when not focused
                  },
                  "&:hover fieldset": {
                    borderColor: "red", // Outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red", // Outline color when focused
                  },
                },
              }}
            />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              *** Please Note: Your username will be changed to this new email
              if updated.
            </Typography>
          </Box>
          <Button
            onClick={handleSave}
            sx={{
              marginTop: 1.5,
              marginLeft: 2,
              height: 50,
              width: 120,
              borderRadius: 1,
            }}
            color="success"
            variant="contained"
            autoFocus
          >
            Save
          </Button>
        </Box>
      </Modal>
      {/* ----------- MODAL END ----------- */}

      <Dialog
        open={dioOpen}
        onClose={handleCloseDio}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your're files were uploaded succsessfuly"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thank you for your submission. Please feel free to upload more as
            needed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDio} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserPage;

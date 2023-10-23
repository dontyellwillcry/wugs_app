import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { styled } from '@mui/material/styles';
import MyStepper from '../MyStepper/MyStepper'
import { Box, TextField, Button, Stack, Switch, Typography, CssBaseline, Input, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HelpIcon from "@mui/icons-material/Help";

function AdditionalInfoPage() {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const client = useSelector((store) => store.client)

  const [dimensions, setDimensions] = useState(client.dimensions || "");
  const [wugsVisit, setWugsVisit] = useState(client.wugs_visit || false);

  const [dioOpen, dioSetOpen] = useState(false);

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

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

  const handleFileSelect = (event) => {
    const files = event.target.files;
    const fileNames = [];

    for (let i = 0; i < files.length; i++) {
      fileNames.push(files[i].name);
    }
    setSelectedFiles([...selectedFiles, ...fileNames]);
  };

  const handleClickOpen = () => {
    dioSetOpen(true);
  };

  const handleCloseDio = () => {
    dioSetOpen(false);
  };

  // Function to handle file upload to Google Drive
  const handleFileUpload = async () => {
    const files = fileInputRef.current.files;

    if (files.length > 0) {
      const formData = new FormData();

      // Iterating over the selected files and append them to the form data
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      const clientId = client.client_id;

      try {
        // Sending a POST request to the '/api/onboarding/upload' endpoint with the form data
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
        } else {
          handleCloseDio();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {
    dispatch({
      type: 'UPDATE_ADDINFO', payload: {
        client_id: client.client_id,
        dimensions: dimensions,
        wugs_visit: wugsVisit
      }
    })
    history.push('/review')
  }

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));



  return (
    <div className="container">
      <MyStepper step={4} />

      <div className="wholebody">
        <CssBaseline />
        <div style={{ textAlign: "center" }}>
          <Typography
            variant='h4'
            marginTop={3}
            style={{ color: "beige" }}
          >Additional Information
          </Typography>
          <Typography
            variant="h6"
            marginTop={1}
            marginBottom={1}
            style={{ color: "beige" }}
          >
            Any other helpful details on your vending space?
          </Typography>
          <HelpIcon
            style={{ marginTop: 10, color: "beige" }}
            onMouseEnter={handleHelpIconHover}
          />
        </div>{" "}
        <Box margin={'auto'}
          component="form"
          sx={{
            backgroundColor: '#484747',
            borderRadius: 3,
            width: 360,
            padding: 2,
            boxShadow: 24,
            marginTop: 3,
            marginBottom: 9,
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="dimensions"
            label="Market Location Dimensions (optional)"
            variant="outlined"
            inputProps={{ style: { color: "beige" }, maxLength: 80 }}
            InputLabelProps={{ style: { color: "beige" } }}
            type="text"
            style={{ width: 310 }}
            placeholder="16ft wide x 6ft depth"
            value={dimensions}
            onChange={(event) => setDimensions(event.target.value)}
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
          <Typography display='flex' justifyContent='center' color='beige' variant="h6">Request a visit from Wugs?</Typography>
          <Stack display='flex' margin={'auto'} justifyContent='center' direction="row" spacing={1} alignItems="center">
            <Typography color='beige'>No</Typography>
            <AntSwitch
              checked={wugsVisit}
              onChange={() => setWugsVisit(!wugsVisit)} inputProps={{ 'aria-label': 'ant design' }} />
            <Typography color='beige'>Yes</Typography>
          </Stack>


          <Typography>Upload Photos (optional):</Typography>
          <Typography variant="subtitle2">Provide a photo of your space</Typography>
          <Input
            type="file"
            multiple
            inputRef={fileInputRef}
            style={{ display: 'none' }}
            id="file-input"
            onChange={handleFileSelect}
          />
          <label htmlFor="file-input">
            <Button
              variant="contained"
              component="span"
              startIcon={<AddAPhotoIcon />}
            >
              Select Files
            </Button>
          </label>
          {selectedFiles.length > 0 && (
            <div>
              <Button
                variant="contained"
                onClick={handleFileUpload}
                style={{
                  justifyContent: "left",
                  marginLeft: "7px",
                }}
                autoFocus
              ><CloudUploadIcon />Upload Files
              </Button>
              <Typography>Selected files:</Typography>
              <ul>
                {selectedFiles.map((fileName, index) => (
                  <li key={index}>{fileName}</li>
                ))}
              </ul>
            </div>
          )}
        </Box>
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

      {/* Tool Tip for Dimensions/Wugs visit/Photos */}
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
            <strong>MARKET LOCATION DIMENSIONS:</strong>
            <br />
            If you know the dimensions of the space you are looking to fill with our vending services, please provide the dimensions in feet and inches.  For example, 8 ft width x 3 ft 6 in depth, 8 ft height.
            <ul>
              <li>
                Width: left to right when looking at the vending space
              </li>
              <li>
                Depth: front to back, usually measured out from the wall
              </li>
              <li>
                Height: available space from the floor to the ceiling, only important if height is limited in the space
              </li>
            </ul>
            <strong>REQUEST A VISIT FROM WUGS:</strong>
            <br />
            Indicate Yes if you would prefer for Wugs to take a look at the vending area to assess and measure the space for a micro-market.
            <br />
            <br />
            <strong>UPLOAD PHOTOS:</strong>
            <br />
            Photos of the space along with the dimensions can help Wugs in getting a good idea of how the micro-market can look prior to a meeting to discuss available options.
            <br />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div >
  );
}

export default AdditionalInfoPage;
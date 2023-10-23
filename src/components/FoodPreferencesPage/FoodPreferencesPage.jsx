import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MyStepper from "../MyStepper/MyStepper";
import { styled } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { ButtonBase, Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

// Path: /foodpreferences

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  margin: 4,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

function FoodPreferencesPage() {
  const client = useSelector((store) => store.client);

  const [clickedButtons, setClickedButtons] = useState(
    client.product_ids || []
  );

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "FETCH_PRODUCTS" });
  }, [client || dispatch]);

  const products = useSelector((store) => store.products.data);

  const handleClick = (productId) => {
    // Toggles the clicked state for the clicked button
    const updatedClickedButtons = clickedButtons.includes(productId)
      ? clickedButtons.filter((id) => id !== productId)
      : [...clickedButtons, productId];

    setClickedButtons(updatedClickedButtons);
  };

  const handleSave = () => {
    // Sends the clickedButtons data in a payload
    const payload = {
      clickedButtons: clickedButtons,
      client_id: client.client_id,
    };
    dispatch({ type: "UPDATE_FOOD_PREFERENCES", payload });
    history.push("/additionalinfo");
  };

  const ImageButton = styled(ButtonBase)(({ theme, isclicked }) => ({
    ...(isclicked && {
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "6px solid #f3cf2a",
      },
      
    }),
    position: "relative",
    height: 200,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      height: 100,
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "4px solid inheret",
      },
    },
  }));

  return (
    <div className="container">
      <MyStepper step={3} />

      <Typography
        style={{ textAlign: "center" }}
        variant="h4"
        color="beige"
        marginTop={3}
        gutterBottom
      >
        Food Choices
      </Typography>
      <Typography
        style={{ textAlign: "center" }}
        variant="h6"
        color="beige"
        marginBottom={3}
        gutterBottom
      >
        Select Any You'd Like To Learn More About
      </Typography>
      <Grid
        sx={{ display: "flex", marginLeft: "375px" }}
        container
        xs={9}
        spacing={2}
        columnGap={2}
        rowGap={2}
      >

        {products && products.length > 0 ? (
          products.map((product) => (
            <ImageButton
              focusRipple
              key={product.id}
              onClick={() => handleClick(product.id)}
              style={{
                width: "20em",
              }}
              isclicked={clickedButtons.includes(product.id)}
            >
              <ImageSrc
                style={{
                  borderRadius: 16,
                  borderWidth: "5px",
                  backgroundImage: `url(${product.url})`,
                }}
              />
              <ImageBackdrop
                style={{
                  borderRadius: 22,
                }}
                className="MuiImageBackdrop-root"
              />
              <Image>
                <Typography
                  component="span"
                  variant="h6"
                  color="inherit"
                  sx={{
                    position: "relative",
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    backdropFilter: "blur(1px)",
                    color: "black !important",
                  }}
                >
                  {product.type}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "30px",
        }}
      >
        <Button
          onClick={handleSave}
          sx={{
            marginTop: 1.5,
            marginLeft: 2,
            height: 50,
            width: 150,
            borderRadius: 1,
            fontSize: "1.25em",
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

export default FoodPreferencesPage;

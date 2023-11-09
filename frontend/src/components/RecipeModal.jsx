import React from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
// import CloseIcon from "@mui/icons-material/Close";

export default function RecipeModal({ open, handleClose, recipe }) {
  if (!recipe) {
    return null;
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition={true}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open} timeout={500}>
          <div className="modal">
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              // sx={{ boxShadow: 1 }}
              // p={2}
            >
              <Grid
                container
                sx={{
                  // display: "flex",
                  // alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  className="modal-content"
                >
                  x
                </IconButton>
              </Grid>
              <Grid item>
                <div className="modal-title">
                  <h2>{recipe.title}</h2>
                </div>
              </Grid>
              <Grid item>
                <div>
                  <img
                    // className="image"
                    src={`${CDN_IMAGES}${recipe.imageName}.jpg`}
                    alt="Recipe image"
                  />
                </div>
              </Grid>
              <Grid item>
                <div>
                  <div className="modal-content">{recipe.ingredients}</div>
                </div>
              </Grid>
              <Grid item>
                <div>
                  <div className="modal-content">{recipe.instructions}</div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

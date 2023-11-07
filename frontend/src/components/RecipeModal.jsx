import React from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

export default function RecipeModal({ open, handleClose, recipe }) {
  if (!recipe) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open} timeout={500}>
        <div className="modal">
          <button onClick={handleClose}>Close</button>
          <h2>{recipe.title}</h2>
          <img
            className="image"
            src={`${CDN_IMAGES}${recipe.imageName}.jpg`}
            alt="Recipe image"
          />
          <div>{recipe.ingredients}</div>
          <div>{recipe.instructions}</div>
        </div>
      </Fade>
    </Modal>
  );
}

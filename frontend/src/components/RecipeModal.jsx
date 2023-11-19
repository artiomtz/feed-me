import React from "react";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import { motion } from "framer-motion";
import noRecipeImage from "../assets/noRecipeImage.png";

export default function RecipeModal({ open, handleClose, recipe }) {
  const convertIngredientsToArray = (ingredientsString) => {
    const ingredientsArray = ingredientsString
      .replace(/^\[|\]$/g, "")
      .split("',")
      .map((ingredient) => ingredient.trim().replace(/^['"]|['"]$/g, ""));

    return ingredientsArray;
  };

  const scrollableStyle = {
    height: "55vh",
    overflow: "auto",
    paddingRight: "5px",
  };

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
        <motion.div
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          exit={{
            scale: 0,
            opacity: 0,
            transition: { duration: 1 },
          }}
        >
          <div className="modal">
            <motion.div
              layout
              initial={{ opacity: 0, scale: 1, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    md={1}
                    lg={1}
                    xl={1}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
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
                  <Grid
                    item
                    xs={12}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div className="modal-title">{recipe.title}</div>
                  </Grid>
                  <Grid item xs={0} sm={1} md={1} lg={1} xl={1}></Grid>
                </Grid>
                <Grid item>
                  <img
                    className="modal-image"
                    src={`${CDN_IMAGES}${recipe.imageName}.jpg`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = noRecipeImage;
                    }}
                    alt="No image found 😶"
                  />
                </Grid>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 1, y: -50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 2 }}
                >
                  <Grid container>
                    <div style={scrollableStyle}>
                      <Grid item>
                        <div className="modal-content">
                          <div className="modal-sub-title">Ingredients</div>
                          <ul>
                            {convertIngredientsToArray(recipe.ingredients).map(
                              (ingredient, key) => (
                                <li key={key}>{ingredient}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </Grid>
                      <Grid item>
                        <div className="modal-content">
                          <div className="modal-sub-title">Instructions</div>
                          <p>{recipe.instructions}</p>
                        </div>
                      </Grid>
                    </div>
                  </Grid>
                </motion.div>
              </Grid>
            </motion.div>
          </div>
        </motion.div>
      </Modal>
    </>
  );
}

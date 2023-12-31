import React, { useContext, useState } from "react";
import RecipeContext from "../RecipeContext";
import RecipeModal from "./RecipeModal";
import NoRecipes from "./NoRecipes";
import Grid from "@mui/material/Grid";
import { motion, AnimatePresence } from "framer-motion";
import noRecipeImage from "../assets/noRecipeImage.png";

export default function Recipes() {
  const { recipes } = useContext(RecipeContext);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const scrollableStyle = {
    height: "50vh",
    overflow: "auto",
  };

  const displayStyle = {
    display: "flex",
    cursor: "pointer",
    paddingRight: "40px",
  };

  const handleOpenModal = (recipe) => {
    setSelectedRecipe(recipe);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
    setOpenModal(false);
  };

  return (
    <>
      <div style={scrollableStyle}>
        {recipes.length ? (
          recipes.map((recipe) => (
            <motion.div
              key={recipe.title + "-" + recipe.imageName}
              layout
              initial={{ opacity: 0.8, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              exit={{
                scale: 0,
                transition: { duration: 1 },
              }}
            >
              <AnimatePresence>
                <div
                  style={displayStyle}
                  className="recipe"
                  onClick={() => handleOpenModal(recipe)}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={12} sm={10} md={10} lg={6} xl={5}>
                      <img
                        className="image"
                        src={`${CDN_IMAGES}${recipe.imageName}.jpg`}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = noRecipeImage;
                        }}
                        alt="No image found 🫤"
                      />
                    </Grid>
                    <Grid item xs={12} sm={10} md={10} lg={6} xl={7}>
                      <div className="food-title">{recipe.title}</div>
                    </Grid>
                  </Grid>
                </div>
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 75 }}
            transition={{ duration: 3 }}
            exit={{
              opacity: 0,
              transition: { duration: 1 },
            }}
          >
            <AnimatePresence>
              <NoRecipes />
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      <RecipeModal
        open={openModal}
        handleClose={handleCloseModal}
        recipe={selectedRecipe}
      />
    </>
  );
}

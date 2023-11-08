import React, { useContext, useState } from "react";
import RecipeContext from "../RecipeContext";
import RecipeModal from "./RecipeModal";
import Grid from "@mui/material/Grid";

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
    // alignItems: "center",
    // width: "100%",
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
        {recipes.map((recipe) => (
          <div
            key={recipe.imageName}
            style={displayStyle}
            className="entry"
            onClick={() => handleOpenModal(recipe)}
          >
            <Grid
              container
              // rowSpacing={5}
              // columnSpacing={{ xs: 1, sm: 1, md: 3, lg: 2, xl: 0 }}
              // justifyContent="flex-start"
              alignItems="center"
              // sx={{ boxShadow: 1 }}
              // p={2}
            >
              <Grid
                item
                xs={12}
                sm={10}
                md={10}
                lg={6}
                xl={5}
                // style={{ backgroundColor: "Tomato" }}
                // p={"3%"}
                // justifyContent="center"
              >
                <img
                  className="image"
                  src={`${CDN_IMAGES}${recipe.imageName}.jpg`}
                  alt="Recipe image"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={10}
                md={10}
                lg={6}
                xl={7}
                // style={{ backgroundColor: "Tomato" }}
                // p={"3%"}
                // justifyContent="center"
                // justifyContent="flex-start"
              >
                <div className="food-title">{recipe.title}</div>
              </Grid>
            </Grid>
          </div>
        ))}
      </div>
      <RecipeModal
        open={openModal}
        handleClose={handleCloseModal}
        recipe={selectedRecipe}
      />
    </>
  );
}

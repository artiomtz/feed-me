import React, { useContext, useState } from "react";
import RecipeContext from "../RecipeContext";
import RecipeModal from "./RecipeModal";

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
    alignItems: "center",
    cursor: "pointer",
  };

  const titleStyle = {
    fontWeight: "bold",
    padding: "30px",
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
            className="content"
            onClick={() => handleOpenModal(recipe)}
          >
            <img
              className="image"
              src={`${CDN_IMAGES}${recipe.imageName}.jpg`}
              alt="Recipe image"
            />
            <span style={titleStyle}>{recipe.title}</span>
            {/* <p>{recipe.ingredients}</p> */}
            {/* <p>{recipe.instructions}</p> */}
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

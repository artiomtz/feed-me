import React, { useContext } from "react";
import RecipeContext from "../RecipeContext";

export default function Recipes() {
  const { recipes } = useContext(RecipeContext);
  return (
    <>
      <div>
        {recipes.map((recipe) => (
          <div key={recipe.imageName} className="pb-4">
            <h4>{recipe.title}</h4>
            <img
              // style={imageStyle}
              src={`https://res.cloudinary.com/dowqphsme/image/upload/feed-me/images/${recipe.imageName}.jpg`}
              alt="Recipe image"
            />
            <p>{recipe.ingredients}</p>
            <p>{recipe.instructions}</p>
          </div>
        ))}
      </div>
    </>
  );
}

import React, { useContext } from "react";
import RecipeContext from "../RecipeContext";

export default function Recipes() {
  const { recipes, getRecipes } = useContext(RecipeContext);
  return (
    <>
      <div>
        {recipes.map((recipe) => (
          <div key={recipe}>{recipe}</div>
        ))}
      </div>
    </>
  );
}

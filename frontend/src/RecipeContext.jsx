import React, { useState, createContext } from "react";

export const RecipeContext = createContext();

export function ContextProvider({ children }) {
  const [recipes, setRecipes] = useState(["recipe 1", "recipe 2"]);

  const getRecipes = () => {
    return recipes;
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        getRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeContext;

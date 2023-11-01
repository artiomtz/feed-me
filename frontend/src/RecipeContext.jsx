import React, { useState, createContext } from "react";

export const RecipeContext = createContext();

export function ContextProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeContext;

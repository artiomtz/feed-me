import React, { useState, createContext } from "react";

export const RecipeContext = createContext();

export function ContextProvider({ children }) {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  return (
    <RecipeContext.Provider
      value={{
        ingredients,
        setIngredients,
        recipes,
        setRecipes,
        loading,
        setLoading,
        status,
        setStatus,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeContext;

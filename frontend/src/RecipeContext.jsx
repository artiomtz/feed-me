import React, { useState, createContext } from "react";

export const RecipeContext = createContext();

export function ContextProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  return (
    <RecipeContext.Provider
      value={{
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

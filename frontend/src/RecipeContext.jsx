import React, { useState, createContext } from "react";

export const RecipeContext = createContext();

export function ContextProvider({ children }) {
  const [ingredients, setIngredients] = useState([]);
  const [baseIngredients, setBaseIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState([]);
  const [slider, setSlider] = useState(
    parseFloat(SIMILARITY_THRESHOLD_DEFAULT)
  );

  const pushStatus = (msg) => {
    setStatus((prevQueue) => [...prevQueue, msg]);
  };

  return (
    <RecipeContext.Provider
      value={{
        ingredients,
        setIngredients,
        baseIngredients,
        setBaseIngredients,
        recipes,
        setRecipes,
        loading,
        setLoading,
        status,
        setStatus,
        pushStatus,
        slider,
        setSlider,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeContext;

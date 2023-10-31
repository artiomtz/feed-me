import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap";
import RecipeContext from "./RecipeContext";
import React, { useContext, useEffect } from "react";

function App() {
  const { recipes, getRecipes } = useContext(RecipeContext);

  // useEffect(() => {
  //   getRecipes();
  // }, []);

  return (
    <>
      <div className="container text-center">
        <h1 className="p-4">Feed Me</h1>
        <div>Search</div>
        <div>Search field</div>

        <h2 className="p-4 pb-1">Results</h2>
        <div>
          {recipes.map((recipe) => (
            <div key={recipe}>{recipe}</div>
          ))}
        </div>

        <h3 className="p-4 pb-1">Status</h3>
        <div>Status field</div>
      </div>
    </>
  );
}

export default App;

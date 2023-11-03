import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap";
import RecipeContext from "./RecipeContext";
import React, { useContext, useEffect, useState } from "react";
import Status from "./components/Status";
import Recipes from "./components/Recipes";
import Search from "./components/Search";
import { pingServer } from "./api/rest/apiService";
import { getIngredients } from "./api/rest/apiService";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const { loading, setLoading, status, setStatus } = useContext(RecipeContext);

  const fetchIngredients = async () => {
    const result = await getIngredients();
    setIngredients(result);
  };

  useEffect(() => {
    setLoading(true);
    setStatus("Connecting to server... 🤔");
    console.log("Connecting to server... 🤔"); ///////////
    pingServer();
    setStatus("Fetching ingredients... 😃");
    console.log("Fetching ingredients... 😃"); ///////////
    fetchIngredients();
    setStatus("Let's find something to eat! 🤤");
    setLoading(false);
  }, []);

  return (
    <>
      <div className="container text-center">
        <h1 className="p-4">Feed Me</h1>

        <div>Search</div>
        <Search />

        <h2 className="p-4 pb-1">Recipes</h2>
        <Recipes />

        <h3 className="p-4 pb-1">Status</h3>
        <Status />
      </div>
    </>
  );
}

export default App;

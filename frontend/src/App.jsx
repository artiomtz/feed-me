import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap";
import React, { useEffect } from "react";
import Status from "./components/Status";
import Recipes from "./components/Recipes";
import Search from "./components/Search";
import { pingServer } from "./api/rest/apiService";

function App() {
  useEffect(() => {
    pingServer();
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

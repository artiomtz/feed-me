// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap";
import RecipeContext from "./RecipeContext";
import React, { useContext, useEffect, useState } from "react";
import Status from "./components/Status";
import Recipes from "./components/Recipes";
import Search from "./components/Search";
import { pingServer } from "./api/rest/apiService";
import { getIngredients } from "./api/rest/apiService";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./App.css";

function App() {
  const { setIngredients, loading, setLoading, status, setStatus } =
    useContext(RecipeContext);

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
      <Grid
        container
        // rowSpacing={0}
        // columnSpacing={{ xs: 1, sm: 1, md: 3, lg: 2, xl: 0 }}
        justifyContent="center"
        alignItems="center"
        p={2}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ backgroundColor: "Violet" }}
          p={6}
        >
          <div>Feed Me</div>
        </Grid>

        <Grid
          container
          // rowSpacing={2}
          // columnSpacing={{ xs: 2, sm: 1, md: 3, lg: 2, xl: 3 }}
          // spacing={{ xs: 2, sm: 1, md: 3, lg: 2, xl: 3 }}
          // justifyContent="center"
          // alignItems="center"
          p={4}
          pr={"5%"}
          pl={"5%"}
          // height="70vh"
          // direction="column"
          style={{ minHeight: "60vh" }}
        >
          <Grid
            item
            xs={12}
            sm={10}
            md={10}
            lg={4}
            xl={4}
            style={{ backgroundColor: "Tomato" }}
            p={"3%"}
            // justifyContent="center"
          >
            <div>
              <div>Search</div>
              <div className="content">
                <Search />
              </div>
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            sm={10}
            md={10}
            lg={8}
            xl={8}
            style={{ backgroundColor: "Orange" }}
            p={"3%"}
          >
            <div>
              <div>Recipes</div>
              <Recipes />
            </div>
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ backgroundColor: "gray" }}
          p={4}
          pr={"5%"}
          pl={"5%"}
        >
          <Status />
        </Grid>
      </Grid>
    </>
  );
}

export default App;

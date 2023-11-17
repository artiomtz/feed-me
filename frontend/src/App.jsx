// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap";
import RecipeContext from "./RecipeContext";
import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header";
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
  const { setIngredients, loading, setLoading, status, setStatus, pushStatus } =
    useContext(RecipeContext);

  const fetchIngredients = async () => {
    const result = await getIngredients();
    // console.log(result); ///////////
    setIngredients(result);
    return result.length > 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      pushStatus("Connecting to server... 🤔");
      // console.log("Connecting to server... 🤔"); ///////////
      // const checkServer = await pingServer()
      // const x = pingServer();
      // console.log(x);
      if (await pingServer()) {
        pushStatus("Successfully connected to server 😁");
        pushStatus("Fetching ingredients... 😃");
      } else {
        // console.log("Could'nt connect to server 🤕"); ///////////
        pushStatus("Could'nt connect to server 🤕");
        return;
      }

      if (await fetchIngredients()) {
        pushStatus("Successfully Fetched ingredients 😏");
        pushStatus("Let's find something to eat! 🤤");
        setTimeout(() => {
          setLoading(false);
        }, 5 * STATUS_SPEED);
      } else {
        pushStatus("Could'nt fetch ingredients 😕");
      }
    };

    // setLoading(true);
    fetchData();
    // setLoading(false);
  }, []);

  return (
    <>
      <Grid
        container
        // rowSpacing={0}
        // columnSpacing={{ xs: 1, sm: 1, md: 3, lg: 2, xl: 0 }}
        justifyContent="center"
        alignItems="center"
        // p={"1%"}
      >
        <Grid
          container
          // justifyContent="center"
          alignItems="center"
          style={{ backgroundColor: "Violet" }}
          p={"1%"}
        >
          <Header />
        </Grid>

        <Grid
          container
          // rowSpacing={2}
          // columnSpacing={{ xs: 2, sm: 1, md: 3, lg: 2, xl: 3 }}
          // spacing={{ xs: 2, sm: 1, md: 3, lg: 2, xl: 3 }}
          justifyContent="center"
          // alignItems="center"
          p={1}
          pr={"4%"}
          pl={"4%"}
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
            pb={4}
            // justifyContent="center"
          >
            <div>
              <div className="title">Search</div>
              <Search />
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
              <div className="title">Recipes</div>
              <Recipes />
            </div>
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ backgroundColor: "gray" }}
          p={3}
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

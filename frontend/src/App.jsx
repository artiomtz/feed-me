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
import { motion, AnimatePresence } from "framer-motion";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./App.css";

function App() {
  const {
    setIngredients,
    baseIngredients,
    setBaseIngredients,
    loading,
    setLoading,
    status,
    setStatus,
    pushStatus,
  } = useContext(RecipeContext);

  const fetchIngredients = async () => {
    const ingredients = await getIngredients(CDN_INGREDIENTS);
    const baseIngredients = await getIngredients(CDN_BASE_INGREDIENTS);
    // console.log(result); ///////////
    setIngredients(ingredients);
    setBaseIngredients(baseIngredients);
    // console.warn(baseIngredients);
    return ingredients.length > 0;
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
        pushStatus("Successfully connected 😁");
        pushStatus("Fetching ingredients.... 😃");
      } else {
        // console.log("Could'nt connect to server 🤕"); ///////////
        pushStatus("Could'nt connect to server 🤕");
        return;
      }

      if (await fetchIngredients()) {
        pushStatus("Fetched the ingredients 😏");
        pushStatus("Time to cook something! 🤤");
        setTimeout(() => {
          setLoading(false);
        }, NUM_MSGS * UI_SPEED);
      } else {
        pushStatus("Could'nt fetch ingredients 😕");
      }
    };

    // setLoading(true);
    fetchData();
    // setLoading(false);

    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <motion.div
        // layout
        initial={{ opacity: 0, scale: 1, y: [-100, -30] }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
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

          <motion.div
            // layout
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0.8, 1], scale: [0.8, 1] }}
            transition={{ duration: 3 }}
          >
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
                <motion.div
                  // layout
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0.8, 1], scale: [0.8, 1] }}
                  transition={{ duration: 2 }}
                >
                  <div>
                    <div className="title">Search</div>
                    <Search />
                  </div>
                </motion.div>
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
                <motion.div
                  // layout
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0.8, 1], scale: [0.8, 1] }}
                  transition={{ duration: 2 }}
                >
                  <div>
                    <div className="title">Recipes</div>
                    <Recipes />
                  </div>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
          {/* <motion.div
            layout
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0.8, 1], scale: [0.8, 1] }}
            transition={{ duration: 3 }}
          > */}
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
          {/* </motion.div> */}
        </Grid>
      </motion.div>
    </>
  );
}

export default App;

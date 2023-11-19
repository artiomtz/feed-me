import React, { useContext, useEffect } from "react";
import { pingServer } from "./api/rest/apiService";
import { getIngredients } from "./api/rest/apiService";
import RecipeContext from "./RecipeContext";
import Header from "./components/Header";
import Status from "./components/Status";
import Recipes from "./components/Recipes";
import Search from "./components/Search";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const { setIngredients, setBaseIngredients, setLoading, pushStatus } =
    useContext(RecipeContext);

  const fetchIngredients = async () => {
    const ingredients = await getIngredients(CDN_INGREDIENTS);
    const baseIngredients = await getIngredients(CDN_BASE_INGREDIENTS);
    setIngredients(ingredients);
    setBaseIngredients(baseIngredients);
    return ingredients.length > 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      pushStatus("Connecting to server... 🤔");
      if (await pingServer()) {
        pushStatus("Successfully connected 😁");
        pushStatus("Fetching ingredients.... 😃");
      } else {
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
    fetchData();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 1, y: [-100, -30] }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            container
            alignItems="center"
            m={"1%"}
            mt={0}
            sx={{
              boxShadow: 10,
              borderRadius: 5,
            }}
          >
            <Header />
          </Grid>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0.8, 1], scale: [0.8, 1] }}
            transition={{ duration: 3 }}
          >
            <Grid
              container
              justifyContent="center"
              p={1}
              pr={"4%"}
              pl={"4%"}
              style={{ minHeight: "60vh" }}
            >
              <Grid
                item
                xs={12}
                sm={10}
                md={10}
                lg={4}
                xl={4}
                p={"3%"}
                pb={4}
                sx={{
                  boxShadow: 10,
                  borderRadius: 5,
                }}
              >
                <motion.div
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
              <Grid item xs={12} sm={10} md={10} lg={8} xl={8} p={"3%"}>
                <motion.div
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
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            p={3}
            pr={"5%"}
            pl={"5%"}
          >
            <Status />
          </Grid>
        </Grid>
      </motion.div>
    </>
  );
}

export default App;

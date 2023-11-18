import React, { useContext, useEffect, useState } from "react";
import RecipeContext from "../RecipeContext";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Instructions from "./Instructions";
import ButtonGo from "./ButtonGo";
import ButtonBasics from "./ButtonBasics";
import { motion, AnimatePresence } from "framer-motion";
import Grid from "@mui/material/Grid";
import {
  fetchTestRecipes,
  fetchPossibleRecipes,
} from "../api/graphql/graphqlService";

export default function Search() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const {
    ingredients,
    baseIngredients,
    setBaseIngredients,
    setRecipes,
    loading,
    setLoading,
    setStatus,
    pushStatus,
  } = useContext(RecipeContext);

  const handleIngredientChange = (event, newIngredients) => {
    setSelectedIngredients(newIngredients);
  };

  const fetchRecipes = async () => {
    setLoading(true);
    pushStatus("Looking for recipes... 🫡");
    let recipes = [];

    if (DEBUG && !selectedIngredients.length) {
      recipes = await fetchTestRecipes();
    } else {
      recipes = await fetchPossibleRecipes(selectedIngredients);
    }
    setRecipes(recipes);

    if (recipes.length) {
      pushStatus(`I found ${recipes.length} recipes! 😋`);
    } else {
      pushStatus("Couldn't find any recipes 😣");
    }

    setTimeout(() => {
      setLoading(false);
    }, 2 * UI_SPEED);
  };

  const addBaseIngredients = () => {
    const newIngredients = new Set([
      ...selectedIngredients,
      ...baseIngredients.filter(
        (ingredient) => !selectedIngredients.includes(ingredient)
      ),
    ]);
    setSelectedIngredients(Array.from(newIngredients));
  };
  // useEffect(() => {}, []);  😶🥲😯😖🤪

  return (
    <>
      <Instructions />
      <div className="search">
        <Stack>
          <Autocomplete
            // id="autocomplete-field"
            value={selectedIngredients}
            ListboxProps={{
              sx: { fontFamily: "Playpen Sans" },
            }}
            ChipProps={{
              sx: { fontFamily: "Playpen Sans" },
            }}
            multiple
            disablePortal
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            filterSelectedOptions
            options={ingredients}
            sx={{ width: "100%" }}
            onChange={handleIngredientChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Ingredients"
                placeholder="add more"
              />
            )}
          />
        </Stack>
      </div>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <ButtonGo
          disabled={
            !DEBUG &&
            (loading ||
              selectedIngredients.length < MIN_INGREDIENTS ||
              selectedIngredients.length > MAX_INGREDIENTS)
              ? true
              : false
          }
          onClick={fetchRecipes}
        />
        <ButtonBasics
          disabled={baseIngredients.length == 0}
          onClick={addBaseIngredients}
        />
      </Grid>
    </>
  );
}

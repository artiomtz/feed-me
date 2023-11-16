import React, { useContext, useEffect, useState } from "react";
import RecipeContext from "../RecipeContext";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Instructions from "./Instructions";
import ButtonGo from "./ButtonGo";
import {
  fetchTestRecipes,
  fetchPossibleRecipes,
} from "../api/graphql/graphqlService";

export default function Search() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const { ingredients, setRecipes, loading, setLoading, setStatus } =
    useContext(RecipeContext);

  const handleIngredientChange = (event, newIngredients) => {
    setSelectedIngredients(newIngredients);
  };

  const fetchRecipes = async () => {
    setLoading(true);
    setStatus("Looking for recipes... 🫡");
    let recipes = [];

    if (DEBUG && !selectedIngredients.length) {
      recipes = await fetchTestRecipes();
    } else {
      recipes = await fetchPossibleRecipes(selectedIngredients);
    }
    setRecipes(recipes);

    if (recipes.length) {
      setStatus(`I found ${recipes.length} recipes 😋`);
    } else {
      setStatus("I couldn't find any recipes with these ingredients 😣");
    }
    setLoading(false);
  };

  // useEffect(() => {}, []);  😶😁🥲😏😣😯😕🫤😖🤪🤕

  return (
    <>
      <Instructions />
      <div className="search">
        <Stack>
          <Autocomplete
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
    </>
  );
}

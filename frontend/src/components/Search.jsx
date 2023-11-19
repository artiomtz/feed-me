import React, { useContext, useState } from "react";
import { fetchPossibleRecipes } from "../api/graphql/graphqlService";
import RecipeContext from "../RecipeContext";
import Instructions from "./Instructions";
import ButtonBasics from "./ButtonBasics";
import ButtonGo from "./ButtonGo";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

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

    const recipes = await fetchPossibleRecipes(selectedIngredients);
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
            sx={{
              boxShadow: 5,
              borderRadius: 2,
            }}
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

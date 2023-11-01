import React, { useContext, useEffect, useState } from "react";
import RecipeContext from "../RecipeContext";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { getIngredients } from "../api/rest/apiService";
import { fetchPossibleRecipes } from "../api/graphql/graphqlService";

export default function Search() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const { setRecipes } = useContext(RecipeContext);

  const fetchIngredients = async () => {
    const result = await getIngredients();
    setIngredients(result);
  };

  const handleIngredientChange = (event, newIngredients) => {
    setSelectedIngredients(newIngredients);
  };

  const fetchRecipes = async () => {
    const recipes = await fetchPossibleRecipes(selectedIngredients);
    setRecipes(recipes);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <>
      <Stack spacing={3} sx={{ width: 500 }}>
        <Autocomplete
          multiple
          disablePortal
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          filterSelectedOptions
          options={ingredients}
          sx={{ width: 300 }}
          onChange={handleIngredientChange}
          renderInput={(params) => (
            <TextField {...params} label="Ingredients" placeholder="add more" />
          )}
        />
      </Stack>
      <button
        className="btn btn-primary"
        onClick={() => {
          fetchRecipes();
        }}
      >
        Go!
      </button>
    </>
  );
}

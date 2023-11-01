import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { getIngredients } from "../api/rest/apiService";
// import RecipeContext from "../RecipeContext";

export default function Search() {
  const [ingredients, setIngredients] = useState(["waiting"]);
  //   useState([
  //     "Bread",
  //     "Salt",
  //     "Pepper",
  //     "Eggs",
  //     "Potatoes",
  //     "Tomatoes",

  useEffect(() => {
    // ingredients = getIngredients();
    setIngredients(getIngredients());
    console.log(ingredients);
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
          //   getOptionLabel={(option) => option.title}
          filterSelectedOptions
          // id="combo-box-demo"
          options={ingredients}
          groupBy={(option) => option.firstLetter}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Ingredients" placeholder="add more" />
          )}
        />
      </Stack>
    </>
  );
}

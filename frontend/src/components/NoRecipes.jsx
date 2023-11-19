import React from "react";
import Grid from "@mui/material/Grid";
import noRecipeIcon from "../assets/noRecipeIcon.png";

export default function NoRecipes() {
  const displayStyle = {
    height: "100%",
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={displayStyle}
      >
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img className="no-recipes" src={noRecipeIcon} alt="No recipes 😖" />
        </Grid>
        <Grid item>
          <div className="food-title">Nothing yet</div>
        </Grid>
      </Grid>
    </>
  );
}

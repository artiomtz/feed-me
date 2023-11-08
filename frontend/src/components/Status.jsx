import React, { useContext, useEffect, useState } from "react";
import RecipeContext from "../RecipeContext";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function Status() {
  const { status, loading } = useContext(RecipeContext);

  return (
    <>
      <div className="status">{status}</div>
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          variant={loading ? "indeterminate" : "determinate"}
          color="inherit"
          value={0}
        />
      </Box>
    </>
  );
}

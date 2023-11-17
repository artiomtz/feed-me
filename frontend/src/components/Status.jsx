import React, { useContext, useEffect, useState } from "react";
import RecipeContext from "../RecipeContext";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Fade from "@mui/material/Fade";

export default function Status() {
  const { status, setStatus, loading } = useContext(RecipeContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStatus((prevQueue) => {
        if (prevQueue.length > 1) {
          const [msg, ...rest] = prevQueue;
          return rest;
        }
        return prevQueue;
      });
    }, STATUS_SPEED);
  }, []);

  return (
    <>
      <div className="status">{status[0]}</div>
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

import React, { useContext, useEffect, useState } from "react";
import RecipeContext from "../RecipeContext";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Fade from "@mui/material/Fade";
import { motion, AnimatePresence } from "framer-motion";

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
    }, UI_SPEED);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: [0.5, 0.7, 1], scale: [0.7, 1, 0.7, 1, 1] }}
        transition={{ duration: NUM_MSGS * (UI_SPEED / 1000) }}
      >
        <div className="status">{status[0]}</div>
      </motion.div>
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

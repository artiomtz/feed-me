import React, { useContext, useEffect } from "react";
import RecipeContext from "../RecipeContext";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { motion, animate } from "framer-motion";

export default function Status() {
  const { status, setStatus, loading } = useContext(RecipeContext);

  useEffect(() => {
    setInterval(() => {
      setStatus((prevQueue) => {
        if (prevQueue.length > 1) {
          const [msg, ...rest] = prevQueue;
          return rest;
        }
        return prevQueue;
      });
    }, UI_SPEED);
  }, []);

  useEffect(() => {
    const status = document.getElementById("status");
    animate(
      status,
      { opacity: [0.5, 0.9, 1, 0.9] },
      { duration: UI_SPEED / 1000 }
    );
    animate(
      status,
      { scale: [0.7, 0.9, 1, 0.9] },
      { duration: UI_SPEED / 1000 }
    );
  }, [status[0]]);

  return (
    <>
      <motion.div>
        <div className="status">
          <div id="status">{status[0]}</div>
        </div>
      </motion.div>
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          variant={loading ? "indeterminate" : "determinate"}
          value={0}
          sx={{
            color: "cornsilk",
            boxShadow: 5,
            border: 3,
            borderRadius: 5,
            p: 1,

            backgroundColor: "cornsilk",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "lightblue",
            },
          }}
        />
      </Box>
    </>
  );
}

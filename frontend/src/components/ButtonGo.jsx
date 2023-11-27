import React from "react";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

export default function ButtonGo(props) {
  return (
    <>
      <Button
        variant="contained"
        size="medium"
        disabled={props.disabled}
        onClick={() => {
          props.onClick();
        }}
        sx={{
          color: "lavender",
          backgroundColor: "cornflowerblue",
          boxShadow: 5,
          border: 5,
          borderRadius: 5,
          "&:hover": {
            backgroundColor: "dodgerblue",
          },
        }}
      >
        <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.7 }}>
          <div className="button">GO</div>
        </motion.div>
      </Button>
    </>
  );
}

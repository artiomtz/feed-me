import React from "react";
import Button from "@mui/material/Button";

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
      >
        <div className="go-button">GO</div>
      </Button>
    </>
  );
}

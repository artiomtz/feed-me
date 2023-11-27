import React, { useContext } from "react";
import RecipeContext from "../RecipeContext";
import Slider from "@mui/material/Slider";

export default function SliderBar() {
  const { setSlider } = useContext(RecipeContext);

  const getSliderValue = (event) => {
    setSlider(event.target.value / 100);
  };

  return (
    <>
      Matching Accuracy
      <Slider
        marks
        step={5}
        valueLabelDisplay="auto"
        onChange={getSliderValue}
        min={SIMILARITY_THRESHOLD_MIN * 100}
        max={SIMILARITY_THRESHOLD_MAX * 100}
        defaultValue={SIMILARITY_THRESHOLD_DEFAULT * 100}
        sx={{
          color: "cornflowerblue",
        }}
        valueLabelFormat={(val) => {
          return `${val}%`;
        }}
      />
    </>
  );
}

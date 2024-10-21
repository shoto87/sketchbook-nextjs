import React from "react";
import GeneratePalatte from "../GeneratePalatte/page";
import SketchBook from "../SketchBook/page";
const draw = () => {
  return (
    <div>
      <SketchBook />
      <GeneratePalatte />
    </div>
  );
};

export default draw;

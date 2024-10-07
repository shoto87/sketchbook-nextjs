"use client";
import React, { useEffect } from "react";
import "./styles.css";

const AutoPalette = () => {
  useEffect(() => {
    const container = document.querySelector(".container");
    const refreshBtn = document.querySelector(".refresh-btn");

    const maxPaletteBoxes = 5;

    const generatePalette = () => {
      container.innerHTML = "";
      for (let i = 0; i < maxPaletteBoxes; i++) {
        let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
        randomHex = `#${randomHex.padStart(6, "0")}`;

        const color = document.createElement("li");
        color.classList.add("color");
        color.innerHTML = `<div class="rect-box" style="background: ${randomHex}"></div>
                             <span class="hex-value">${randomHex}</span>`;

        color.addEventListener("click", () => copyColor(color, randomHex));
        container.appendChild(color);
      }
    };

    const copyColor = (elem, hexVal) => {
      const colorElement = elem.querySelector(".hex-value");

      navigator.clipboard
        .writeText(hexVal)
        .then(() => {
          colorElement.innerText = "Copied";

          setTimeout(() => (colorElement.innerText = hexVal), 1000);
        })
        .catch(() => alert("Failed to copy the color code!"));
    };

    refreshBtn.addEventListener("click", generatePalette);
    generatePalette();
    return () => {
      refreshBtn.removeEventListener("click", generatePalette);
    };
  }, []);
  return (
    <div className="text-green-900">
      <ul className="container"></ul>{" "}
      {/* This is where the palette colors will be inserted */}
      <button className="refresh-btn">Refresh Palette</button>{" "}
      {/* Button to refresh the palette */}
    </div>
  );
};

export default AutoPalette;

"use client";
import React, { useEffect } from "react";
import "./styles.css";

const GeneratePalatte = () => {
  useEffect(() => {
    function generatePalette() {
      let inputColor = document.getElementById("colorPicker").value;

      // Generate palettes for each category
      generateShades("modern", inputColor, 5, [20, 40, 60, 80, 100]); // Modern shades
      generateShades("classic", inputColor, 5, [-10, -20, -30, -40, -50]); // Classic shades
      generateShades("vibrant", inputColor, 5, [40, 60, 80, 100, 120]); // Vibrant shades
      generateShades("oldSchool", inputColor, 5, [-40, -50, -60, -70, -80]); // Old School shades
      generateShades("vintage", inputColor, 5, [-50, -60, -70, -80, -90]); // Vintage shades
    }

    function generateShades(category, color, count, percentages) {
      const container = document.getElementById(category);
      container.innerHTML = ""; // Clear the container for new shades

      for (let i = 0; i < count; i++) {
        let shadeColorCode = shadeColor(color, percentages[i]);

        let shadeDiv = document.createElement("div");
        shadeDiv.className = "shade";
        shadeDiv.style.backgroundColor = shadeColorCode;

        let shadeCodeDiv = document.createElement("div");
        shadeCodeDiv.className = "shade-code";
        shadeCodeDiv.textContent = shadeColorCode;

        let copyButton = document.createElement("button");
        copyButton.className = "copy-btn";
        copyButton.textContent = "Copy";
        copyButton.onclick = () => copyColor(shadeColorCode);

        // Append color block and copy button to the container
        shadeDiv.appendChild(shadeCodeDiv);
        shadeDiv.appendChild(copyButton);
        container.appendChild(shadeDiv);
      }
    }

    function shadeColor(color, percent) {
      let R = parseInt(color.substring(1, 3), 16);
      let G = parseInt(color.substring(3, 5), 16);
      let B = parseInt(color.substring(5, 7), 16);

      R = parseInt((R * (100 + percent)) / 100);
      G = parseInt((G * (100 + percent)) / 100);
      B = parseInt((B * (100 + percent)) / 100);

      R = R < 255 ? R : 255;
      G = G < 255 ? G : 255;
      B = B < 255 ? B : 255;

      let RR =
        R.toString(16).length === 1 ? "0" + R.toString(16) : R.toString(16);
      let GG =
        G.toString(16).length === 1 ? "0" + G.toString(16) : G.toString(16);
      let BB =
        B.toString(16).length === 1 ? "0" + B.toString(16) : B.toString(16);

      return "#" + RR + GG + BB;
    }

    function copyColor(colorCode) {
      navigator.clipboard.writeText(colorCode).then(() => {
        alert(`Copied the color: ${colorCode}`);
      });
    }

    const generateButton = document.getElementById("generateBtn");
    generateButton.addEventListener("click", generatePalette);

    return () => {
      generateButton.removeEventListener("click", generatePalette);
    };
  }, []);

  return (
    <div className="container text-green-900 ">
      <input type="color" id="colorPicker" defaultValue="#64af6a" />
      <button id="generateBtn">Generate Palette</button>

      <div className="palette">
        {/* Modern Category */}
        <div className="category">
          <h3>Modern</h3>
          <div id="modern" className="shade-boxes"></div>
        </div>

        {/* Classic Category */}
        <div className="category">
          <h3>Classic</h3>
          <div id="classic" className="shade-boxes"></div>
        </div>

        {/* Vibrant Category */}
        <div className="category">
          <h3>Vibrant</h3>
          <div id="vibrant" className="shade-boxes"></div>
        </div>

        {/* Old School Category */}
        <div className="category">
          <h3>Old School</h3>
          <div id="oldSchool" className="shade-boxes"></div>
        </div>

        {/* Vintage Category */}
        <div className="category">
          <h3>Vintage</h3>
          <div id="vintage" className="shade-boxes"></div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePalatte;

"use client";
import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import GeneratePalatte from "../GeneratePalatte/page";

const SketchBook = () => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushWidth, setBrushWidth] = useState(5);
  const [selectedTool, setSelectedTool] = useState("brush");
  const [selectedColor, setSelectedColor] = useState("#000");
  const [fillColor, setFillColor] = useState(false);
  const [prevMouseX, setPrevMouseX] = useState(null);
  const [prevMouseY, setPrevMouseY] = useState(null);
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setCtx(context);

    // Set the initial canvas size and background
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground(context);

    // Cleanup on unmount
    return () => {
      setCtx(null);
    };
  }, []);

  const setCanvasBackground = (context) => {
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    context.fillStyle = selectedColor;
  };

  const startDraw = (e) => {
    setIsDrawing(true);
    setPrevMouseX(e.nativeEvent.offsetX);
    setPrevMouseY(e.nativeEvent.offsetY);
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    setSnapshot(
      ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
    );
  };

  const drawing = (e) => {
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);
    const offsetX = e.nativeEvent.offsetX;
    const offsetY = e.nativeEvent.offsetY;

    if (selectedTool === "brush" || selectedTool === "eraser") {
      ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    } else if (selectedTool === "rectangle") {
      drawRect(offsetX, offsetY);
    } else if (selectedTool === "circle") {
      drawCircle(offsetX, offsetY);
    } else {
      drawTriangle(offsetX, offsetY);
    }
  };

  const drawRect = (x, y) => {
    if (!fillColor) {
      ctx.strokeRect(x, y, prevMouseX - x, prevMouseY - y);
    } else {
      ctx.fillRect(x, y, prevMouseX - x, prevMouseY - y);
    }
  };

  const drawCircle = (x, y) => {
    const radius = Math.sqrt(
      Math.pow(prevMouseX - x, 2) + Math.pow(prevMouseY - y, 2)
    );
    ctx.beginPath();
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillColor ? ctx.fill() : ctx.stroke();
  };

  const drawTriangle = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(x, y);
    ctx.lineTo(prevMouseX * 2 - x, y);
    ctx.closePath();
    fillColor ? ctx.fill() : ctx.stroke();
  };

  const handleToolChange = (tool) => {
    setSelectedTool(tool);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleBrushWidthChange = (e) => {
    setBrushWidth(e.target.value);
  };

  const handleClearCanvas = () => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setCanvasBackground(ctx);
  };

  const handleSaveImage = () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const toggleFillColor = () => {
    setFillColor(!fillColor);
  };

  return (
    <div className="container">
      <section className="tools-board">
        <div className="row">
          <label className="title">Shapes</label>
          <ul className="options">
            <li
              className="option tool"
              onClick={() => handleToolChange("rectangle")}
            >
              <img src="icons/rectangle.svg" alt="" />
              <span>Rectangle</span>
            </li>
            <li
              className="option tool"
              onClick={() => handleToolChange("circle")}
            >
              <img src="icons/circle.svg" alt="" />
              <span>Circle</span>
            </li>
            <li
              className="option tool"
              onClick={() => handleToolChange("triangle")}
            >
              <img src="icons/triangle.svg" alt="" />
              <span>Triangle</span>
            </li>
            <li className="option">
              <input
                type="checkbox"
                id="fill-color"
                checked={fillColor}
                onChange={toggleFillColor}
              />
              <label htmlFor="fill-color">Fill color</label>
            </li>
          </ul>
        </div>
        <div className="row">
          <label className="title">Options</label>
          <ul className="options">
            <li
              className={`option tool ${
                selectedTool === "brush" ? "active" : ""
              }`}
              onClick={() => handleToolChange("brush")}
            >
              <img src="icons/brush.svg" alt="" />
              <span>Brush</span>
            </li>
            <li
              className={`option tool ${
                selectedTool === "eraser" ? "active" : ""
              }`}
              onClick={() => handleToolChange("eraser")}
            >
              <img src="icons/eraser.svg" alt="" />
              <span>Eraser</span>
            </li>
            <li className="option">
              <input
                type="range"
                id="size-slider"
                min="1"
                max="30"
                value={brushWidth}
                onChange={handleBrushWidthChange}
              />
            </li>
          </ul>
        </div>
        <div className="row colors">
          <label className="title" id="title">
            Colors
          </label>
          <input
            id="color"
            type="text"
            title="enter a hash vlaue..."
            placeholder="#color"
            value={selectedColor}
            onChange={handleColorChange}
          />
        </div>
        <div className="row buttons">
          <button className="clear-canvas" onClick={handleClearCanvas}>
            Clear Canvas
          </button>
          <button className="save-img" onClick={handleSaveImage}>
            Save As Image
          </button>
        </div>
      </section>
      <section className="drawing-board">
        <canvas
          ref={canvasRef}
          onMouseDown={startDraw}
          onMouseMove={drawing}
          onMouseUp={() => setIsDrawing(false)}
        />
      </section>
      {/* <div>
        <GeneratePalatte />
      </div> */}
    </div>
  );
};

export default SketchBook;

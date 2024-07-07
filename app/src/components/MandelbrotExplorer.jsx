import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import AnimatedPage from './AnimatedPage';

const MandelbrotFractal = () => {

  const navigate = useNavigate();

  const [zoom, setZoom] = useState(200); // Initial zoom level
  const [panX, setPanX] = useState(-0.5);
  const [panY, setPanY] = useState(0);
  const [useDarkFireTheme, setUseDarkFireTheme] = useState(false); // Toggle for dark fire theme
  const [zoomClickCount, setZoomClickCount] = useState(0); // Counter for zoom clicks
  const [showMandelbrot, setShowMandelbrot] = useState(true); // Toggle for showing Mandelbrot fractal
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight / 2 });



  useEffect(() => {
    const updateCanvasSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const canvasHeight = screenHeight / 2; // Set canvas height to half of screen height
      setCanvasSize({
        width: screenWidth,
        height: canvasHeight
      });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  useEffect(() => {
    renderMandelbrot();
  }, [zoom, panX, panY, useDarkFireTheme, canvasSize]); // Re-render on dependency change

  const drawMandelbrot = (ctx) => {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    const maxIter = 100;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let a = (x - width / 2) / zoom + panX;
        let b = (y - height / 2) / zoom + panY;
        const ca = a;
        const cb = b;
        let n = 0;

        while (n < maxIter) {
          const aa = a * a - b * b;
          const bb = 2 * a * b;
          a = aa + ca;
          b = bb + cb;

          if (a * a + b * b > 16) {
            break;
          }
          n++;
        }

        let color;
        if (useDarkFireTheme) {
          const brightness = map(n, 0, maxIter, 0, 1);
          const red = Math.floor(255 * Math.sqrt(brightness));
          const green = Math.floor(255 * Math.pow(brightness, 3));
          const blue = Math.floor(255 * Math.pow(brightness, 10));
          color = `rgb(${red}, ${green}, ${blue})`;
        } else {
          color = n === maxIter ? 'black' : 'white';
        }

        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  };

  const map = (value, start1, stop1, start2, stop2) => {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  };

  const renderMandelbrot = () => {
    const canvas = document.getElementById("mandelbrotCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before starting
    drawMandelbrot(ctx);
  };

  const zoomIn = () => {
    const targetX = -0.7449885;
    const targetY = 0.1859984;
    const zoomFactor = 1.5; // Factor to zoom in by
    setPanX(targetX + (panX - targetX) / zoomFactor);
    setPanY(targetY + (panY - targetY) / zoomFactor);
    setZoom(zoom * zoomFactor);
    setZoomClickCount(prevCount => prevCount + 1);

    if (zoomClickCount + 1 >= 30) {
      setShowMandelbrot(false); // Hide Mandelbrot fractal when rain is rendered
    }
  };



  const zoomOut = () => {
    const targetX = -0.7449885;
    const targetY = 0.1859984;
    const zoomFactor = 1.5; // Factor to zoom in by
    setPanX(targetX + (panX - targetX) / zoomFactor);
    setPanY(targetY + (panY - targetY) / zoomFactor);
    setZoom(zoom / zoomFactor);
  };

  const toggleColorScheme = () => {
    setUseDarkFireTheme(prevTheme => !prevTheme);
  };

  const nextLevel = () => {
    navigate('/intro1')
  }

  return (<AnimatedPage>
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 p-5 bg-gray-900 text-white">
      <div className="w-full max-w-xs text-center">
        <div className="text-lg font-bold mb-2">DevDash - CodeCrafters</div>
        <div className="font-bold mb-2">Playground (Take some rest)</div>
      </div>
      <div className="bg-gray-800 rounded-lg border border-gray-600 p-2 mb-4 lg:w-1/2">
        <canvas id="mandelbrotCanvas" width={canvasSize.width} height={canvasSize.height} className="w-full h-full rounded-lg"></canvas>
      </div>
      <div className="bg-gray-800 w-full flex flex-col items-center mb-4 rounded-lg border border-gray-600 p-4 lg:w-1/2">
        <div className="pb-2 text-lg">The Mandelbrot Fractal</div>
        <div className="pb-2">Stunning beauty of Complex Numbers! A live example of generating infinite patterns through simple rules.</div>
        <div className="flex justify-center">
          <button className="mr-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={toggleColorScheme}>Toggle Color Scheme</button>
          <button className="mr-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={zoomIn}>Zoom In</button>
          <button className="bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={zoomOut}>Zoom Out</button>
        </div>
        <div className="text-xs mt-2 p-1 bg-red-600 rounded-lg">Warning: Do not spam the buttons until the entire frame has been rendered, as the fractal is being rendered in real-time and is limited by your device's hardware capabilities.</div>
        <div className="mt-2">
          Though you can code it yourself.
          Bookmark the Wikipedia link to read later - <span><a href="https://en.wikipedia.org/wiki/Mandelbrot_set" target="_blank" className="text-blue-400 underline">Wikipedia</a></span>
        </div>
      </div>
      <button
        onClick={nextLevel}
        className="ml-2 mt1 p-2 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Next Level
      </button>
    </div>
    </AnimatedPage>
  );
};

export default MandelbrotFractal;

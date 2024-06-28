import React, { useState, useEffect } from 'react';
import Rain from './Rain.jsx'; // Assuming Rain component is in the same directory

const MandelbrotFractal = () => {
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
        const maxIter = 80;

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

        if (zoomClickCount + 1 >= 33) {
            setShowMandelbrot(false); // Hide Mandelbrot fractal when rain is rendered
        }
    };

    const toggleColorScheme = () => {
        setUseDarkFireTheme(prevTheme => !prevTheme);
    };

    return (
        <>
            <div className={`rain-container w-full h-screen ${zoomClickCount >= 33 && !showMandelbrot ? 'block' : 'hidden'}`}>
                <Rain />
            </div>
            <div className="bg-slate-900 flex flex-col items-center h-screen p-4">
                <div className={`mandelbrot-container w-full h-1/2 ${showMandelbrot ? '' : 'hidden'}`}>
                    <div className='text-white mb-4'>DevDash - CodeCrafters</div>
                    <div className='bg-slate-900 rounded-lg border border-gray-300 p-2 mb-4'>
                        <canvas id="mandelbrotCanvas" width={canvasSize.width} height={canvasSize.height} className="w-full h-full rounded-lg"></canvas>
                    </div>
                    <div className='bg-slate-800 w-full h-5/6 flex flex-col items-center mb-4 rounded-lg border border-gray-300 p-4'>
                        <div className='text-white pb-2'>The Mandelbrot Fractal</div>
                        <div className='flex justify-center'>
                            <button className="mr-4 p-2 bg-blue-500 text-white rounded-lg" onClick={toggleColorScheme}>Toggle Color Scheme</button>
                            <button className="p-2 bg-blue-500 text-white rounded-lg" onClick={zoomIn}>Zoom In</button>
                        </div>
                        <div className='text-white p-4'>The Mandelbrot Fractal Lorem ipsum, dolor as, fugit.</div>
                    </div>
                </div>
                <div id="overlay"></div>
            </div>

        </>

    );
};

export default MandelbrotFractal;

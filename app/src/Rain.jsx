// Rain.js

import React, { useEffect } from 'react';

const Rain = () => {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let cw = window.innerWidth;
    let ch = window.innerHeight;

    canvas.width = cw;
    canvas.height = ch;

    let charArr = [
      "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
      "1", "2", "3", "4", "5", "6", "7", "8",
      "А", "В", "Г", "Д", "Є", "Ѕ", "З", "И", "Ѳ", "І", "К", "Л", "М", "Н", "Ѯ", "Ѻ", "П", "Ч", "Р", "С", "Т", "Ѵ", "Ф", "Х", "Ѱ", "Ѿ", "Ц"
    ];

    let maxCharCount = 300;
    let fallingCharArr = [];
    let fontSize = 13;
    let maxColumns = cw / fontSize;

    let frames = 0;

    class FallingChar {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.value = '';
        this.speed = 0;
      }

      draw(ctx) {
        this.value = charArr[Math.floor(Math.random() * charArr.length)].toUpperCase();
        this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;

        ctx.fillStyle = "rgba(0, 255, 0)";
        ctx.font = fontSize + "px sans-serif";
        ctx.fillText(this.value, this.x, this.y);
        this.y += this.speed;

        if (this.y > ch) {
          this.y = (Math.random() * ch) / 2 - 50;
          this.x = Math.floor(Math.random() * maxColumns) * fontSize;
          this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
        }
      }
    }

    let update = () => {
      if (fallingCharArr.length < maxCharCount) {
        let fallingChar = new FallingChar(
          Math.floor(Math.random() * maxColumns) * fontSize,
          (Math.random() * ch) / 2 - 50
        );
        fallingCharArr.push(fallingChar);
      }
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, cw, ch);
      for (let i = 0; i < fallingCharArr.length && frames % 2 === 0; i++) {
        fallingCharArr[i].draw(ctx);
      }

      drawCenterText("Welcome to CyberTrace");

      requestAnimationFrame(update);
      frames++;
    };

    const drawCenterText = (text) => {
      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = "rgba(0, 0.5, 0, 0.5)";
      ctx.fillRect(cw / 2 - 180, ch / 2 - 29, 360, 40);
      ctx.restore();

      ctx.fillStyle = "#00ff00";
      ctx.font = "27px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.shadowColor = "#000";
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 2;
      ctx.fillText(text, cw / 2, ch / 2);
    };

    const handleResize = () => {
      cw = window.innerWidth;
      ch = window.innerHeight;
      canvas.width = cw;
      canvas.height = ch;
      maxColumns = cw / fontSize;
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, cw, ch);
    };

    window.addEventListener('resize', handleResize);
    update();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
      <canvas id="canvas" style={{ display: 'block' }}></canvas>
    </div>
  );
};

export default Rain;

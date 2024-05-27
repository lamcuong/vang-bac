import React, { useState, useEffect, useRef } from 'react';

function RainbowText({ text, speed = 50, brightness = 50, initialHue = 0 }) {
  const [hue, setHue] = useState(initialHue);
  const textRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHue((prevHue) => (prevHue + 5) % 360); // Update hue with smooth transitions
    }, speed);

    return () => clearInterval(intervalId);
  }, [speed]);

  useEffect(() => {
    if (textRef.current) {
      const letters = textRef.current.querySelectorAll('span');

      function applyRainbow() {
        letters.forEach((letter, index) => {
          const color = hslToRgb(hue + index * 20, brightness, 50); // Adjust spacing, brightness as needed
          letter.style.color = color;
        });
      }

      applyRainbow();
      const intervalId = setInterval(applyRainbow, speed); // Regularly reapply for smoothness

      return () => clearInterval(intervalId);
    }
  }, [text, hue, speed, brightness]);

  return (
    <h2 ref={textRef}>
      {text.split('').map((char, index) => (
        <span key={index}>{char}</span>
      ))}
    </h2>
  );
}

function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h % 2) - 1));
  const m = l - c / 2;

  const [r, g, b] = [0, 1, 2].map((channel) => {
    const hueChannel = ((channel + h) % 3) / 3;
    const color =
      255 *
      (hueChannel < 1 / 6
        ? m + c * hueChannel * 6
        : hueChannel < 1 / 2
        ? m + c
        : hueChannel < 2 / 3
        ? m + c * (2 / 3 - hueChannel) * 6
        : m);
    return Math.round(color);
  });

  return `rgb(${r}, ${g}, ${b})`;
}

export default RainbowText;
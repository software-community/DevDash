import React, { useState } from "react";
import "./Window.css"; // Import the CSS file for the Browser component
import Terminal from "./Terminal";
import Browser from "./Browser";

const Window = () => {
  const components = [
    { name: "Browser", component: <Browser /> },
    { name: "Terminal", component: <Terminal /> },
    // Add more components as needed
  ];

  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);

  const toggleComponent = () => {
    setCurrentComponentIndex((prevIndex) => (prevIndex + 1) % components.length);
  };

  return (
    <div className="window-border">
      <div className="window-title-bar">
        <span className="window-title">{components[currentComponentIndex].name}</span>
        <button className="toggle-button" onClick={toggleComponent}>
          Switch to {components[(currentComponentIndex + 1) % components.length].name}
        </button>
      </div>
      <div className="window-content">
        {components[currentComponentIndex].component}
      </div>
    </div>
  );
};

export default Window;

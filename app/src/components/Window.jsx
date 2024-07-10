import React, { useState } from "react";
// import "./Window.css"; // Import the CSS file for the Browser component
import Terminal from "./Terminal";
import Browser from "./Browser";
import MySQLTerminal from "./DataExplorer";
import HelpBot from "./HelpBot";

const Window = () => {
  const components = [
    { name: "Browser", component: <Browser /> },
    { name: "Terminal", component: <Terminal /> },
    {name: "Azure", component: <MySQLTerminal />}
    // Add more components as needed
  ];

  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  // const [startTime, setStartTime] = useState(null);

  // useEffect(() => {
  //   setStartTime(Date.now());
  //   return () => {
  //     const endTime = Date.now();
  //     const timeSpent = endTime - startTime;
  //     console.log(`Time spent on Window.jsx: ${timeSpent} milliseconds`);
  //   }
  // });

  const toggleComponent = () => {
    setCurrentComponentIndex((prevIndex) => (prevIndex + 1) % components.length);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-white">
      <div className="flex justify-between items-center bg-gray-800 text-white p-2">
        <span className="text-lg font-bold">{components[currentComponentIndex].name}</span>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded"
          onClick={toggleComponent}
        >
          Switch to {components[(currentComponentIndex + 1) % components.length].name}
        </button>
      </div>
      <div className=" bg-gray-900 h-full">
        {components[currentComponentIndex].component}
      </div>
    </div>
  );
};

export default Window;

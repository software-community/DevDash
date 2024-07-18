import React from "react";
import AnimatedPage from "./AnimatedPage";

const Notepad = ({ content, onClose, fileName }) => {
  return (
    <AnimatedPage>
    <div className="bg-gray-900 text-white h-full flex flex-col relative rounded-md">
      <div className="bg-gray-900 flex items-center justify-between pl-2 rounded-md">
        <span className="text-lg font-bold">{fileName}</span>
        <button
          className=" bg-red-500 text-white rounded-tr-md rounded-none hover:bg-red-600"
          onClick={onClose}
        >
          X
        </button>
      </div>
      <div className="bg-gray-800 flex-grow p-4 overflow-y-auto rounded-b-md">
        {content.split('\n').map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
    </AnimatedPage>
  );
};

export default Notepad;
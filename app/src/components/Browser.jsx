import React, { useState } from "react";
// import "./Browser.css"; // Import the CSS file for the Browser component

const Browser = () => {
  const [url, setUrl] = useState("");
  const [history, setHistory] = useState([]);
  const [currentContent, setCurrentContent] = useState("Welcome to the Browser! Enter a URL to get started.");

  const eurobankInfo = {
    Username: "kris",
    Password: "heheheha",
    Host: "localhost",
    Port: "1234"
  };

  const formatEurobankInfo = (info) => {
    return (
      <div>
        <p>
          <strong>Host:</strong> {info.Host}
        </p>
        <p>
          <strong>Port:</strong> {info.Port}
        </p>
        <p>
          <strong>Username:</strong> {info.Username}
        </p>
        <p>
          <strong>Password:</strong> {info.Password}
        </p>
      </div>
    );
  };

  const urlMappings = {
    "https://www.google.com": "sundar pichai moment",
    "https://www.eurobank.eu/files": eurobankInfo,
    "https://www.eurobank.eu": "ain't nothin around here",
  };

  const handleNavigate = (event) => {
    event.preventDefault();
    let trimmedUrl = url.trim();

    if (trimmedUrl === "") {
      return;
    }
    
    if (!trimmedUrl.startsWith("https://") && !trimmedUrl.startsWith("http://")) {
      if (trimmedUrl.startsWith("www.")) {
        trimmedUrl = "https://" + trimmedUrl;
        setUrl("https://" + url);
      } else {
        trimmedUrl = "https://www." + trimmedUrl;
        setUrl("https://www." + url);
      }
    }

    let output;
    if (urlMappings[trimmedUrl]) {
      output = urlMappings[trimmedUrl];
    } else {
      output = `Invalid URL: ${trimmedUrl}`;
    }

    if (typeof output === "object" && output.Host) {
      setCurrentContent(formatEurobankInfo(output));
    } else {
      setCurrentContent(output);
    }

    setHistory([...history, { url: trimmedUrl, output }]);
  };

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-md h-full flex flex-col">
      <form onSubmit={handleNavigate} className="flex mb-4">
        <input
          type="text"
          value={url}
          onChange={handleChange}
          className="bg-gray-800 text-white flex-grow px-2 py-1 rounded-md"
          placeholder="Enter URL"
          autoFocus
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded-md ml-2 hover:bg-blue-700"
        >
          Go
        </button>
      </form>
      <div className="bg-gray-800 p-4 rounded-lg flex-grow overflow-auto">{currentContent}</div>
    </div>
  );
};

export default Browser;

import React, { useState } from "react";
import "./Browser.css"; // Import the CSS file for the Browser component

const Browser = () => {
  const [url, setUrl] = useState("");
  const [history, setHistory] = useState([]);
  const [currentContent, setCurrentContent] = useState("");

  const eurobankInfo = {
    Host: "eurobank.eu",
    Port: "Not specified",
    Username: "Not specified",
    Password: "aT6kZ7xNv9Fy1qLuRiJ3mSbOp4W8cV2g",
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
  };

  const handleNavigate = (event) => {
    event.preventDefault();
    let trimmedUrl = url.trim();

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
    <div className="browser">
      <form onSubmit={handleNavigate} className="form">
        <input
          type="text"
          value={url}
          onChange={handleChange}
          className="url-input"
          placeholder="Enter URL"
          autoFocus
        />
        <button type="submit" className="navigate-button">
          Go
        </button>
      </form>
      <div className="content">{currentContent}</div>
    </div>
  );
};

export default Browser;

import React, { createContext, useState, useContext } from 'react';

const WindowContext = createContext();

export const useWindowContext = () => {
  return useContext(WindowContext);
};

export const WindowProvider = ({ children }) => {
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [sshVerified, setSshVerified] = useState(false);
  const [mysqlHistory, setMysqlHistory] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [url, setUrl] = useState("");
  const [currentContent, setCurrentContent] = useState("Welcome to the Browser! Enter a URL to get started.");

  return (
    <WindowContext.Provider value={{
      terminalHistory, setTerminalHistory,
      sshVerified, setSshVerified,
      mysqlHistory, setMysqlHistory,
      authenticated, setAuthenticated,
      url, setUrl,
      currentContent, setCurrentContent
    }}>
      {children}
    </WindowContext.Provider>
  );
};

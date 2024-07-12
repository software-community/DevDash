import React, { createContext } from 'react';

export const SampleContext = createContext();

const URLContext = ({ children }) => {
  const URL = "https://softcomdevdashalpha.onrender.com";
  
  return (
    <SampleContext.Provider value={{ URL }}>
      {children}
    </SampleContext.Provider>
  );
};

export default URLContext;

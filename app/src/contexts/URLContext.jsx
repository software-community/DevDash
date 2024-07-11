import React, { createContext } from 'react';

export const SampleContext = createContext();

const URLContext = ({ children }) => {
  const URL = "http://localhost:3000";
  
  return (
    <SampleContext.Provider value={{ URL }}>
      {children}
    </SampleContext.Provider>
  );
};

export default URLContext;

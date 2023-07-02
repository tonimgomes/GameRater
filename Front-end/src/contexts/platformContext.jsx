import React, { createContext, useState } from 'react';

export const PlatformContext = createContext();

export const PlatformProvider = ({ children }) => {
  const [selectedPlatform, setSelectedPlatform] = useState('');

  return (
    <PlatformContext.Provider value={{ selectedPlatform, setSelectedPlatform }}>
      {children}
    </PlatformContext.Provider>
  );
};

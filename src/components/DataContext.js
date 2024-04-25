// DataContext.js
import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [iamData, setIamData] = useState(null);
  const [infraData, setInfraData] = useState(null);
  const [userDetails, setUserData] = useState(null);

  return (
    <DataContext.Provider value={{ iamData, setIamData, infraData, setInfraData,userDetails, setUserData  }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

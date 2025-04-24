import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CaptainDataContext = createContext();

const CaptainProvider = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  };

  const contextValue = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
  };

  return (
    <CaptainDataContext.Provider value={contextValue}>
      {children}
    </CaptainDataContext.Provider>
  );
};

CaptainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CaptainProvider;

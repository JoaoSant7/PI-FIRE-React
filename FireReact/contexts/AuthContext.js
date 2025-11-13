// contexts/AuthContext.js
import React from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAuthStatus = async () => {
      // Simulate auth check
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    checkAuthStatus();
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const authContextValue = {
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
import React, { useState, useMemo } from 'react';
import Contexts from '../contexts/index.js';

const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(!!localStorage.userId);
  const logIn = () => setLogged(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLogged(false);
  };
  const initLogged = useMemo(() => ({ logged, logIn, logOut }), [logged]);

  return (
    <Contexts.Provider value={initLogged}>
      {children}
    </Contexts.Provider>
  );
};
export default AuthProvider;

import React, { useState, useMemo } from 'react';
import io from 'socket.io-client';
import Contexts from '../../contexts/index.js';

const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(!!localStorage.userId);
  const socket = io('http://localhost:3000');
  const logIn = () => setLogged(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLogged(false);
  };

  const initLogged = useMemo(() => ({
    logged, socket, logIn, logOut,
  }), [logged, socket]);

  return (
    <Contexts.Provider value={initLogged}>
      {children}
    </Contexts.Provider>
  );
};
export default AuthProvider;

import React, { useState, useMemo } from 'react';
import io from 'socket.io-client';
import * as filter from 'leo-profanity';
import Contexts from '../../contexts/index.js';

const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(!!localStorage.userId);
  const socket = io('http://localhost:3000', { reconnectionDelayMax: 10000 });
  const logIn = () => setLogged(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLogged(false);
  };
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));
  const filteredStr = (str) => filter.clean(str);
  const initLogged = useMemo(() => ({
    logged, socket, logIn, logOut, filteredStr,
  }), [logged, socket]);

  return (
    <Contexts.Provider value={initLogged}>
      {children}
    </Contexts.Provider>
  );
};
export default AuthProvider;

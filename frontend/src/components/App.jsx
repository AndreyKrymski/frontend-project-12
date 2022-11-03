import React from 'react';
import '../style/App.css';
import AuthProvider from './AuthProvider.jsx';
import BrowserRouter from './BrowserRouter.jsx';

const App = () => (
  <AuthProvider>
    <BrowserRouter />
  </AuthProvider>
);
export default App;

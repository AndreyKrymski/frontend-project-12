import React from 'react';
import { Provider } from 'react-redux';
import '../style/App.css';
import AuthProvider from './mainComponents/AuthProvider.jsx';
import store from '../slices/index.js';
import BrowserRouter from './mainComponents/BrowserRouter.jsx';
import '../i18n.js';

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter />
    </AuthProvider>
  </Provider>
);
export default App;

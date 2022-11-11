import React from 'react';
import { Provider } from 'react-redux';
import '../style/App.css';
import AuthProvider from './AuthProvider.jsx';
import store from '../slices/index.js';
import BrowserRouter from './BrowserRouter.jsx';

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter />
    </AuthProvider>
  </Provider>
);
export default App;

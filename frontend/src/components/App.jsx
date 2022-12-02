import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
// import { Provider, ErrorBoundary } from '@rollbar/react';
import '../style/App.css';
import AuthProvider from './mainComponents/AuthProvider.jsx';
import store from '../slices/index.js';
import BrowserRouter from './mainComponents/BrowserRouter.jsx';
import SocketProvider from './mainComponents/SocketProvider';
import '../i18n.js';

// const rollbarConfig = {
//  accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
//  environment: 'production',
//  server: {
//    root: 'http://localhost:3000/',
//    branch: 'main',
//  },
//  code_version: '0.13.7',
//  person: {
//    id: 117,
//    email: 'chief@unsc.gov',
//    username: 'john-halo',
//  },
// };
const App = async () => (
// <Provider config={rollbarConfig}>
  //  <ErrorBoundary>
  <StoreProvider store={store}>
    <SocketProvider>
      <AuthProvider>
        <BrowserRouter />
      </AuthProvider>
    </SocketProvider>
  </StoreProvider>
  //  </ErrorBoundary>
//  </Provider>
);
export default App;

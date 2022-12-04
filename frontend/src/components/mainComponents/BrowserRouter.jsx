import React from 'react';
import {
  BrowserRouter as Router, Link, Routes, Route, Navigate,
} from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import '../../style/Browser.css';
import SingUp from './SingUp.jsx';
import useAuth from '../../hooks/thisContext.js';
import Chat from './Chat.jsx';
import Toastify from '../componentWithModule/Toastify.jsx';

const BrowserRouter = () => {
  const { t, i18n } = useTranslation();
  const modal = useSelector((state) => state.module);
  const auth = useAuth();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <Router>
      <div className="container nav-container">
        <div className="nav-link-title">
          <Nav.Link as={Link} to={localStorage.userId ? '/' : '/login'}>{t('browserRouter.nameChat')}</Nav.Link>
          <button type="button" className="nav-button focus-button" onClick={() => changeLanguage('en')}>
            en
          </button>
          <button type="button" className="nav-button focus-button" onClick={() => changeLanguage('ru')}>
            ru
          </button>
        </div>
        <Toastify />
        {localStorage.userId
          ? (
            <button
              onClick={() => auth.logOut()}
              type="submit"
              className="input-logOut focus-button"
            >
              {t('browserRouter.clickSignUp')}
            </button>
          )
          : ''}
      </div>
      {modal.socketError && <div className="errorSocket">{t('errors.errNetwork')}</div>}
      <Routes>
        <Route path="/" element={localStorage.userId ? <Chat /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default BrowserRouter;

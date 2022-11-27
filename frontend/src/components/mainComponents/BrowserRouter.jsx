import React from 'react';
import {
  BrowserRouter as Router, Link, Routes, Route, Navigate,
} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import '../../style/Browser.css';
import SingUp from './SingUp.jsx';
import useAuth from '../../hooks/thisContext.js';
import Chat from './Chat.jsx';

const BrowserRouter = () => {
  const { t, i18n } = useTranslation();
  const auth = useAuth();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <Router>
      <Navbar>
        <Nav>
          <Nav.Link as={Link} to={localStorage.userId ? null : '/login'}>
            <div className="container">
              <div className="nav-link">
                {t('browserRouter.nameChat')}
                <button type="button" className="navInput" onClick={() => changeLanguage('en')}>EN</button>
                <button type="button" className="navInput" onClick={() => changeLanguage('ru')}>RU</button>
              </div>
              {localStorage.userId
                ? (
                  <div>
                    <button
                      onClick={() => auth.logOut()}
                      type="submit"
                      className="input-logOut"
                    >
                      {t('browserRouter.clickSignUp')}
                    </button>
                  </div>
                )
                : <div />}
            </div>
          </Nav.Link>
        </Nav>
      </Navbar>
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

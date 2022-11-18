import React from 'react';
import {
  BrowserRouter as Router, Link, Routes, Route, Navigate,
} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import '../../style/Browser.css';
import SingUp from './SingUp.jsx';
import useAuth from '../../hooks/thisContext.js';
import Chat from './Chat.jsx';

const BrowserRouter = () => {
  const auth = useAuth();
  return (
    <Router>
      <Navbar>
        <Nav>
          <Nav.Link as={Link} to={localStorage.userId ? null : '/login'}>
            <div className="container">
              <div className="nav-link">
                Hexlet Chat
              </div>
              {localStorage.userId
                ? (
                  <div>
                    <button onClick={() => auth.logOut()} type="submit" className="input-logOut">Выйти</button>
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

import React from 'react';
import {
  BrowserRouter as Router, Link, Routes, Route, Navigate,
} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import '../style/Browser.css';
import SingUp from './SingUp.jsx';
import useAuth from '../hooks/thisContext.js';
import Chat from './Chat.jsx';

const BrowserRouter = () => {
  const auth = useAuth();
  return (
    <Router>
      <Navbar>
        <Nav>
          <Nav.Link as={Link} to={auth.logged ? null : '/login'}>
            <div className="container">
              <div className="nav-link">
                Hexlet Chat
              </div>
            </div>
          </Nav.Link>
        </Nav>
      </Navbar>
      <Routes>
        <Route path="/" element={!auth.logged ? <Navigate to="/login" /> : <Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default BrowserRouter;

import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Link, Routes, Route, Navigate,
} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import '../style/Browser.css';
import SingUp from './SingUp.jsx';

const BrowserRouter = () => {
  useEffect(() => {
    <Navigate to="/login" state={{ from: 'location:3000' }} />;
  }, []);
  return (
    <Router>
      <Navbar>
        <Nav>
          <Nav.Link as={Link} to="/login">
            <div className="container">
              <div className="nav-link">
                Hexlet Chat
              </div>
            </div>
          </Nav.Link>
        </Nav>
      </Navbar>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default BrowserRouter;

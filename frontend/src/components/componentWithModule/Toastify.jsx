import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toastify = () => (
  <div className="toasify">
    <ToastContainer limit={1} />
  </div>
);
export default Toastify;

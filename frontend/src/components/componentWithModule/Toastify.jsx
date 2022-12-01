import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toastify = () => (
  <div className="toasify">
    <ToastContainer limit={2} />
  </div>
);
export default Toastify;


import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './Projects.css';

const Todolist = () => {

  return (
    <div className="projects-container">
      <ToastContainer />
      <h2>Projects</h2>
    </div>
  );
};

export default Todolist;

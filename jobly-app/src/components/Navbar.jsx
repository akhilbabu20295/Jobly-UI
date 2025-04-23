import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link to="/login" className="navbar-brand fw-bold text-warning">Jobly</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/login" className="nav-link active" aria-current="page">Jobs</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Companies</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Services</Link>
          </li>
        </ul>
        <div className="d-flex">
          <Link to="/login" className="btn btn-outline-dark me-2">Login</Link>
          <Link to="/register" className="btn btn-warning" style={{ color: 'white' }} >Register</Link>
        </div>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;

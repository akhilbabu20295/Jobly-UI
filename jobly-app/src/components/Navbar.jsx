import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/login" className="navbar-brand fw-bold text-warning">Jobly</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/jobs" className="nav-link active" aria-current="page">Jobs</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Companies</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Services</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <Link to="/login" className="btn btn-outline-dark me-2">Login</Link>
            <Link to="/register" className="btn btn-warning me-3" style={{ color: 'white' }}>Register</Link>

            {/* Employer Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="employerDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Employer
              </button>
              <ul className="dropdown-menu" aria-labelledby="employerDropdown">
                <li><Link to="/employer/login" className="dropdown-item">Employer Login</Link></li>
                <li><Link to="/recruiter-register" className="dropdown-item">Employer Register</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

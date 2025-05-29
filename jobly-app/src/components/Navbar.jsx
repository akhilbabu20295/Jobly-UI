import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const role = localStorage.getItem("role"); // "USER", "EMPLOYER", or null

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold text-warning">Jobly</Link>

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

            {/* --- DEFAULT NAV (for non-logged-in users) --- */}
            {!role && (
              <>
                {/* <li className="nav-item">
                  <Link to="/" className="nav-link active">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">About</Link>
                </li>
                <li className="nav-item">
                  <Link to="/services" className="nav-link">Services</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link">Contact</Link>
                </li> */}
              </>
            )}

            {/* --- USER NAV --- */}
            {role === "USER" && (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link to="/user-jobs" className="nav-link">Jobs</Link>
                </li>
                <li className="nav-item">
                  <Link to="/list-companies" className="nav-link">Companies</Link>
                </li>
                <li className="nav-item">
                  <Link to="/saved-jobs" className="nav-link">Saved Jobs</Link>
                </li>
              </>
            )}

            {/* --- EMPLOYER NAV --- */}
            {role === "RECRUITER" && (
              <>
                <li className="nav-item">
                  <Link to="/employer/dashboard" className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/employer/post-job" className="nav-link">Post a Job</Link>
                </li>
                <li className="nav-item">
                  <Link to="/employer/jobs" className="nav-link">Manage Jobs</Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {!role ? (
              <>
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
                    <li><Link to="/recruiter-register" className="dropdown-item">Employer Register</Link></li>
                  </ul>
                </div>
              </>
            ) : (
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

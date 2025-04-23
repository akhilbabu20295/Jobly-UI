import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-1"><span className="text-warning">Job</span>ly © 2025 — All rights reserved.</p>
          <div className="d-flex justify-content-center gap-3">
            <a href="#" className="text-white-50">Privacy Policy</a>
            <a href="#" className="text-white-50">Terms</a>
            <a href="#" className="text-white-50">Contact</a>
          </div>
        </div>
      </footer>
    );
};

export default Footer;

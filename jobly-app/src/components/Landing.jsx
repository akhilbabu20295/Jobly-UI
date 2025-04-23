import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Landing.css";
import Navbar from './Navbar';

const Landing = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredJobs = [
    { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp', location: 'San Francisco, CA', type: 'Full-time' },
    { id: 2, title: 'Product Manager', company: 'InnovateLabs', location: 'New York, NY', type: 'Full-time' },
    { id: 3, title: 'UX/UI Designer', company: 'DesignWave', location: 'Remote', type: 'Contract' },
  ];

  const topCompanies = [
    {
      id: 1,
      name: 'TechCorp',
      description: 'Leading technology solutions provider',
      openPositions: 15,
      logo: 'https://readdy.ai/api/search-image?query=modern%20minimalist%20tech%20company%20logo%20with%20blue%20and%20yellow%20accents%20on%20white%20background%20professional%20corporate%20branding%20simple%20geometric%20shapes%20clean%20design%20high%20quality%20vector%20style&width=100&height=100&seq=7&orientation=squarish'
    },
    {
        id: 2,
        name: 'TechCorp',
        description: 'Leading technology solutions provider',
        openPositions: 15,
        logo: 'https://readdy.ai/api/search-image?query=modern%20minimalist%20tech%20company%20logo%20with%20blue%20and%20yellow%20accents%20on%20white%20background%20professional%20corporate%20branding%20simple%20geometric%20shapes%20clean%20design%20high%20quality%20vector%20style&width=100&height=100&seq=7&orientation=squarish'
      },
      {
        id: 3,
        name: 'TechCorp',
        description: 'Leading technology solutions provider',
        openPositions: 15,
        logo: 'https://readdy.ai/api/search-image?query=modern%20minimalist%20tech%20company%20logo%20with%20blue%20and%20yellow%20accents%20on%20white%20background%20professional%20corporate%20branding%20simple%20geometric%20shapes%20clean%20design%20high%20quality%20vector%20style&width=100&height=100&seq=7&orientation=squarish'
      },
      {
        id: 4,
        name: 'TechCorp',
        description: 'Leading technology solutions provider',
        openPositions: 15,
        logo: 'https://readdy.ai/api/search-image?query=modern%20minimalist%20tech%20company%20logo%20with%20blue%20and%20yellow%20accents%20on%20white%20background%20professional%20corporate%20branding%20simple%20geometric%20shapes%20clean%20design%20high%20quality%20vector%20style&width=100&height=100&seq=7&orientation=squarish'
      },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-light text-dark py-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">Find Your <span className="text-warning">Dream Job</span></h1>
          <p className="lead">Connect with top employers and discover opportunities that match your skills.</p>
          <div className="input-group mt-4 w-50 mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Search jobs, companies, or keywords"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-warning search-btn">Search</button>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Featured Jobs</h2>
            <a href="#" className="text-warning">View all jobs</a>
          </div>
          <div className="row">
            {featuredJobs.map((job) => (
              <div className="col-md-3 mb-3" key={job.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{job.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                    <p className="card-text">{job.location} — {job.type}</p>
                    <button className="btn btn-warning w-100 mt-3">Apply Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Company Highlights Section */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Top Companies Hiring</h2>
            <a href="#" className="text-warning text-decoration-none">
              View all companies <i className="fas fa-arrow-right ms-2"></i>
            </a>
          </div>
          
          <div className="row g-4">
            {topCompanies.map((company) => (
              <div key={company.id} className="col-md-6 col-lg-3">
                <div className="card h-100 shadow-sm hover-shadow">
                  <div className="card-body text-center">
                    <img src={company.logo} alt={company.name} className="rounded-circle mb-3" width="80" height="80" />
                    <h5>{company.name}</h5>
                    <p className="text-muted">{company.description}</p>
                    <span className="badge bg-warning bg-opacity-25 text-warning mb-3">
                      {company.openPositions} open positions
                    </span>
                    <button className="btn btn-warning btn-sm text-white">
                      View Jobs
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

       {/* Stats Section */}
       <div className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Why Choose Jobly</h2>
          <p className="lead text-muted mb-5 mx-auto" style={{maxWidth: '600px'}}>
            Join thousands of job seekers and employers who trust Jobly for their career and hiring needs.
          </p>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm p-4">
                <i className="fas fa-briefcase text-warning fs-1 mb-3"></i>
                <h4 className="fw-bold">10,000+</h4>
                <p className="text-muted">Active job listings from top companies</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 shadow-sm p-4">
                <i className="fas fa-users text-warning fs-1 mb-3"></i>
                <h4 className="fw-bold">1 Million+</h4>
                <p className="text-muted">Registered job seekers finding their dream jobs</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 shadow-sm p-4">
                <i className="fas fa-building text-warning fs-1 mb-3"></i>
                <h4 className="fw-bold">5,000+</h4>
                <p className="text-muted">Companies hiring through our platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>


     
    </div>
  );
};

export default Landing;

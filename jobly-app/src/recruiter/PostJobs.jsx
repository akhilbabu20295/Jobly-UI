import React, { useState } from "react";

const PostJobs = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    experienceLevel: "",
    description: "",
    postedDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Optional: validate fields here
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4">Post a New Job</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="title" className="form-label">
              Job Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="company" className="form-label">
              Company
            </label>
            <input
              type="text"
              className="form-control"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <input
              type="number"
              className="form-control"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              step="0.01"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="experienceLevel" className="form-label">
              Experience Level
            </label>
            <select
              className="form-select"
              id="experienceLevel"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              required
            >
              <option value="">Choose...</option>
              <option value="Entry">Entry</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>
          </div>

          <div className="col-12">
            <label htmlFor="description" className="form-label">
              Job Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="col-md-4">
            <label htmlFor="postedDate" className="form-label">
              Posted Date
            </label>
            <input
              type="date"
              className="form-control"
              id="postedDate"
              name="postedDate"
              value={formData.postedDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobs;

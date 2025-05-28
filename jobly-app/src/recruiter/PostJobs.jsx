import axios from "axios";
import React, { useEffect, useState } from "react";

const PostJobs = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    salary: "",
    experienceLevel: "",
    description: ""
  });

  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const recruiterId = 1; // Hardcoded for now

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/v1/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `http://localhost:8081/api/v1/recruiters/jobs/${recruiterId}`;

    try {
      const response = await axios.post(endpoint, formData);
      alert("Job posted successfully!");
      setFormData({
        title: "",
        location: "",
        salary: "",
        experienceLevel: "",
        description: ""
      });
      setShowModal(false);
      fetchJobs();
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job.");
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:8081/api/v1/jobs/${jobId}`);
      alert("Job deleted");
      fetchJobs();
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete job.");
    }
  };

  return (
    <div className="container mt-5">
      {/* Button to open modal */}
      <div className="d-flex justify-content-between mb-3">
        <h3>Job Listings</h3>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Post Job
        </button>
      </div>

      {/* Job Listing Table */}
      <div className="card shadow p-4">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Experience</th>
              <th>Posted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.id}>
                <td>{index + 1}</td>
                <td>{job.title}</td>
                <td>{job.location}</td>
                <td>{job.salary}</td>
                <td>{job.experienceLevel}</td>
                <td>{job.postedDate}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2">Edit</button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">No jobs posted yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Post a New Job</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Job Title</label>
                      <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Location</label>
                      <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Salary</label>
                      <input type="number" className="form-control" name="salary" value={formData.salary} onChange={handleChange} step="0.01" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Experience Level</label>
                      <select className="form-select" name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} required>
                        <option value="">Choose...</option>
                        <option value="Entry">Entry</option>
                        <option value="Mid">Mid</option>
                        <option value="Senior">Senior</option>
                        <option value="Lead">Lead</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Job Description</label>
                      <textarea className="form-control" name="description" rows="4" value={formData.description} onChange={handleChange} required />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Post Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostJobs;

import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateRecruiterModal = ({ show, handleClose, recruiterData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    yearsOfExperience: "",
    bio: "",
    activeJobPostCount: "",
    linkedInUrl: "",
    isVerified: false,
    companyId: null,
  });

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    if (recruiterData) {
      setFormData({
        firstName: recruiterData.firstName || "",
        lastName: recruiterData.lastName || "",
        email: recruiterData.email || "",
        phone: recruiterData.phone || "",
        location: recruiterData.location || "",
        yearsOfExperience: recruiterData.yearsOfExperience || "",
        bio: recruiterData.bio || "",
        activeJobPostCount: recruiterData.activeJobPostCount || "",
        linkedInUrl: recruiterData.linkedInUrl || "",
        isVerified: recruiterData.isVerified || false,
        companyId: recruiterData.company?.id || "",
      });
    }
  }, [recruiterData]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/companies")
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(`http://localhost:8081/api/v1/recruiters/${recruiterData.user.id}`, formData)
      .then(() => {
        alert("Recruiter profile updated successfully.");
        handleClose();
      })
      .catch((err) => {
        console.error("Error updating recruiter:", err);
        alert("Failed to update recruiter profile.");
      });
  };

  if (!show) return null;

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content p-4">
          <div className="modal-header">
            <h5 className="modal-title">Edit Recruiter Profile</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body row g-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Years of Experience</label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  className="form-control"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Bio</label>
                <textarea
                  name="bio"
                  className="form-control"
                  rows="3"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">LinkedIn URL</label>
                <input
                  type="text"
                  name="linkedInUrl"
                  className="form-control"
                  value={formData.linkedInUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Active Job Post Count</label>
                <input
                  type="number"
                  name="activeJobPostCount"
                  className="form-control"
                  value={formData.activeJobPostCount}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Company</label>
                <select
                  name="companyId"
                  className="form-select"
                  value={formData.companyId}
                  onChange={handleChange}
                >
                  <option value="">Select Company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 d-flex align-items-center">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isVerified"
                    checked={formData.isVerified}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Verified</label>
                </div>
              </div>
            </div>

            <div className="modal-footer mt-4">
              <button type="submit" className="btn btn-success">
                Save Changes
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecruiterModal;

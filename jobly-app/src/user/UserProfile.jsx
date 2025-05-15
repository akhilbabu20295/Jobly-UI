import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import UpdateProfileModal from "./UpdateProfileModal";
import EditSkillsModal from "./EditSkillsModal";
import axios from "axios";

const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState(["Java", "Spring Boot", "MYSQL", "Hibernate"]); // Default skills

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/user/profile/4")
      .then((response) => {
        setProfile(response.data);
        // You can extract skills from response if available
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const handleSaveSkills = (updatedSkills) => {
    setSkills(updatedSkills);
    // Optionally, send to backendcd
    // axios.put("/api/skills", updatedSkills);
  };

  return (
    <div className="container w-100">
      <UpdateProfileModal show={showModal} handleClose={() => setShowModal(false)} profileData={profile} />
      <EditSkillsModal
        show={showSkillModal}
        handleClose={() => setShowSkillModal(false)}
        skills={skills}
        onSave={handleSaveSkills}
      />

      <div className="bg-white rounded shadow-sm" style={{ marginTop: "150px" }}>
        <div className="header-bg">
          <div className="profile-img shadow">
            {profile ? `${profile.firstName?.charAt(0) || ''}${profile.lastName?.charAt(0) || ''}` : "NA"}
          </div>
        </div>

        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center" style={{ marginTop: "50px" }}>
            <div>
              <h3 className="fw-bold">
                {profile ? `${profile.firstName} ${profile.lastName}` : "Full Name"}
              </h3>
              <p className="text-warning fw-semibold mb-1">{profile?.designation || "Job Title"}</p>
              <p className="text-muted">
                <i className="bi bi-geo-alt-fill"></i> {profile?.location || "Location"}
              </p>
            </div>
            <div>
              <button onClick={() => setShowModal(true)} className="btn btn-yellow me-2">
                <i className="bi bi-pencil-square"></i> Edit Profile
              </button>
            </div>
          </div>
          <p className="mt-3 text-muted">{profile?.bio || "Short bio will go here..."}</p>

          <div className="row mt-4">
            <div className="col-md-4 mb-3">
              <div className="card card-light p-3">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="mb-1"><i className="bi bi-envelope-fill"></i> {profile?.email || "Email"}</p>
                <p><i className="bi bi-telephone-fill"></i> {profile?.mobile || "Phone"}</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card card-light p-3">
                <h6 className="fw-bold">Profile Stats</h6>
                <p className="mb-1"><span className="fw-bold text-warning">178</span> Profile Views</p>
                <p className="mb-1"><span className="fw-bold text-warning">12</span> Job Matches</p>
                <p><span className="fw-bold text-warning">92%</span> Completed</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card card-light p-3">
                <h6 className="fw-bold">Job Preferences</h6>
                <p className="mb-1"><i className="bi bi-clock-fill"></i> Available: In 2 weeks</p>
                <p><i className="bi bi-cash-stack"></i> Expected: $90,000 - $120,000</p>
              </div>
            </div>
          </div>

          <div className="card card-light p-3 mt-3">
            <h6 className="fw-bold mb-2">Skills</h6>
            <div className="card">
              <div className="card-body">
                <h5 className="d-flex align-items-center mb-3">Skills</h5>
                {skills.map((skill, index) => (
                  <span key={index} className="badge bg-warning bg-opacity-25 text-warning mb-3 me-2">
                    {skill}
                  </span>
                ))}
              </div>
              <button className="btn btn-sm btn-outline-warning" onClick={() => setShowSkillModal(true)}>
                <i className="bi bi-pencil-square"></i> Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

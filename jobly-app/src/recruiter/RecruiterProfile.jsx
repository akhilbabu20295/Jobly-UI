import React, { useState, useEffect } from "react";
import "./RecruiterProfile.css";
import axios from "axios";
import UpdateRecruiterModal from "./UpdateRecruiterModal";

const RecruiterProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/v1/recruiters/profile/${userId}`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  return (
    <div className="container w-100">
      {/* ✅ Correct Modal Component */}
      <UpdateRecruiterModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        recruiterData={profile}
      />

      <div className="bg-white rounded shadow-sm" style={{ marginTop: "150px" }}>
        <div className="header-bg">
          <div className="profile-img shadow">
            {profile
              ? `${profile.firstName?.charAt(0) || ""}${profile.lastName?.charAt(0) || ""}`
              : "NA"}
          </div>
        </div>

        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center" style={{ marginTop: "50px" }}>
            <div>
              <h3 className="fw-bold">
                {profile ? `${profile.firstName} ${profile.lastName}` : "Full Name"}
              </h3>
              <p className="text-warning fw-semibold mb-1">
                {profile?.designation || "Recruiter"}
              </p>
              <p className="text-muted">
                <i className="bi bi-geo-alt-fill"></i> {profile?.location || "Location"}
              </p>
              <p className="text-muted">
                <i className="bi bi-briefcase-fill"></i> {profile?.yearsOfExperience || 0} Years of Experience
              </p>
              {profile?.linkedInUrl && (
                <p className="text-muted">
                  <i className="bi bi-linkedin"></i>{" "}
                  <a href={profile.linkedInUrl} target="_blank" rel="noreferrer">LinkedIn Profile</a>
                </p>
              )}
            </div>
            <div>
              {/* ✅ Modal Trigger */}
              <button onClick={() => setShowModal(true)} className="btn btn-yellow me-2">
                <i className="bi bi-pencil-square"></i> Edit Profile
              </button>
            </div>
          </div>

          <p className="mt-3 text-muted">{profile?.bio || "No bio available."}</p>

          <div className="row mt-4">
            <div className="col-md-4 mb-3">
              <div className="card card-light p-3">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="mb-1">
                  <i className="bi bi-envelope-fill"></i> {profile?.email || "Email"}
                </p>
                <p>
                  <i className="bi bi-telephone-fill"></i> {profile?.phone || "Phone"}
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card card-light p-3">
                <h6 className="fw-bold">Company</h6>
                <p className="mb-1 fw-semibold">{profile?.company?.name || "Company Name"}</p>
                <p className="mb-1">
                  <i className="bi bi-geo-alt"></i> {profile?.company?.location || "Company Location"}
                </p>
                <p className="mb-1">
                  <i className="bi bi-building"></i> {profile?.company?.industry || "Industry"}
                </p>
                {profile?.company?.website && (
                  <p className="mb-0">
                    <i className="bi bi-globe"></i>{" "}
                    <a href={profile.company.website} target="_blank" rel="noreferrer">
                      Website
                    </a>
                  </p>
                )}
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card card-light p-3">
                <h6 className="fw-bold">Profile Stats</h6>
                <p className="mb-1">
                  <span className="fw-bold text-warning">178</span> Profile Views
                </p>
                <p className="mb-1">
                  <span className="fw-bold text-warning">12</span> Job Matches
                </p>
                <p>
                  <span className="fw-bold text-warning">92%</span> Completed
                </p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;

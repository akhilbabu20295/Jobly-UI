import React, { useState } from "react";
import "./UserProfile.css";
import UpdateProfileModal from "./UpdateProfileModal";


const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);



  return (
    <div className="container w-100">
      <UpdateProfileModal
        show={showModal}
        handleClose={() => setShowModal(false)}
       
      />
        <div class="bg-white rounded shadow-sm" style={{marginTop:"150px"}}>
          <div class="header-bg">
            <div class="profile-img shadow">SA</div>
          </div>

          <div class="p-4">
            <div class="d-flex justify-content-between align-items-center" style={{marginTop:"50px"}}>
              <div>
                <h3 class="fw-bold">Sarah Anderson</h3>
                <p class="text-warning fw-semibold mb-1">UX/UI Designer</p>
                <p class="text-muted"><i class="bi bi-geo-alt-fill"></i> New York, NY</p>
              </div>
              <div>
                <button onClick={() => setShowModal(true)} class="btn btn-yellow me-2"><i class="bi bi-pencil-square"></i> Edit Profile</button>
              </div>
            </div>
            <p class="mt-3 text-muted">
              Passionate UX/UI designer with a focus on creating intuitive and engaging digital experiences. Specialized in user-centered design and iterative development processes.
            </p>

            <div class="row mt-4">
              <div class="col-md-4 mb-3">
                <div class="card card-light p-3">
                  <h6 class="fw-bold">Contact Information</h6>
                  <p class="mb-1"><i class="bi bi-envelope-fill"></i> sarah.anderson@email.com</p>
                  <p><i class="bi bi-telephone-fill"></i> +1 (555) 987-6543</p>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="card card-light p-3">
                  <h6 class="fw-bold">Profile Stats</h6>
                  <p class="mb-1"><span class="fw-bold text-warning">178</span> Profile Views</p>
                  <p class="mb-1"><span class="fw-bold text-warning">12</span> Job Matches</p>
                  <p><span class="fw-bold text-warning">92%</span> Completed</p>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="card card-light p-3">
                  <h6 class="fw-bold">Job Preferences</h6>
                  <p class="mb-1"><i class="bi bi-clock-fill"></i> Available: In 2 weeks</p>
                  <p><i class="bi bi-cash-stack"></i> Expected: $90,000 - $120,000</p>
                </div>
              </div>
            </div>
            <div class="card card-light p-3 mt-3">
              <h6 class="fw-bold mb-2">Skills</h6>
              <div className="card">
                    <div className="card-body">
                      <h5 className="d-flex align-items-center mb-3">Skills</h5>
                      <span className="badge bg-warning bg-opacity-25 text-warning mb-3 me-2">
                        Java
                      </span>
                      <span className="badge bg-warning bg-opacity-25 text-warning mb-3 me-2">
                        Spring Boot
                      </span>
                      <span className="badge bg-warning bg-opacity-25 text-warning mb-3 me-2">
                        MYSQL
                      </span>
                      <span className="badge bg-warning bg-opacity-25 text-warning mb-3 me-2">
                        Hibernate
                      </span>
                    </div>
                  </div>
            </div>
          </div>
        </div>
     
    </div>
  );
};

export default UserProfile;
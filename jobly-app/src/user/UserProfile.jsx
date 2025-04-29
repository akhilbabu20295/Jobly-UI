import React, { useState } from "react";
import "./UserProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import UpdateProfileModal from "./UpdateProfileModal";


const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);
  // Mock user data - replace with actual user data from your state management
  const user = {
    name: "John Doe",
    title: "Senior Software Engineer",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    about: "Passionate software engineer with 5+ years of experience in full-stack development.",
    experience: [
      {
        company: "Tech Corp",
        position: "Senior Software Engineer",
        duration: "2020 - Present"
      },
      {
        company: "StartUp Inc",
        position: "Software Developer",
        duration: "2018 - 2020"
      }
    ],
    education: [
      {
        school: "University of Technology",
        degree: "BS in Computer Science",
        year: "2018"
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL"]
  };

  return (
    <div className="container w-100">
      <UpdateProfileModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        userData={user}
      />
      <div className="main-body">
        <div className="container" style={{ "width": "100vw" }}>
          <div className="row">
            {/* Left Profile Card */}
            <div className="col-12 col-sm-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="/AKHIL_PHOTO.jpg"
                      alt="Admin"
                      className="rounded-circle p-1 bg-warning"
                      width="110"
                    />
                    <div className="mt-3">
                      <h4>John Doe</h4>
                      <p className="text-secondary mb-1">Full Stack Developer</p>
                      <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <ul className="list-group list-group-flush">
                    {/* Example Social Item */}
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <i className="feather feather-globe me-2 icon-inline"></i>
                        Website
                      </h6>
                      <span className="text-secondary">https://bootdey.com</span>
                    </li>
                    {/* Repeat for other social links... */}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="col-12 col-sm-9">
              <div className="card mb-3">

                <div className="card-body" >
                  <div className="left" style={{ marginLeft: "500px" }}>
                    <button onClick={() => setShowModal(true)} className="btn btn-warning" style={{ color: 'white', padding: '8px' }}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </div>
                  {[
                    { label: 'Full Name', value: 'John Doe' },
                    { label: 'Email', value: 'john@example.com' },
                    { label: 'Phone', value: '(239) 816-9029' },
                    { label: 'Mobile', value: '(320) 380-4539' },
                    { label: 'Address', value: 'Bay Area, San Francisco, CA' },
                  ].map((field, idx) => (
                    <div className="row mb-3" key={idx}>
                      <div className="col-sm-4">
                        <h6 className="mb-0">{field.label}</h6>
                      </div>
                      <div className="col-sm-8 text-secondary">
                        {field.value}
                      </div>
                    </div>
                  ))}

                </div>
              </div>

              {/* Skills*/}
              <div className="row">
                <div className="col-sm-12">
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

              {/*Resume   */}
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <h3 className="text-2xl font-bold text-gray-200 mb-5">Resume</h3>
                    <div className="card-body">
                    <div className="border border-gray-200 rounded-lg p- flex flex-col items-center justify-center">
                      <button
                        className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors duration-200 mb-4 cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        Update resume
                      </button>
                      <p className="text-sm text-gray-500 text-center">
                        Supported Formats: doc, docx, rtf, pdf, upto 2 MB
                      </p>
                    </div>
                    </div>
                   
                  </div>
                </div>
              </div>

              {/* Job Listings */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
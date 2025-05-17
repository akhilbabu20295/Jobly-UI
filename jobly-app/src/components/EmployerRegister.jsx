import React, { useState } from "react";
import "./EmployerRegister.css";

function EmployerRegister() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profilePictureUrl: "",
    location: "",
    jobTitle: "",
    companyName: "",
    companyWebsite: "",
    industry: "",
    yearsOfExperience: "",
    activeJobPostCount: "",
    linkedInUrl: "",
    twitterUrl: "",
    isVerified: false,
  });

  const [companyLogo, setCompanyLogo] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setCompanyLogo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });
    if (companyLogo) {
      payload.append("companyLogo", companyLogo);
    }
    console.log("Submitted:", Object.fromEntries(payload));
    alert("Form submitted (check console for data)");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">👨‍💼 Employer Registration</h2>
        <hr></hr>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-grid">
            {[
              { name: "firstName", label: "First Name" },
              { name: "lastName", label: "Last Name" },
              { name: "email", label: "Email", type: "email" },
              { name: "phone", label: "Phone" },
              { name: "profilePictureUrl", label: "Profile Picture URL" },
              { name: "location", label: "Location" },
              { name: "jobTitle", label: "Job Title" },
              { name: "yearsOfExperience", label: "Years of Experience", type: "number" },
              { name: "linkedInUrl", label: "LinkedIn URL" },
              { name: "twitterUrl", label: "Twitter URL" },
            ].map(({ name, label, type = "text" }) => (
              <div key={name} className="form-group">
                <label>{label}</label>
                <input
                  type={type}
                  className="form-control"
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${label}`}
                />
              </div>
            ))}
          </div>
          {/* Company Name Dropdown */}
          <div className="form-group">
            <label>Company Name</label>
            <select
              name="companyName"
              className="form-control"
              value={formData.companyName}
              onChange={handleInputChange}
            >
              <option value="">Select a company</option>
              <option value="Google">Google</option>
              <option value="Amazon">Amazon</option>
              <option value="Microsoft">Microsoft</option>
              <option value="TCS">TCS</option>
              <option value="Infosys">Infosys</option>
              <option value="Accenture">Accenture</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployerRegister;

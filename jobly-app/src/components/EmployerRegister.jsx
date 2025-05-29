import React, { useState, useEffect } from "react";
import "./EmployerRegister.css";

function EmployerRegister() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    companyId: "",
    yearsOfExperience: "",
    activeJobPostCount: "",
    linkedInUrl: "",
    twitterUrl: "",
    isVerified: false,
  });

  const [companyLogo, setCompanyLogo] = useState(null);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/v1/companies")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
      })
      .catch((err) => {
        console.error("Failed to fetch companies:", err);
      });
  }, []);

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

    // Construct the payload object
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      yearsOfExperience: Number(formData.yearsOfExperience),
      activeJobPostCount: Number(formData.activeJobPostCount || 0),
      linkedInUrl: formData.linkedInUrl,
      twitterUrl: formData.twitterUrl,
      isVerified: formData.isVerified,
      companyId: formData.companyId,
      password: formData.password // You can get this from user input if needed
    };

    fetch("http://localhost:8081/api/v1/recruiters/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to register recruiter");
        }
        return res.text();
      })
      .then((data) => {
        console.log("Success:", data);
        alert("Recruiter registered successfully!");
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Error during registration");
      });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">👨‍💼 Employer Registration</h2>
        <hr />
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-grid">
            {[
              { name: "firstName", label: "First Name" },
              { name: "lastName", label: "Last Name" },
              { name: "email", label: "Email", type: "email" },
              { name: "password", label: "Password", type: "password" },
              { name: "phone", label: "Phone" },
              { name: "location", label: "Location" },
              { name: "jobTitle", label: "Job Title" },
              { name: "yearsOfExperience", label: "Years of Experience", type: "number" },
              { name: "linkedInUrl", label: "LinkedIn URL" },
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
            <label>Company</label>
            <select
              name="companyId" // ✅ must match the state key
              className="form-control"
              value={formData.companyId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
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

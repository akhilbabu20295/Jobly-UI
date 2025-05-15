import React, { useState } from "react";

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
    <div className="container mt-5">
      <div className="card shadow-lg" style={{ marginTop: "100px" }}>
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Employer Registration</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              {[
                { name: "firstName", label: "First Name" },
                { name: "lastName", label: "Last Name" },
                { name: "email", label: "Email", type: "email" },
                { name: "phone", label: "Phone" },
                { name: "profilePictureUrl", label: "Profile Picture URL" },
                { name: "location", label: "Location" },
                { name: "jobTitle", label: "Job Title" },
                { name: "companyName", label: "Company Name" },
                { name: "companyWebsite", label: "Company Website" },
                { name: "industry", label: "Industry" },
                { name: "yearsOfExperience", label: "Years of Experience", type: "number" },
                { name: "activeJobPostCount", label: "Active Job Post Count", type: "number" },
                { name: "linkedInUrl", label: "LinkedIn URL" },
                { name: "twitterUrl", label: "Twitter URL" },
              ].map(({ name, label, type = "text" }) => (
                <div key={name} className="col-md-6 mb-3">
                  <label>{label}</label>
                  <input
                    type={type}
                    className="form-control"
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}

              <div className="col-md-6 mb-3">
                <label>Company Logo</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <div className="col-md-6 mb-3 form-check mt-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="isVerified"
                  checked={formData.isVerified}
                  onChange={handleInputChange}
                  id="isVerified"
                />
                <label className="form-check-label" htmlFor="isVerified">
                  Verified Account
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary text-white">
              Register as Employer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployerRegister;

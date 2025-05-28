import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import axios from "axios";

const CompanyList = () => {
  const [topCompanies, setTopCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/companies")
      .then((response) => {
        setTopCompanies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch companies.");
        setLoading(false);
        console.error("Error fetching companies:", error);
      });
  }, []);

  if (loading) return <div>Loading companies...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Top Companies Hiring</h2>
          <a href="#" className="text-warning text-decoration-none">
            View all companies <i className="fas fa-arrow-right ms-2"></i>
          </a>
        </div>

        <div className="row g-4">
          {topCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyList;

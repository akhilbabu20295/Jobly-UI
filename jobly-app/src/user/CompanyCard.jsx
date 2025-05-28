import React from "react";

const CompanyCard = ({ company }) => {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="card h-100 shadow-sm hover-shadow">
        <div className="card-body text-center">
          <img
            src={company.logo}
            alt={company.name}
            className="rounded-circle mb-3"
            width="80"
            height="80"
          />
          <h5>{company.name}</h5>
          <p className="text-muted">{company.description}</p>
          <span className="badge bg-warning bg-opacity-25 text-warning mb-3">
            {company.openPositions} open positions
          </span>
          <button className="btn btn-warning btn-sm text-white">View Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;

import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
    return (
        <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
                <div className="card-body">
                    <h5 className="fw-bold">
                        <Link to={`/jobs/${job.id}`} className="text-warning text-decoration-none">
                            {job.title}
                        </Link>
                    </h5>
                    <p className="text-muted mb-1">
                        <i className="bi bi-geo-alt-fill me-2"></i>{job.location}
                    </p>
                    <p className="mb-1"><strong>Salary:</strong> ${job.salary?.toLocaleString()}</p>
                    <p className="mb-1"><strong>Experience:</strong> {job.experienceLevel}</p>
                    <p className="mb-2 text-truncate" title={job.description}>
                        <strong>Description:</strong> {job.description}
                    </p>
                    <small className="text-muted">
                        Posted on: {new Date(job.postedDate).toLocaleDateString()}
                    </small>
                </div>
            </div>
        </div>
    );
};

export default JobCard;

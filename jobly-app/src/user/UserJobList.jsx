import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";

const UserJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/recruiters/jobs")
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5">Loading jobs...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="bg-white py-5">
      <div className="container">
        <h2 className="fw-bold mb-4">Latest Job Listings</h2>
        <div className="row g-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserJobList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard"; // Reusing existing component

const SavedJobList = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const candidateId = 1; // Can be dynamic later

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/v1/bookmarks?candidateId=${candidateId}`)
      .then((response) => {
        setSavedJobs(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching saved jobs:", err);
        setError("Failed to load saved jobs.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5">Loading saved jobs...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="bg-light py-5">
      <div className="container">
        <h2 className="fw-bold mb-4">Saved Jobs</h2>
        <div className="row g-4">
          {savedJobs.length > 0 ? (
            savedJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="text-center w-100">No saved jobs found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedJobList;

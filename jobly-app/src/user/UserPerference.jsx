import React, { useState } from 'react';
import JobPreferenceModal from './JobPreferenceModal';

const UserJobPreference = () => {
  const [showModal, setShowModal] = useState(false);

  const [preferences, setPreferences] = useState({
    availability: 'Immediately',
    jobType: 'Full-time',
    salaryRange: '$90,000 - $120,000',
    location: 'Remote',
  });

  const handleSave = (updatedPrefs) => {
    setPreferences(updatedPrefs);
    setShowModal(false);
    // Optionally send to backend using axios.post/put
  };

  return (
    <div className="card card-light p-3 mt-4">
      <h6 className="fw-bold mb-2">Job Preferences</h6>
      <p className="mb-1"><i className="bi bi-clock-fill"></i> Available: {preferences.availability}</p>
      <p className="mb-1"><i className="bi bi-briefcase-fill"></i> Type: {preferences.jobType}</p>
      <p className="mb-1"><i className="bi bi-cash-stack"></i> Expected Salary: {preferences.salaryRange}</p>
      <p><i className="bi bi-geo-alt-fill"></i> Location: {preferences.location}</p>

      <button className="btn btn-sm btn-outline-warning mt-2" onClick={() => setShowModal(true)}>
        <i className="bi bi-pencil-square"></i> Edit Preferences
      </button>

      <JobPreferenceModal
        show={showModal}
        onClose={() => setShowModal(false)}
        preferences={preferences}
        onSave={handleSave}
      />
    </div>
  );
};

export default UserJobPreference;

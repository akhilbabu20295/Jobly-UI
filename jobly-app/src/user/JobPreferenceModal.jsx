import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const JobPreferenceModal = ({ show, onClose, preferences, onSave }) => {
  const [localPrefs, setLocalPrefs] = useState(preferences);

  useEffect(() => {
    setLocalPrefs(preferences);
  }, [preferences]);

  const handleChange = (e) => {
    setLocalPrefs({
      ...localPrefs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    onSave(localPrefs);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Job Preferences</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Availability</Form.Label>
            <Form.Select name="availability" value={localPrefs.availability} onChange={handleChange}>
              <option>Immediately</option>
              <option>In 1 Week</option>
              <option>In 2 Weeks</option>
              <option>In 1 Month</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Job Type</Form.Label>
            <Form.Select name="jobType" value={localPrefs.jobType} onChange={handleChange}>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Contract</option>
              <option>Freelance</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Expected Salary</Form.Label>
            <Form.Control
              type="text"
              name="salaryRange"
              value={localPrefs.salaryRange}
              onChange={handleChange}
              placeholder="$90,000 - $120,000"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Preferred Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={localPrefs.location}
              onChange={handleChange}
              placeholder="Remote / Bangalore / etc."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JobPreferenceModal;

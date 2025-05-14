import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditSkillsModal = ({ show, handleClose, skills, onSave }) => {
  const [localSkills, setLocalSkills] = useState([]);

  useEffect(() => {
    setLocalSkills(skills);
  }, [skills]);

  const handleChange = (e, index) => {
    const updated = [...localSkills];
    updated[index] = e.target.value;
    setLocalSkills(updated);
  };

  const handleAdd = () => {
    setLocalSkills([...localSkills, ""]);
  };

  const handleRemove = (index) => {
    const updated = [...localSkills];
    updated.splice(index, 1);
    setLocalSkills(updated);
  };

  const handleSave = () => {
    onSave(localSkills.filter(skill => skill.trim() !== ""));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Skills</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {localSkills.map((skill, index) => (
          <Form.Group className="mb-2" key={index}>
            <div className="d-flex">
              <Form.Control
                type="text"
                value={skill}
                onChange={(e) => handleChange(e, index)}
              />
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemove(index)}
                className="ms-2"
              >
                X
              </Button>
            </div>
          </Form.Group>
        ))}
        <Button variant="outline-primary" size="sm" onClick={handleAdd}>
          + Add Skill
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSkillsModal;

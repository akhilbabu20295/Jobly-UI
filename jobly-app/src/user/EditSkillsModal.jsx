import React, { useState, useEffect } from "react";

const EditSkillsModal = ({ show, handleClose, skills, onSave, availableSkills }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    setSelectedSkills(skills || []);
  }, [skills]);

  const handleAddSkill = (event) => {
    const skillId = event.target.value;
    const selectedSkill = availableSkills.find(skill => skill.id.toString() === skillId);
    if (selectedSkill && !selectedSkills.includes(selectedSkill.name)) {
      setSelectedSkills([...selectedSkills, selectedSkill.name]);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const handleSave = () => {
    onSave(selectedSkills);
    handleClose();
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content p-4">
          <div className="modal-header">
            <h5 className="modal-title">Edit Skills</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <select className="form-select mb-3" onChange={handleAddSkill} defaultValue="">
              <option value="" disabled>-- Select a Skill --</option>
              {availableSkills.map(skill => (
                <option key={skill.id} value={skill.id}>{skill.name}</option>
              ))}
            </select>
            <div className="mb-3">
              {selectedSkills.map((skill, index) => (
                <span key={index} className="badge bg-warning text-dark me-2 mb-2">
                  {skill}{" "}
                  <button
                    type="button"
                    className="btn-close btn-close-white btn-sm ms-1"
                    onClick={() => handleRemoveSkill(skill)}
                  ></button>
                </span>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSkillsModal;

import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function EditCompanyModal({ show, handleClose, company, onSave }) {
  const [form, setForm] = useState(company || {});

  useEffect(() => {
    setForm(company || {});
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Company</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Industry</Form.Label>
            <Form.Control
              type="text"
              name="industry"
              value={form.industry || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={form.location || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="url"
              name="website"
              value={form.website || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Logo URL</Form.Label>
            <Form.Control
              type="url"
              name="logoUrl"
              value={form.logoUrl || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={form.description || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" type="submit">Save Changes</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

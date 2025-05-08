import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const UpdateProfileModal = ({ show, handleClose, profileData }) => {
  const [formData, setFormData] = useState({
    bio: profileData?.bio || '',
    firstName: profileData?.firstName || '',
    lastName: profileData?.lastName || '',
    address: profileData?.address || '',
    location: profileData?.location || '',
    mobile: profileData?.mobile || '',
    email: profileData?.email || '',
    dob: profileData?.dob || '',
    designation: profileData?.designation || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile Data:', formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>

          {/* Bio */}
          <h5>Profile Bio</h5>
          <hr />
          <Form.Group className="mb-4">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Write your bio here..."
              required
            />
          </Form.Group>

          {/* Personal Info */}
          <h5>Personal Information</h5>
          <hr />
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </Col>
            <Col md={6}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your address here..."
              required
            />
          </Form.Group>

          {/* Contact Info */}
          <h5>Contact & Work Info</h5>
          <hr />
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                required
              />
            </Col>
            <Col md={6}>
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                required
              />
            </Col>
          </Row>

          {/* New Email Row */}
          <Row className="mb-4">
            <Col md={12}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                required
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={6}>
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Your role/designation"
                required
              />
            </Col>
          </Row>

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Profile
            </Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateProfileModal;

import React, { useState } from "react";
import { Button, Form, Alert, Spinner } from "react-bootstrap";

export default function AddCompany() {
  const [form, setForm] = useState({
    name: "",
    logoUrl: "",
    website: "",
    industry: "",
    location: "",
    description: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8081/api/v1/companies/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to create company");
      }

      setSuccessMessage("Company created successfully!");
      setForm({
        name: "",
        logoUrl: "",
        website: "",
        industry: "",
        location: "",
        description: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to create company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h2>Add New Company</h2>
      <p className="text-muted">Dashboard / Companies / Add Company</p>

      <div className="card p-4 shadow-sm">
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter company name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Industry</Form.Label>
                <Form.Control
                  type="text"
                  name="industry"
                  placeholder="e.g. Healthcare, IT"
                  value={form.industry}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={form.location}
                  placeholder="Company location"
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="url"
                  name="website"
                  value={form.website}
                  placeholder="https://company.com"
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>

          <div className="mb-3">
            <Form.Group>
              <Form.Label>Logo URL</Form.Label>
              <Form.Control
                type="url"
                name="logoUrl"
                value={form.logoUrl}
                placeholder="https://image-link.com"
                onChange={handleChange}
              />
            </Form.Group>
          </div>

          <div className="mb-3">
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={form.description}
                placeholder="Brief about the company"
                onChange={handleChange}
              />
            </Form.Group>
          </div>

          <div className="text-end">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Save Company"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

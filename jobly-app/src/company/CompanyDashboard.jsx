import React, { useEffect, useState } from "react";
import { Badge, Button, Table, Spinner, Alert, Form } from "react-bootstrap";
import EditCompanyModal from "./EditCompanyModal";

export default function CompanyDashboard() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

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
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8081/api/v1/companies")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch companies");
                return res.json();
            })
            .then((data) => {
                setCompanies(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error:", err);
                setError("Failed to load company data");
                setLoading(false);
            });
    }, []);

    const handleEditClick = (company) => {
        setSelectedCompany(company);
        setShowEditModal(true);
    };

    const handleUpdateCompany = (updatedData) => {
        fetch(`http://localhost:8081/api/v1/companies/${updatedData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to update company");
                return res.json();
            })
            .then((data) => {
                setCompanies((prev) =>
                    prev.map((company) => (company.id === data.id ? data : company))
                );
                setShowEditModal(false);
            })
            .catch((err) => {
                console.error("Error updating company:", err);
                alert("Failed to update company");
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");
        setSaving(true);

        try {
            const response = await fetch("http://localhost:8081/api/v1/companies/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) throw new Error("Failed to create company");

            const newCompany = await response.json();
            setCompanies((prev) => [...prev, newCompany]);
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
            setSaving(false);
        }
    };

    return (
        <div className="container py-4">
            <h2>Company Management</h2>
            <p className="text-muted">Dashboard / Companies</p>

            <div className="row">
                {/* Company List */}
                <div className="col-lg-7 mb-4">
                    <div className="card p-3 shadow-sm">
                        <div className="mb-3 d-flex justify-content-between">
                            <input type="text" placeholder="Search Companies" className="form-control w-50" />
                            <select className="form-select w-25">
                                <option>Status</option>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>

                        {loading ? (
                            <div className="text-center py-5">
                                <Spinner animation="border" />
                            </div>
                        ) : error ? (
                            <Alert variant="danger">{error}</Alert>
                        ) : (
                            <Table hover responsive>
                                <thead className="table-light">
                                    <tr>
                                        <th>Logo</th>
                                        <th>Name</th>
                                        <th>Industry</th>
                                        <th>Location</th>
                                        <th>Status</th>
                                        <th>Website</th>
                                        <th>Created At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companies.map((c, i) => (
                                        <tr key={i}>
                                            <td>
                                                {c.logoUrl ? (
                                                    <img src={c.logoUrl} alt="logo" style={{ width: 50, height: 50 }} />
                                                ) : (
                                                    "N/A"
                                                )}
                                            </td>
                                            <td>{c.name}</td>
                                            <td>{c.industry}</td>
                                            <td>{c.location}</td>
                                            <td>
                                                <Badge bg={c.status === "Active" ? "success" : "secondary"}>
                                                    {c.status}
                                                </Badge>
                                            </td>
                                            <td>
                                                <a href={c.website} target="_blank" rel="noreferrer">
                                                    Visit
                                                </a>
                                            </td>
                                            <td>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A"}</td>
                                            <td>
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    onClick={() => handleEditClick(c)}
                                                >
                                                    Edit
                                                </Button>{" "}
                                                <Button variant="outline-danger" size="sm">
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </div>
                </div>

                {/* Add Company Form */}
                <div className="col-lg-5">
                    <div className="card p-4 shadow-sm">
                        <h5>Add New Company</h5>

                        {successMessage && <Alert variant="success">{successMessage}</Alert>}
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-2">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter company name"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Industry</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="industry"
                                    value={form.industry}
                                    onChange={handleChange}
                                    placeholder="e.g. IT, Healthcare"
                                />
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Website</Form.Label>
                                <Form.Control
                                    type="url"
                                    name="website"
                                    value={form.website}
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                                />
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label>Logo URL</Form.Label>
                                <Form.Control
                                    type="url"
                                    name="logoUrl"
                                    value={form.logoUrl}
                                    onChange={handleChange}
                                    placeholder="https://logo.png"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <div className="text-end">
                                <Button type="submit" variant="primary" disabled={saving}>
                                    {saving ? <Spinner animation="border" size="sm" /> : "Save Company"}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>

            {/* Edit Company Modal */}
            <EditCompanyModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                company={selectedCompany}
                onSave={handleUpdateCompany}
            />
        </div>
    );
}

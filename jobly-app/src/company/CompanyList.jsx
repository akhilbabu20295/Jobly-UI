import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Table, Spinner, Alert } from "react-bootstrap";
import EditCompanyModal from "./EditCompanyModal"; // Adjust path as needed


export default function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleEditClick = (company) => {
        setSelectedCompany(company);
        setShowEditModal(true);
    };

    const handleUpdateCompany = (updatedData) => {
        console.log("updatedData.id"+updatedData.id)
        fetch(`http://localhost:8081/api/v1/companies/${updatedData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to update company");
                }
                return res.json();
            })
            .then((data) => {
                // Update the company in the list
                setCompanies((prev) =>
                    prev.map((company) => (company.id === data.id ? data : company))
                );
                setShowEditModal(false); // Close modal
            })
            .catch((err) => {
                console.error("Error updating company:", err);
                alert("Failed to update company");
            });
    };

    useEffect(() => {
        fetch("http://localhost:8081/api/v1/companies")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch companies");
                }
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

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2>Companies</h2>
                    <p className="text-muted">Dashboard / Companies</p>
                </div>
                <Link to="/add-company">
                    <Button variant="success">Add Company</Button>
                </Link>
            </div>

            <div className="card p-3 shadow-sm">
                <div className="mb-3 d-flex justify-content-between">
                    <input
                        type="text"
                        placeholder="Search Companies"
                        className="form-control w-50"
                    />
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((c, i) => (
                                <tr key={i}>
                                    <td>
                                        {c.logoUrl ? (
                                            <img
                                                src={c.logoUrl}
                                                alt="logo"
                                                style={{ width: 50, height: 50 }}
                                            />
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
                                        <span style={{ cursor: "pointer" }}>⋮</span>
                                    </td>
                                    <td>
                                        <Button variant="outline-primary" size="sm" onClick={() => handleEditClick(c)}>
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

                <EditCompanyModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    company={selectedCompany}
                    onSave={handleUpdateCompany}
                />

            </div>
        </div>
    );
}

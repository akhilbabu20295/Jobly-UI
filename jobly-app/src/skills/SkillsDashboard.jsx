import React, { useEffect, useState } from "react";
import { Badge, Button, Table, Spinner, Alert, Form } from "react-bootstrap";
import EditSkillsModal from "./EditSkillsModal";

export default function SkillsDashboard() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);

    const [form, setForm] = useState({
        name: "",
        description: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8081/api/v1/admin/skills")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch skills");
                return res.json();
            })
            .then((data) => {
                setSkills(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error:", err);
                setError("Failed to load skills data");
                setLoading(false);
            });
    }, []);

    const handleEditClick = (skill) => {
        setSelectedSkill(skill);
        setShowEditModal(true);
    };

    const handleUpdateSkill = (updatedData) => {
        fetch(`http://localhost:8081/api/v1/admin/skills/${updatedData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to update skill");
                return res.json();
            })
            .then((data) => {
                setSkills((prev) =>
                    prev.map((skill) => (skill.id === data.id ? data : skill))
                );
                setShowEditModal(false);
            })
            .catch((err) => {
                console.error("Error updating skills:", err);
                alert("Failed to update skill");
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
        const response = await fetch("http://localhost:8081/api/v1/admin/skills", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const contentType = response.headers.get("content-type");

        if (!response.ok) {
            const errorText = contentType?.includes("application/json")
                ? await response.json()
                : await response.text();
            throw new Error(errorText.message || errorText || "Failed to create skill");
        }

        const newSkill = contentType?.includes("application/json")
            ? await response.json()
            : null;

        if (newSkill) {
            setSkills((prev) => [...prev, newSkill]);
            setSuccessMessage("Skill created successfully!");
            setForm({ name: "", description: "" });
        } else {
            setSuccessMessage("Skill created successfully, but no data returned.");
        }
    } catch (error) {
        console.error("Error:", error);
        setErrorMessage(error.message || "Failed to create skill.");
    } finally {
        setSaving(false);
    }
};

    return (
        <div className="container py-4">
            <h2>Skills Management</h2>
            <p className="text-muted">Dashboard / Skills</p>

            <div className="row">
                {/* Skills List */}
                <div className="col-lg-7 mb-4">
                    <div className="card p-3 shadow-sm">
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
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Created At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {skills.map((skill, i) => (
                                        <tr key={i}>
                                            <td>{skill.name}</td>
                                            <td>{skill.description}</td>
                                            <td>
                                                {skill.createdAt
                                                    ? new Date(skill.createdAt).toLocaleDateString()
                                                    : "N/A"}
                                            </td>
                                            <td>
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    onClick={() => handleEditClick(skill)}
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

                {/* Add Skill Form */}
                <div className="col-lg-5">
                    <div className="card p-4 shadow-sm">
                        <h5>Add New Skill</h5>

                        {successMessage && <Alert variant="success">{successMessage}</Alert>}
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Skill Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter skill name"
                                    required
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
                                    placeholder="Enter description"
                                />
                            </Form.Group>

                            <div className="text-end">
                                <Button type="submit" variant="primary" disabled={saving}>
                                    {saving ? <Spinner animation="border" size="sm" /> : "Save Skill"}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>

            {/* Edit Skills Modal */}
            <EditSkillsModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                skills={selectedSkill}
                onSave={handleUpdateSkill}
            />
        </div>
    );
}

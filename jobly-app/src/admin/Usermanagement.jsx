import React, { useEffect, useState } from "react";
import { Badge, Button, Table, Spinner, Alert, Modal } from "react-bootstrap";

export default function Usermanagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8081/api/v1/admin/users")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch users");
                return res.json();
            })
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error:", err);
                setError("Failed to load user data");
                setLoading(false);
            });
    }, []);

    const handleView = (user) => {
        setSelectedUser(user);
        setShowViewModal(true);
    };

    const handleDelete = (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        fetch(`http://localhost:8081/api/v1/admin/users/${userId}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to delete user");
                setUsers((prev) => prev.filter((u) => u.id !== userId));
            })
            .catch((err) => {
                console.error("Delete error:", err);
                alert("Failed to delete user.");
            });
    };

    return (
        <div className="container py-4">
            <h2>User Management</h2>
            <p className="text-muted">Dashboard / Users</p>

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
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Designation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={i}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.designation}</td>
                                    <td>
                                        <Button
                                            variant="info"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleView(user)}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>

            {/* View Modal */}
            <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <div>
                            <p><strong>First Name:</strong> {selectedUser.firstName}</p>
                            <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <p><strong>Mobile:</strong> {selectedUser.mobile}</p>
                            <p><strong>Designation:</strong> {selectedUser.designation}</p>
                            <p><strong>Address:</strong> {selectedUser.address}</p>
                            <p><strong>Location:</strong> {selectedUser.location}</p>
                            <p><strong>Date of Birth:</strong> {selectedUser.dateOfBirth}</p>
                            <p><strong>Bio:</strong> {selectedUser.bio}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

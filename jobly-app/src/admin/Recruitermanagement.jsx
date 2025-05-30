import React, { useEffect, useState } from "react";
import { Button, Table, Spinner, Alert, Modal } from "react-bootstrap";

export default function RecruiterManagement() {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8081/api/v1/admin/users") // Assuming same endpoint returns recruiters
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recruiters");
        return res.json();
      })
      .then((data) => {
        // Filter only recruiters based on presence of user object and role === RECRUITER
        const filteredRecruiters = data.filter(
          (item) => item.user && item.user.role === "RECRUITER"
        );
        setRecruiters(filteredRecruiters);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Failed to load recruiter data");
        setLoading(false);
      });
  }, []);

  const handleView = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setShowViewModal(true);
  };

  const handleDelete = (recruiterId) => {
    if (!window.confirm("Are you sure you want to delete this recruiter?")) return;

    fetch(`http://localhost:8081/api/v1/admin/users/${recruiterId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete recruiter");
        setRecruiters((prev) => prev.filter((r) => r.id !== recruiterId));
      })
      .catch((err) => {
        console.error("Delete error:", err);
        alert("Failed to delete recruiter.");
      });
  };

  return (
    <div className="container py-4">
      <h2>Recruiter Management</h2>
      <p className="text-muted">Dashboard / Recruiters</p>

      <div className="card p-3 shadow-sm">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : recruiters.length === 0 ? (
          <Alert variant="info">No recruiters found.</Alert>
        ) : (
          <Table hover responsive>
            <thead className="table-light">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Company</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recruiters.map((recruiter) => (
                <tr key={recruiter.id}>
                  <td>{recruiter.firstName || "-"}</td>
                  <td>{recruiter.lastName || "-"}</td>
                  <td>{recruiter.email}</td>
                  <td>{recruiter.phone || "-"}</td>
                  <td>{recruiter.location || "-"}</td>
                  <td>{recruiter.company?.name || "-"}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => handleView(recruiter)}
                    >
                      View
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(recruiter.id)}
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
      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Recruiter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRecruiter && (
            <>
              <p>
                <strong>First Name:</strong> {selectedRecruiter.firstName || "-"}
              </p>
              <p>
                <strong>Last Name:</strong> {selectedRecruiter.lastName || "-"}
              </p>
              <p>
                <strong>Email:</strong> {selectedRecruiter.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRecruiter.phone || "-"}
              </p>
              <p>
                <strong>Location:</strong> {selectedRecruiter.location || "-"}
              </p>
              <p>
                <strong>Years of Experience:</strong> {selectedRecruiter.yearsOfExperience || "-"}
              </p>
              <p>
                <strong>Bio:</strong>{" "}
                {selectedRecruiter.bio
                  ? selectedRecruiter.bio
                  : "No bio available."}
              </p>

              <hr />
              <h5>Company Details</h5>
              <p>
                <strong>Name:</strong> {selectedRecruiter.company?.name || "-"}
              </p>
              <p>
                <strong>Industry:</strong> {selectedRecruiter.company?.industry || "-"}
              </p>
              <p>
                <strong>Location:</strong> {selectedRecruiter.company?.location || "-"}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                {selectedRecruiter.company?.website ? (
                  <a
                    href={selectedRecruiter.company.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {selectedRecruiter.company.website}
                  </a>
                ) : (
                  "-"
                )}
              </p>
              <p>
                <strong>Description:</strong> {selectedRecruiter.company?.description || "-"}
              </p>
            </>
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

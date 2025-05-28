import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Button, ListGroup, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const UserJobDetail = () => {
  const { id } = useParams(); // jobId from URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarking, setBookmarking] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const candidateId = 1; // Replace with actual logged-in candidate ID

  // Load job details
  useEffect(() => {
    axios.get(`http://localhost:8081/api/v1/recruiters/jobs/${id}`)
      .then(response => {
        setJob(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch job detail:", error);
        setLoading(false);
      });
  }, [id]);

  // Check if already applied
  useEffect(() => {
    axios.get(`http://localhost:8081/api/v1/applications/${id}?candidateId=${candidateId}`)
      .then(() => setApplied(true))
      .catch(err => {
        if (err.response?.status === 404) {
          setApplied(false); // Not applied yet
        } else {
          console.error("Error checking application status", err);
        }
      });
  }, [id, candidateId]);

  // Check if bookmarked
  useEffect(() => {
    axios.get(`http://localhost:8081/api/v1/bookmarks/${id}?candidateId=${candidateId}`)
      .then(() => setBookmarked(true))
      .catch(err => {
        if (err.response?.status === 404) {
          setBookmarked(false);
        } else {
          console.error("Error checking bookmark status", err);
        }
      });
  }, [id, candidateId]);

  // Apply to job
  const applyToJob = () => {
    setApplying(true);
    setError(null);
    setSuccess(null);

    const params = new URLSearchParams({
      candidateId: candidateId.toString(),
      jobId: id.toString(),
    });

    axios.post(`http://localhost:8081/api/v1/applications?${params.toString()}`)
      .then(() => {
        setApplied(true);
        setSuccess("Application submitted successfully!");
      })
      .catch(err => {
        console.error("Application error:", err);
        setError("Failed to apply for the job.");
      })
      .finally(() => setApplying(false));
  };

  // Bookmark the job
  const saveJob = () => {
    setBookmarking(true);
    axios.post(`http://localhost:8081/api/v1/bookmarks?candidateId=${candidateId}&jobId=${id}`)
      .then(() => setBookmarked(true))
      .catch(err => {
        console.error("Bookmark error:", err);
      })
      .finally(() => setBookmarking(false));
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" variant="warning" /></div>;
  if (!job) return <div className="text-center text-danger mt-5">Job not found.</div>;

  const recruiter = job.recruiterProfile;
  const company = recruiter?.company;

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <Row>
            <Col md={8}>
              <h2 className="text-primary mb-2">{job.title}</h2>
              <h5 className="text-muted mb-3">{company?.name || "Company Name"}</h5>
              <div className="mb-3">
                <span className="me-3"><i className="fas fa-map-marker-alt me-2"></i>{job.location}</span>
                <span className="me-3"><i className="fas fa-briefcase me-2"></i>{job.experienceLevel}</span>
              </div>
              <div className="mb-4">
                <span className="text-success fw-bold">
                  <i className="fas fa-dollar-sign me-2"></i>
                  ${job.salary?.toLocaleString()}
                </span>
              </div>
            </Col>
            <Col md={4} className="text-md-end">
              <Button
                variant={applied ? "success" : "warning"}
                className="me-2"
                onClick={applyToJob}
                disabled={applying || applied}
              >
                {applied ? "Applied" : (applying ? "Applying..." : "Apply Now")}
              </Button>
              <Button
                variant={bookmarked ? "success" : "outline-warning"}
                onClick={saveJob}
                disabled={bookmarked || bookmarking}
              >
                {bookmarked ? "Saved" : (bookmarking ? "Saving..." : "Save Job")}
              </Button>
            </Col>
          </Row>

          <hr />

          <section className="mb-4">
            <h4>Job Description</h4>
            <p>{job.description}</p>
          </section>

          {job.responsibilities?.length > 0 && (
            <section className="mb-4">
              <h4>Roles and Responsibilities</h4>
              <ListGroup variant="flush">
                {job.responsibilities.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <i className="fas fa-check-circle text-success me-2"></i>{item}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </section>
          )}

          {job.keySkills?.length > 0 && (
            <section className="mb-4">
              <h4>Key Skills</h4>
              <div className="d-flex flex-wrap gap-2">
                {job.keySkills.map((skill, index) => (
                  <span key={index} className="badge bg-light text-dark border">{skill}</span>
                ))}
              </div>
            </section>
          )}

          <section className="mb-4">
            <h4>About the Recruiter</h4>
            <Card className="bg-light">
              <Card.Body>
                <p><strong>Name:</strong> {recruiter.firstName} {recruiter.lastName}</p>
                <p><strong>Email:</strong> {recruiter.email}</p>
                <p><strong>Phone:</strong> {recruiter.phone}</p>
                <p><strong>LinkedIn:</strong> <a href={recruiter.linkedInUrl} target="_blank" rel="noreferrer">{recruiter.linkedInUrl}</a></p>
              </Card.Body>
            </Card>
          </section>

          {company && (
            <section className="mb-4">
              <h4>About the Company</h4>
              <Card className="bg-light">
                <Card.Body>
                  <h5>{company.name}</h5>
                  <p><strong>Industry:</strong> {company.industry}</p>
                  <p><strong>Location:</strong> {company.location}</p>
                  <p><strong>Website:</strong> <a href={company.website} target="_blank" rel="noreferrer">{company.website}</a></p>
                  <p><strong>Description:</strong> {company.description}</p>
                </Card.Body>
              </Card>
            </section>
          )}

          <div className="mt-4 text-muted">
            <small>
              <i className="far fa-calendar-alt me-2"></i>
              Posted on {new Date(job.postedDate).toLocaleDateString()}
            </small>
          </div>

          {success && <Alert variant="success" className="mt-3">{success}</Alert>}
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserJobDetail;

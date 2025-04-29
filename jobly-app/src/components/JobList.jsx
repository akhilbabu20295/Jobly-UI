import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const JobList = () => {
  // Mock job data - replace with actual API data
  const jobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      description: 'Looking for an experienced software engineer to join our team...',
      postedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'StartUp Inc',
      location: 'New York, NY',
      salary: '$90,000 - $120,000',
      description: 'Join our fast-growing startup as a full stack developer...',
      postedDate: '2024-01-14'
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'Design Co',
      location: 'Remote',
      salary: '$80,000 - $100,000',
      description: 'Create beautiful and responsive user interfaces...',
      postedDate: '2024-01-13'
    }
  ];

  return (
    <div className="job-list-container mt-4">
      <h5 className="mb-4">Available Jobs</h5>
      <Row>
        {jobs.map(job => (
          <Col key={job.id} xs={12} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title className="text-primary">
                <Link to={`/jobs/${job.id}`} className="text-primary text-decoration-none">
                    {job.title}
                  </Link>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                <div className="mb-2">
                  <small className="text-muted">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    {job.location}
                  </small>
                </div>
                <div className="mb-2">
                  <small className="text-success">
                    <i className="fas fa-dollar-sign me-2"></i>
                    {job.salary}
                  </small>
                </div>
                <Card.Text className="text-truncate">{job.description}</Card.Text>
                <div className="mt-3">
                  <Button variant="warning" className="me-2" size="sm">
                    Apply Now
                  </Button>
                  <Button variant="outline-warning" size="sm">
                    Save Job
                  </Button>
                </div>
                <div className="mt-2">
                  <small className="text-muted">
                    Posted on {new Date(job.postedDate).toLocaleDateString()}
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Button variant="btn btn-link" size="sm">
                    More </Button>
    </div>
  );
};

export default JobList;
import React from 'react';
import { Card, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();

  // Mock detailed job data - replace with actual API data
  const jobDetail = {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    description: 'We are seeking an experienced software engineer to join our innovative team. The ideal candidate will have a strong background in full-stack development and a passion for creating scalable solutions.',
    responsibilities: [
      'Design and implement scalable software solutions',
      'Lead technical architecture discussions and decisions',
      'Mentor junior developers and conduct code reviews',
      'Collaborate with cross-functional teams to define and implement new features',
      'Optimize application performance and reliability'
    ],
    keySkills: [
      'JavaScript/TypeScript',
      'React.js',
      'Node.js',
      'AWS/Cloud Services',
      'CI/CD',
      'System Design'
    ],
    qualifications: [
      'Bachelors degree in Computer Science or related field',
      '5+ years of professional software development experience',
      'Strong experience with modern JavaScript frameworks',
      'Experience with cloud services and microservices architecture',
      'Excellent problem-solving and communication skills'
    ],
    companyDetails: {
      name: 'Tech Corp',
      industry: 'Technology',
      size: '1000-5000 employees',
      founded: '2010',
      website: 'www.techcorp.com',
      culture: 'We foster an innovative and inclusive environment where creativity and collaboration thrive.'
    },
    postedDate: '2024-01-15',
    employmentType: 'Full-time',
    workMode: 'Hybrid'
  };

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <Row>
            <Col md={8}>
              <h2 className="text-primary mb-2">{jobDetail.title}</h2>
              <h5 className="text-muted mb-3">{jobDetail.company}</h5>
              <div className="mb-3">
                <span className="me-3">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  {jobDetail.location}
                </span>
                <span className="me-3">
                  <i className="fas fa-briefcase me-2"></i>
                  {jobDetail.employmentType}
                </span>
                <span>
                  <i className="fas fa-laptop-house me-2"></i>
                  {jobDetail.workMode}
                </span>
              </div>
              <div className="mb-4">
                <span className="text-success fw-bold">
                  <i className="fas fa-dollar-sign me-2"></i>
                  {jobDetail.salary}
                </span>
              </div>
            </Col>
            <Col md={4} className="text-md-end">
              <Button variant="warning" className="me-2">
                Apply Now
              </Button>
              <Button variant="outline-warning">
                Save Job
              </Button>
            </Col>
          </Row>

          <hr />

          <section className="mb-4">
            <h4>Job Description</h4>
            <p>{jobDetail.description}</p>
          </section>

          <section className="mb-4">
            <h4>Roles and Responsibilities</h4>
            <ListGroup variant="flush">
              {jobDetail.responsibilities.map((responsibility, index) => (
                <ListGroup.Item key={index}>
                  <i className="fas fa-check-circle text-success me-2"></i>
                  {responsibility}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </section>

          <section className="mb-4">
            <h4>Key Skills</h4>
            <div className="d-flex flex-wrap gap-2">
              {jobDetail.keySkills.map((skill, index) => (
                <span key={index} className="badge bg-light text-dark border">{skill}</span>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h4>Qualifications</h4>
            <ListGroup variant="flush">
              {jobDetail.qualifications.map((qualification, index) => (
                <ListGroup.Item key={index}>
                  <i className="fas fa-graduation-cap text-primary me-2"></i>
                  {qualification}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </section>

          <section className="mb-4">
            <h4>About the Company</h4>
            <Card className="bg-light">
              <Card.Body>
                <h5>{jobDetail.companyDetails.name}</h5>
                <p><strong>Industry:</strong> {jobDetail.companyDetails.industry}</p>
                <p><strong>Company Size:</strong> {jobDetail.companyDetails.size}</p>
                <p><strong>Founded:</strong> {jobDetail.companyDetails.founded}</p>
                <p><strong>Website:</strong> {jobDetail.companyDetails.website}</p>
                <p><strong>Culture:</strong> {jobDetail.companyDetails.culture}</p>
              </Card.Body>
            </Card>
          </section>

          <div className="mt-4 text-muted">
            <small>
              <i className="far fa-calendar-alt me-2"></i>
              Posted on {new Date(jobDetail.postedDate).toLocaleDateString()}
            </small>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default JobDetail;
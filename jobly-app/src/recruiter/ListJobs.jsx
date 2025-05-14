import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const ListJobs = () => {
  const [data, setData] = useState([
    {
      id: 1,
      title: 'Java Developer',
      company: 'Tech Corp',
      location: 'New York',
      salary: '90000',
      experienceLevel: 'Mid',
      description: 'Develop and maintain Java applications.',
      postedDate: '2025-05-01',
    },
    {
      id: 2,
      title: 'React Developer',
      company: 'Web Solutions',
      location: 'Remote',
      salary: '85000',
      experienceLevel: 'Entry',
      description: 'Frontend development using React.js.',
      postedDate: '2025-05-10',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleEdit = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this job?");
    if (confirmed) {
      setData(prevData => prevData.filter(job => job.id !== id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedJob(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setData(prevData =>
      prevData.map(job =>
        job.id === selectedJob.id ? selectedJob : job
      )
    );
    setShowModal(false);
  };

  const columns = [
    { name: 'Title', selector: row => row.title, sortable: true },
    { name: 'Company', selector: row => row.company, sortable: true },
    { name: 'Location', selector: row => row.location, sortable: true },
    { name: 'Salary', selector: row => `$${row.salary}`, sortable: true },
    { name: 'Experience Level', selector: row => row.experienceLevel, sortable: true },
    { name: 'Posted Date', selector: row => row.postedDate, sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(row)}>Edit</button>
          <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(row.id)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Posted Jobs</h2>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        striped
        responsive
      />

      {/* Modal */}
      {showModal && selectedJob && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Job</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {['title', 'company', 'location', 'salary', 'experienceLevel', 'postedDate'].map(field => (
                  <div className="mb-3" key={field}>
                    <label className="form-label text-capitalize">{field}</label>
                    <input
                      type="text"
                      className="form-control"
                      name={field}
                      value={selectedJob[field]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={selectedJob.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListJobs;

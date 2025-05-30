import React, { useState } from 'react';
import './Dashboard.css';
import CompanyDashboard from '../company/CompanyDashboard';
import SkillsDashboard from '../skills/SkillsDashboard';
import Usermanagement from './Usermanagement';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState('dashboard');

    // Static chart data (replace with dynamic fetch if needed)
    const userStatsData = [
        { role: 'Recruiters', count: 10 },
        { role: 'Users', count: 25 },
    ];

    return (
        <div>
            {/* Header */}
            <header id="header" className="header fixed-top d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-between">
                    <i className="bi bi-list toggle-sidebar-btn"></i>
                </div>

                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">
                        <li className="nav-item dropdown pe-3">
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>Bhuvanesh</h6>
                                    <span>Software Developer</span>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <i className="bi bi-person"></i>
                                        <span>My Profile</span>
                                    </a>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <i className="bi bi-gear"></i>
                                        <span>Account Settings</span>
                                    </a>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Sign Out</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Sidebar */}
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={() => setActiveSection('dashboard')}>
                            <i className="bi bi-house-door-fill"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a
                            href="#masterTablesSubmenu"
                            className="nav-link d-flex justify-content-between align-items-center"
                            data-bs-toggle="collapse"
                            role="button"
                            aria-expanded="false"
                            aria-controls="masterTablesSubmenu"
                        >
                            <span>
                                <i className="bi bi-table"></i>
                                <span className="ms-2">Master Tables</span>
                            </span>
                            <i className="bi bi-chevron-down"></i>
                        </a>

                        <ul className="collapse list-unstyled ps-4" id="masterTablesSubmenu">
                            <li className="nav-item">
                                <a href="#" onClick={() => setActiveSection("companyDashboard")} className="nav-link">Company</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" onClick={() => setActiveSection("skillsDashboard")} className="nav-link">Skills</a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#userManagementSubmenu"
                            className="nav-link d-flex justify-content-between align-items-center"
                            data-bs-toggle="collapse"
                            role="button"
                            aria-expanded="false"
                            aria-controls="userManagementSubmenu"
                        >
                            <span>
                                <i className="bi bi-person-badge"></i>
                                <span className="ms-2">User Management</span>
                            </span>
                            <i className="bi bi-chevron-down"></i>
                        </a>

                        <ul className="collapse list-unstyled ps-4" id="userManagementSubmenu">
                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={() => setActiveSection("recruiterDashboard")}>
                                    Recruiter
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={() => setActiveSection("userDashboard")}>
                                    User
                                </a>
                            </li>
                        </ul>
                    </li>
 
                </ul>
            </aside>

            {/* Main */}
            <main id="main">
                <div className="container-fluid">
                    {activeSection === 'dashboard' && (
                        <>
                            <div className="row g-3 justify-content-between mb-3">
                                <div className="col-md-4">
                                    <h5>Dashboard</h5>
                                </div>
                            </div>

                            <section className="dash-overview mb-4">
                                {/* Add your dashboard widgets/cards here if needed */}
                            </section>

                            {/* Chart Section */}
                            <section className="mb-5">
                                <h5>User Role Statistics</h5>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <BarChart
                                            data={userStatsData}
                                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="role" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="count" fill="#007bff" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </section>
                        </>
                    )}

                    {activeSection === 'companyDashboard' && (
                        <section className="company-dashboard">
                            <CompanyDashboard />
                        </section>
                    )}

                    {activeSection === 'skillsDashboard' && (
                        <section className="skills-dashboard">
                            <SkillsDashboard />
                        </section>
                    )}

                    {activeSection === 'userDashboard' && (
                        <section className="user-dashboard">
                            <Usermanagement />
                        </section>
                    )}
                </div>
            </main>

            {/* Loader */}
            <div id="loader"></div>
        </div>
    );
};

export default Dashboard;

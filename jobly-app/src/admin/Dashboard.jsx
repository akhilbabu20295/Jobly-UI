import React from 'react';
import './Dashboard.css';


const Dashboard = () => {
    return (
        <div>
            {/* Header */}
            <header id="header" className="header fixed-top d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-between">
                    <a href="#" className="logo d-flex align-items-center">
                        <img src="https://dummyimage.com/200x40/9c98a5/e3e3e3.png" alt="logo" width="200" height="40" />
                    </a>
                    <i className="bi bi-list toggle-sidebar-btn"></i>
                </div>

                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">
                        <li className="nav-item dropdown pe-3">
                            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                                <img src="https://dummyimage.com/400x400/444444/d3d3d3.png" alt="avatar" className="rounded-circle" />
                                <span className="d-none d-md-block dropdown-toggle ps-2">Bhuvanesh</span>
                            </a>
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
                        <a href="#" className="nav-link active">
                            <i className="bi bi-house-door-fill"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#masterTablesSubmenu"
                            data-bs-toggle="collapse"
                            role="button"
                            aria-expanded="false"
                            aria-controls="masterTablesSubmenu"
                            className="nav-link d-flex justify-content-between align-items-center"
                        >
                            <span>
                                <i className="bi bi-table"></i>
                                <span className="ms-2">Master Tables</span>
                            </span>
                            <i className="bi bi-chevron-down"></i>
                        </a>

                        <ul className="collapse list-unstyled ps-4" id="masterTablesSubmenu">
                            <li className="nav-item">
                                <a href="#" className="nav-link">Users</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">Roles</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">Permissions</a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i className="bi bi-person-badge"></i>
                            <span>User Management</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i className="bi bi-briefcase"></i>
                            <span>Jobs Management</span>
                        </a>
                    </li>
                    <li className="nav-heading">Settings</li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i className="bi bi-gear"></i>
                            <span>Settings</span>
                        </a>
                    </li>
                </ul>
            </aside>

            {/* Main */}
            <main id="main">
                <div className="container-fluid table-index">
                    <div className="row g-3 justify-content-between mb-3">
                        <div className="col-md-4">
                            <h5>Dashboard</h5>
                        </div>
                    </div>


                </div>
            </main>

            {/* Loader */}
            <div id="loader"></div>
        </div>
    );
};

export default Dashboard;

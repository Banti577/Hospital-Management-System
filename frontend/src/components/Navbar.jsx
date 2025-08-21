import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";

const Navbar = ({ user }) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios(`${BASE_URL}/api`);
        setAllBlogs(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 text-primary" to="/">
          <i className="bi bi-journal-text me-2"></i>Hospital Management System
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-3">
            {user ? (
              <>
                {/* Patient special link */}
                {user.role === "patient" && (
                  <li className="nav-item">
                    <Link className="nav-link fw-medium" to="/blog/addBlog">
                      <i className="bi bi-plus-circle me-1"></i> Book Appointment
                    </Link>
                  </li>
                )}

                {/* Profile dropdown */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={
                        user.profileImgUrl
                          ? `${BASE_URL}${user.profileImgUrl}`
                          : "/default-profile.png"
                      }
                      className="rounded-circle me-2"
                      width="36"
                      height="36"
                      alt="Profile"
                      style={{ objectFit: "cover" }}
                    />
                    <span className="me-1">{user.FullName}</span>
                    <span className="badge bg-light text-dark">{user.role}</span>
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/user/my-profile">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/user/logout">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-medium" to="/user/login">
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-medium" to="/user/signup">
                    <i className="bi bi-person-plus me-1"></i> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

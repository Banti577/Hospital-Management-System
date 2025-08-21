// src/components/Home.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Home.css"; // Enhanced Design CSS

function Home({ user }) {
  const [blogs, setBlogs] = useState([]);
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/blog/${id}`);
      // delete ke baad UI update karo
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <>
      {!user && (

     <div className="d-flex justify-content-center align-items-center my-5">
    <div className="card shadow p-4 text-center" style={{ maxWidth: "450px" }}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
        alt="Login Illustration"
        style={{ width: "120px", margin: "0 auto 20px" }}
      />
      <h3 className="mb-3 text-primary">Welcome to HealthCare Portal</h3>
      <p className="text-muted">
        Please <strong>Login as a Patient</strong>
      </p>
      <Link to="/login" className="btn btn-primary w-100 mt-3">
        Login Now
      </Link>
      <p className="mt-3 text-muted">
        New User? <Link to="user/signup">Create an Account</Link>
      </p>
    </div>
  </div>
      )}

      {/* --------- Patient Section --------- */}
      {user && user.role === "patient" && (
        <section className="container blog-grid mt-5">
          {(() => {
            const filteredBlogs = blogs.filter(
              (blog) => blog.createdBy?._id === user._id
            );

            return filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <div
                  className="card blog-card enhanced-card shadow"
                  key={blog._id}
                >
                  <div className="card-body">
                    <h5 className="card-title blog-title">{blog.title}</h5>
                    <p className="text-muted">
                      Booked By: {blog.createdBy?.FullName}
                    </p>
                    <Link
                      to={`/blog/${blog._id}`}
                      className="btn btn-outline-primary w-100 mt-2"
                    >
                      Read More
                    </Link>

                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="btn btn-outline-danger w-100 mt-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted my-5">
                <h2>No Appointments Available</h2>
              </div>
            );
          })()}
        </section>
      )}

      {/* --------- Doctor Section --------- */}
      {user && user.role === "doctor" && (
        <section className="container blog-grid mt-5">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                className="card blog-card enhanced-card shadow"
                key={blog._id}
              >
                <div className="card-body">
                  <h5 className="card-title blog-title">{blog.title}</h5>
                  <Link
                    to={`/blog/${blog._id}`}
                    className="btn btn-outline-primary w-100 mt-2"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted my-5">
              <h2>No Patient Available</h2>
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default Home;

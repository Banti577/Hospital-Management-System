import React, { useState } from "react";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
         credentials: "include",
        body: JSON.stringify({
          FullName: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("SUCCESSFULL cREATED aCCOUNT");
        navigate("/user/login");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError(err.message || "Failed to sign up");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Sign Up</h2>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.inputGroup}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      
        <div className={styles.inputGroup}>
        <label>Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="patient">patient</option>
          <option value="doctor">doctor</option>
        </select>
      </div>

      <button type="submit" className={styles.button}>
        Sign Up
      </button>
    </form>
  );
};

export default Signup;

import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/login`,
        formData
      );
      // Store JWT token
      localStorage.setItem("token", response.data.token);
      // Store user details
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setMessage(response.data.message);
      setMessageType("success");

      // Redirect after successful login
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login Failed"
      );
      setMessageType("danger");
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-lg-11">
          <div
            className="card shadow-lg border-0 overflow-hidden"
            style={{ minHeight: "700px" }}
          >
            <div className="row g-0">
              
              {/* Left Side Image */}
              <div
                className="col-md-6 login-image text-white d-flex align-items-start"
                style={{ minHeight: "700px" }}
              >
                <div className="px-5" style={{ marginTop: "130px" }}>
                  <h1 className="fw-bold display-4">
                    Welcome Back
                  </h1>
                  <p className="fs-5">
                    Glad to see you again! Please login to
                    <br />
                    continue your journey
                  </p>
                </div>
              </div>

              {/* Right Side Form */}
              <div
                className="col-md-6 bg-light"
                style={{ minHeight: "700px" }}
              >
                <div className="p-5 h-100 d-flex flex-column justify-content-center">
                  <h1 className="fw-bold">Welcome Back</h1>

                  <p className="text-muted">
                    Login to your account to continue
                  </p>

                  {message && (
                    <div
                      className={`alert alert-${messageType}`}
                    >
                      {message}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                      />
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="remember"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="remember"
                        >
                          Remember me
                        </label>
                      </div>

                      {/* Uncomment if you have forgot password page */}
                      {/*
                      <Link
                        to="/changepassword"
                        className="text-decoration-none"
                      >
                        Forgot Password?
                      </Link>
                      */}
                    </div>

                    <button
                      className="btn btn-primary w-100 mb-3"
                      type="submit"
                    >
                      Login
                    </button>
                  </form>

                  <p className="text-center mt-3 mb-0">
                    Don't have an account?
                    <Link
                      to="/register"
                      className="text-decoration-none ms-1"
                    >
                      Register here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
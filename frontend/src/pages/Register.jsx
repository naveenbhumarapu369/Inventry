import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "../App.css";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      fullName: fullName,
      email: email,
      password: password
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/register`,
        userData
      );

      alert(response.data.message);

      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert(err.response.data.message || "Registration failed");
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-lg-11">
          <div className="card shadow-lg border-0 overflow-hidden">
            <div className="row g-0">
              {/* Form Section */}
              <div
                className="col-md-6 bg-light"
                style={{ minHeight: "700px" }}
              >
                <div className="p-5 h-100 d-flex flex-column justify-content-center">
                  <h1 className="fw-bold">Create Account</h1>

                  <form onSubmit={handleSubmit}>
                    <p className="text-muted">
                      Fill in the details to get started
                    </p>

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="terms"
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="terms"
                      >
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-decoration-none"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="text-decoration-none"
                        >
                          Privacy Policy
                        </a>
                      </label>
                    </div>

                    <button
                      className="btn btn-primary w-100"
                      type="submit"
                    >
                      Register
                    </button>

                    <p className="text-center mt-3 mb-0">
                      Already have an account?
                      <Link
                        to="/login"
                        className="text-decoration-none ms-1"
                      >
                        Login here
                      </Link>
                    </p>
                  </form>
                </div>
              </div>

              {/* Image Section */}
              <div
                className="col-md-6 login-image text-white d-flex align-items-start"
                style={{ minHeight: "700px" }}
              >
                <div
                  className="px-5"
                  style={{ marginTop: "180px" }}
                >
                  <h1 className="fw-bold">Join Us Today</h1>
                  <p className="fs-5">
                    Create your account and start
                    <br />
                    your journey with us.
                  </p>
                </div>
              </div>
              {/* End Image Section */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
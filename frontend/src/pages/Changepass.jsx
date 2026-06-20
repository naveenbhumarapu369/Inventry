import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "../App.css";

function Changepass() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (oldPassword === newPassword) {
      alert("New password cannot be the same as old password");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.id) {
      alert("Please login again");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/api/changepassword/${user.id}`, 
        {
          oldPassword,
          newPassword,
        }
      );

      alert("Password changed successfully");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to change password"
      );
    }
  }
  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-lg-11">
          <div
            className="card shadow-lg border-0 overflow-hidden"
            style={{ minHeight: "700px" }}
          >
            <div className="row g-0">
              <div
                className="col-md-6 login-image text-white d-flex align-items-start"
                style={{ minHeight: "700px" }}
              >
                <div
                  className="px-5"
                  style={{ marginTop: "130px" }}
                >
                  <h1 className="fw-bold display-4">
                    Security First, Always
                  </h1>

                  <p className="fs-5">
                    Keep your account secure by using
                    <br />
                    a strong and unique password.
                  </p>
                </div>
              </div>

              <div
                className="col-md-6 bg-light"
                style={{ minHeight: "700px" }}
              >
                <div className="p-5 h-100 d-flex flex-column justify-content-center">
                  <Link
                    to="/login"
                    className="text-decoration-none mb-3"
                  >
                    ← Back to Login Page
                  </Link>

                  <h1 className="fw-bold">
                    Change Password
                  </h1>

                  <p className="text-muted mb-4">
                    For your security, please choose a
                    strong password that you haven't used
                    before.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Old Password
                      </label>

                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter old password"
                        value={oldPassword}
                        onChange={(e) =>
                          setOldPassword(e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        New Password
                      </label>

                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) =>
                          setNewPassword(e.target.value)
                        }
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
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 mb-3"
                    >
                      Update Password
                    </button>

                    <div className="text-center mb-3">
                      <span>or</span>
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={() =>
                        navigate("/dashboard")
                      }
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Changepass;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const [lowStockLimit, setLowStockLimit] = useState(
    localStorage.getItem("lowStockLimit") || 5
  );

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleThemeToggle = () => {
    const newTheme =
      theme === "light" ? "dark" : "light";

    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
    setTheme(newTheme);

    window.location.reload();
  };

  const saveThreshold = () => {
    localStorage.setItem(
      "lowStockLimit",
      lowStockLimit
    );

    alert("Settings Saved Successfully");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="container-fluid p-4 theme-content">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-gear-fill me-2"></i>
        Settings
      </h2>

      <div className="row g-4 mb-4">
        {/* Profile */}
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                Profile Information
              </h5>
            </div>

            <div className="card-body">
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center fw-bold me-3"
                  style={{
                    width: "70px",
                    height: "70px",
                    fontSize: "25px"
                  }}
                >
                  {user?.fullName?.[0]?.toUpperCase() || "U"}
                </div>

                <div>
                  <h5>
                    {user?.fullName || "User"}
                  </h5>

                  <p className="text-muted mb-0">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header bg-warning">
              <h5 className="mb-0">
                Security
              </h5>
            </div>

            <div className="card-body">
              <p>
                Manage your account security.
              </p>

              <Link
                to="/changepassword"
                className="btn btn-warning"
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>

        {/* Inventory Settings */}
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">
                Inventory Settings
              </h5>
            </div>

            <div className="card-body">
              <label className="form-label">
                Low Stock Threshold
              </label>

              <input
                type="number"
                className="form-control"
                value={lowStockLimit}
                onChange={(e) =>
                  setLowStockLimit(
                    e.target.value
                  )
                }
              />

              <button
                className="btn btn-success mt-3"
                onClick={saveThreshold}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">
                Appearance
              </h5>
            </div>

            <div className="card-body">
              <h6>
                Current Theme:
                <span className="ms-2 text-capitalize fw-bold">
                  {theme}
                </span>
              </h6>

              <button
                className="btn btn-dark mt-3"
                onClick={handleThemeToggle}
              >
                Switch to{" "}
                {theme === "light"
                  ? "Dark"
                  : "Light"}
                Mode
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="card shadow border-danger">
        <div className="card-header bg-danger text-white">
          <h5 className="mb-0">
            Logout
          </h5>
        </div>

        <div className="card-body">
          <p className="text-muted">
            Logout from your account and return to login page.
          </p>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";

function Sidebar() {
  const navigate = useNavigate();

  const theme = localStorage.getItem("theme") || "light";
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column text-white p-3"
      style={{
        width: "260px",
        height: "100vh",
        background:
          theme === "dark"
            ? "#111827"
            : "#1f2937",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <div className="text-center mb-4">
        <h3 className="fw-bold">
          <i className="bi bi-box-seam me-2"></i>
          InventoryPro
        </h3>
        <hr className="text-secondary" />
      </div>

      {/* Navigation */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "active bg-primary" : "text-white"
              }`
            }
          >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/dashboard/products"
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "active bg-primary" : "text-white"
              }`
            }
          >
            <i className="bi bi-box-seam me-2"></i>
            Products
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/dashboard/admin"
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "active bg-primary" : "text-white"
              }`
            }
          >
            <i className="bi bi-shield-lock me-2"></i>
            Admin Panel
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/dashboard/report"
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "active bg-primary" : "text-white"
              }`
            }
          >
            <i className="bi bi-bar-chart-line me-2"></i>
            Report
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "active bg-primary" : "text-white"
              }`
            }
          >
            <i className="bi bi-gear me-2"></i>
            Settings
          </NavLink>
        </li>
      </ul>

      {/* Logout */}
      <div className="mt-auto">
        <hr className="text-secondary" />

        <button
          className="btn btn-danger w-100"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
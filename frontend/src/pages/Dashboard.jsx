import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Sidebar from "../components/Sidebar";
import { API_BASE_URL } from "../config";
import Header from "../components/Header";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!storedUser) {
      navigate("/");
      return;
    }

    setUser(storedUser);

    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/products`
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) =>
      total + Number(product.quantity),
    0
  );

  const lowStockLimit = Number(localStorage.getItem("lowStockLimit")) || 5;

  const lowStockItems = products.filter(
    (product) =>
      Number(product.quantity) < lowStockLimit
  ).length;

  const inventoryValue = products.reduce(
    (total, product) =>
      total +
      Number(product.price) *
        Number(product.quantity),
    0
  );

  return (
    <div className="container py-5 theme-content">

      {/* User Card */}

      {user && (
        <div className="card border-0 shadow-lg mb-4">
          <div className="card-body d-flex align-items-center">
            <div
              className="rounded-circle d-flex justify-content-center align-items-center text-white fw-bold"
              style={{
                width: "70px",
                height: "70px",
                fontSize: "24px",
                background:
                  "linear-gradient(135deg, #0d6efd, #6610f2)",
              }}
            >
              {user.fullName
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="ms-4">
              <h4 className="mb-1">
                Welcome, {user.fullName}
              </h4>

              <p className="text-muted mb-0">
                {user.email}
              </p>

            </div>
          </div>
        </div>
      )}
      {/* Stats Section */}

      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <i
                className="bi bi-box-seam text-primary"
                style={{ fontSize: "3rem" }}
              ></i>

              <h5 className="mt-3">
                Total Products
              </h5>

              <h2 className="fw-bold text-primary">
                {totalProducts}
              </h2>

            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <i
                className="bi bi-cart-check text-success"
                style={{ fontSize: "3rem" }}
              ></i>

              <h5 className="mt-3">
                Available Stock
              </h5>

              <h2 className="fw-bold text-success">
                {totalStock}
              </h2>

            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <i
                className="bi bi-exclamation-triangle text-warning"
                style={{ fontSize: "3rem" }}
              ></i>

              <h5 className="mt-3">
                Low Stock Items
              </h5>

              <h2 className="fw-bold text-warning">
                {lowStockItems}
              </h2>

            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <i
                className="bi bi-currency-rupee text-danger"
                style={{ fontSize: "3rem" }}
              ></i>

              <h5 className="mt-3">
                Inventory Value
              </h5>

              <h2 className="fw-bold text-danger">
                ₹{inventoryValue}
              </h2>

            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}

      <h4 className="fw-bold mb-4">
        Quick Actions
      </h4>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-lg h-100">
            <div className="card-body text-center p-4">
              <i
                className="bi bi-plus-circle-fill text-success"
                style={{ fontSize: "3rem" }}
              ></i>

              <h5 className="mt-3">
                Add Product
              </h5>

              <p className="text-muted">
                Add new inventory items to the system.
              </p>

              <button
                className="btn btn-success"
                onClick={() =>
                  navigate("/dashboard/admin")
                }
              >
                Add Product
              </button>

            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-lg h-100">
            <div className="card-body text-center p-4">
              <i
                className="bi bi-list-ul text-primary"
                style={{ fontSize: "3rem" }}
              ></i>

              <h5 className="mt-3">
                View Products
              </h5>

              <p className="text-muted">
                Browse and manage existing inventory.
              </p>

              <button
                className="btn btn-primary"
                onClick={() =>
                  navigate("/dashboard/products")
                }
              >
                View Products
              </button>

            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-lg h-100">
            <div className="card-body text-center p-4">
              <i
                className="bi bi-graph-up-arrow text-danger"
                style={{ fontSize: "3rem" }}
              ></i>

              <h5 className="mt-3">
                Inventory Reports
              </h5>

              <p className="text-muted">
                Monitor inventory performance and stock.
              </p>

              <button
                className="btn btn-danger"
                onClick={() =>
                  navigate("/dashboard/report")
                }
              >
                View Reports
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

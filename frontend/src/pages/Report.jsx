import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { API_BASE_URL } from "../config";

function Report() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  const lowStockLimit = Number(localStorage.getItem("lowStockLimit")) || 5;

  const lowStockProducts = products.filter(
    (item) => Number(item.quantity) < lowStockLimit
  );

  const inventoryValue = products.reduce(
    (sum, item) =>
      sum +
      Number(item.quantity) *
        Number(item.price),
    0
  );

  const recentProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  return (
    <div className="container-fluid p-4 theme-content">
      <h2 className="fw-bold mb-4">
        Inventory Reports
      </h2>

      {/* Summary Cards */}

      <div className="row g-4 mb-5">

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5>Total Products</h5>
              <h2 className="text-primary">
                {totalProducts}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5>Total Stock</h5>
              <h2 className="text-success">
                {totalStock}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5>Low Stock Items</h5>
              <h2 className="text-warning">
                {lowStockProducts.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h5>Inventory Value</h5>
              <h2 className="text-danger">
                ₹{inventoryValue}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-4">
        {/* Low Stock Products */}
        <div className="col-md-6">
          <div className="card shadow border-0 h-100">
            <div className="card-header bg-warning text-dark">
              <h5 className="mb-0">
                Low Stock Products
              </h5>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>

                  <tbody>
                    {lowStockProducts.length > 0 ? (
                      lowStockProducts.map((product) => (
                        <tr key={product._id}>
                          <td>{product.productName}</td>
                          <td>{product.category}</td>
                          <td className="text-danger fw-bold">
                            {product.quantity}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="3"
                          className="text-center"
                        >
                          No low stock items
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Products */}
        <div className="col-md-6">
          <div className="card shadow border-0 h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                Recently Added Products
              </h5>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Date Added</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentProducts.map((product) => (
                      <tr key={product._id}>
                        <td>{product.productName}</td>
                        <td>{product.category}</td>
                        <td>₹{product.price}</td>
                        <td>
                          {new Date(
                            product.createdAt
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;

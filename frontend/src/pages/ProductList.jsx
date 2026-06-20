<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { API_BASE_URL } from "../config";
import Header from "../components/Header";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
      fetchProducts();
    }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/products`
      );

      const sortedProducts = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setProducts(sortedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_BASE_URL}/api/products/${id}`
      );

      setProducts(
        products.filter((product) => product._id !== id)
      );

      alert("Product deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.productName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">
            Product List
          </h2>

          <p className="text-muted mb-0">
            View and manage all inventory products.
          </p>
        </div>

        <div style={{ width: "300px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Product Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Added Date</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>

                    <td>{product.productName}</td>

                    <td>{product.category}</td>

                    <td>{product.quantity}</td>

                    <td>₹{product.price}</td>

                    <td>
                      {new Date(
                        product.createdAt
                      ).toLocaleDateString()}
                    </td>

                    {/* <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          navigate(
                            `/edit-product/${product._id}`
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(product._id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                    */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center"
                  >
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

=======
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { API_BASE_URL } from "../config";
import Header from "../components/Header";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
      fetchProducts();
    }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/products`
      );

      const sortedProducts = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setProducts(sortedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_BASE_URL}/api/products/${id}`
      );

      setProducts(
        products.filter((product) => product._id !== id)
      );

      alert("Product deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.productName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">
            Product List
          </h2>

          <p className="text-muted mb-0">
            View and manage all inventory products.
          </p>
        </div>

        <div style={{ width: "300px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Product Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Added Date</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>

                    <td>{product.productName}</td>

                    <td>{product.category}</td>

                    <td>{product.quantity}</td>

                    <td>₹{product.price}</td>

                    <td>
                      {new Date(
                        product.createdAt
                      ).toLocaleDateString()}
                    </td>

                    {/* <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          navigate(
                            `/edit-product/${product._id}`
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(product._id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                    */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center"
                  >
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

>>>>>>> a5be8771bc938d3240964aa89163d99f33271362
export default ProductList;
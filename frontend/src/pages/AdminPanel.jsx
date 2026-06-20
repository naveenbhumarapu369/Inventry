import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "../App.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function AdminPanel() {
  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    productName: "",
    category: "",
    quantity: "",
    price: "",
    description: ""
  });

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

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

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `${API_BASE_URL}/api/products/${editId}`, 
          product
        );

        alert("Product updated successfully");
      } else {
        await axios.post(
          `${API_BASE_URL}/api/products`,
          product
        );

        alert("Product added successfully");
      }

      setProduct({
        productName: "",
        category: "",
        quantity: "",
        price: "",
        description: ""
      });

      setEditId(null);

      fetchProducts();

    } catch (error) {
      console.log(error);
      alert("Operation failed");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);

    setProduct({
      productName: item.productName,
      category: item.category,
      quantity: item.quantity,
      price: item.price,
      description: item.description
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_BASE_URL}/api/products/${id}`
      );

      alert("Product deleted");

      fetchProducts();

    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditId(null);

    setProduct({
      productName: "",
      category: "",
      quantity: "",
      price: "",
      description: ""
    });
  };

  const filteredProducts = products.filter((item) =>
    item.productName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid p-4 theme-content">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-shield-lock me-2"></i>
        Admin Panel
      </h2>

      {/* Dashboard Card */}

      <div className="row mb-4">
        <div className="col-md-4">

          <div className="card shadow border-0">
            <div className="card-body text-center">

              <h6>Total Products</h6>

              <h2>{products.length}</h2>

            </div>
          </div>

        </div>
      </div>

      {/* Add/Edit Product */}

      <div className="card shadow border-0 mb-4">

        <div className="card-body">

          <h4 className="mb-3">
            {editId ? "Edit Product" : "Add Product"}
          </h4>

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="productName"
                  placeholder="Product Name"
                  value={product.productName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  placeholder="Category"
                  value={product.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  placeholder="Quantity"
                  value={product.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  placeholder="Price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                name="description"
                placeholder="Description"
                value={product.description}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              <i className="bi bi-save me-2"></i>

              {editId
                ? "Update Product"
                : "Add Product"}
            </button>

            {editId && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}

          </form>

        </div>

      </div>

      {/* Product List */}

      <div className="card shadow border-0">

        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h4 className="mb-0">
              Manage Products
            </h4>

            <span className="badge bg-primary fs-6">
              Total: {products.length}
            </span>

          </div>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search Product..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">

                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredProducts.length > 0 ? (

                  filteredProducts.map(
                    (item, index) => (

                      <tr key={item._id}>

                        <td>{index + 1}</td>

                        <td>
                          {item.productName}
                        </td>

                        <td>
                          {item.category}
                        </td>

                        <td>
                          {item.quantity}
                        </td>

                        <td>
                          ₹{item.price}
                        </td>

                        <td>
                          {item.description}
                        </td>

                        <td>

                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() =>
                              handleEdit(item)
                            }
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDelete(item._id)
                            }
                          >
                            <i className="bi bi-trash"></i>
                          </button>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>
                    <td
                      colSpan="7"
                      className="text-center"
                    >
                      No products found
                    </td>
                  </tr>

                )}

              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
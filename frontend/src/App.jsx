<<<<<<< HEAD
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Changepass from "./pages/Changepass";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import AdminPanel from "./pages/AdminPanel";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
   const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const currentTheme =
      localStorage.getItem("theme") || "light";

    setTheme(currentTheme);

    document.body.className = currentTheme;
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/changepassword" element={<Changepass />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="report" element={<Report />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

=======
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Changepass from "./pages/Changepass";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import AdminPanel from "./pages/AdminPanel";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
   const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const currentTheme =
      localStorage.getItem("theme") || "light";

    setTheme(currentTheme);

    document.body.className = currentTheme;
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/changepassword" element={<Changepass />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="report" element={<Report />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

>>>>>>> a5be8771bc938d3240964aa89163d99f33271362
export default App;
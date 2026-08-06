import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import UserAuth from "./pages/UserAuth";
import UserDashboard from "./pages/UserDashboard";
import Legal from "./pages/Legal";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManagePortfolio from "./pages/admin/ManagePortfolio";
import ManagePhotographers from "./pages/admin/ManagePhotographers";
import ManageCategories from "./pages/admin/ManageCategories";
import ManagePackages from "./pages/admin/ManagePackages";
import ManageTestimonials from "./pages/admin/ManageTestimonials";
import ManageBookings from "./pages/admin/ManageBookings";
import ManageUsers from "./pages/admin/ManageUsers";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<UserAuth />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/privacy" element={<Legal type="privacy" />} />
      <Route path="/terms" element={<Legal type="terms" />} />
      <Route path="/cookies" element={<Legal type="cookies" />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="portfolio" element={<ManagePortfolio />} />
        <Route path="photographers" element={<ManagePhotographers />} />
        <Route path="categories" element={<ManageCategories />} />
        <Route path="packages" element={<ManagePackages />} />
        <Route path="testimonials" element={<ManageTestimonials />} />
        <Route path="bookings" element={<ManageBookings />} />
        <Route path="users" element={<ManageUsers />} />
      </Route>
    </Routes>
  );
}

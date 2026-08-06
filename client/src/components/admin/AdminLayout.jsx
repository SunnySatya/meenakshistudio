import React from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../images/logo-sm.png";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: "📊", end: true },
  { to: "/admin/portfolio", label: "Portfolio", icon: "🖼️" },
  { to: "/admin/photographers", label: "Photographers", icon: "🧑‍🚀" },
  { to: "/admin/categories", label: "Categories", icon: "📂" },
  { to: "/admin/packages", label: "Packages", icon: "📦" },
  { to: "/admin/testimonials", label: "Testimonials", icon: "💬" },
  { to: "/admin/bookings", label: "Bookings", icon: "📅" },
  { to: "/admin/users", label: "Users", icon: "👥" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const pageTitle = {
    "/admin": "Dashboard",
    "/admin/portfolio": "Manage Portfolio",
    "/admin/photographers": "Manage Photographers",
    "/admin/categories": "Manage Categories",
    "/admin/packages": "Manage Packages",
    "/admin/testimonials": "Manage Testimonials",
    "/admin/bookings": "Manage Bookings",
    "/admin/users": "Manage Users",
  };

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <Link to="/" className="logo">
          <img src={logo} alt="Meenakshi Studio" className="logo-img" />
          <span className="logo-text">Meenakshi Studio</span>
        </Link>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <span className="nav-icon">↩️</span>
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <h1>{pageTitle[window.location.pathname] || "Dashboard"}</h1>
          <div className="admin-header-actions">
            <Link to="/" className="btn btn-gold btn-sm">
              🌐 Go to Site
            </Link>
          </div>
          <div className="admin-user">
            <div className="avatar-sm">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
                alt={user?.name}
              />
            </div>
            <span>{user?.name}</span>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

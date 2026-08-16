import React from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Images,
  Camera,
  FolderOpen,
  Package,
  MessageSquare,
  Calendar,
  Users,
  Mail,
  LogOut,
  Globe,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../images/weblogo.png";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/portfolio", label: "Portfolio", icon: Images },
  { to: "/admin/photographers", label: "Photographers", icon: Camera },
  { to: "/admin/categories", label: "Categories", icon: FolderOpen },
  { to: "/admin/packages", label: "Packages", icon: Package },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { to: "/admin/bookings", label: "Bookings", icon: Calendar },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/subscribers", label: "Subscribers", icon: Mail },
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
    "/admin/subscribers": "Manage Subscribers",
  };

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <Link to="/" className="logo">
          <img src={logo} alt="Royal Photography" className="logo-img" />
          <span className="logo-text">Royal Photography</span>
        </Link>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="nav-icon">
                <item.icon size={18} />
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <span className="nav-icon">
            <LogOut size={18} />
          </span>
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <h1>{pageTitle[window.location.pathname] || "Dashboard"}</h1>
          <div className="admin-header-actions">
            <Link to="/" className="btn btn-gold btn-sm">
              <Globe size={16} style={{ marginRight: 6, verticalAlign: "middle" }} /> Go to Site
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

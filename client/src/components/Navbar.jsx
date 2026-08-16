import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../images/weblogo.png";

const menuItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "My Work", href: "#portfolio" },
  { label: "Pricing", href: "#packages" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#booking" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#home" className="logo" onClick={(e) => scrollTo(e, "#home")}>
          <img src={logo} alt="Royal Photography" className="logo-img" />
          <span className="logo-text">
            Royal <em>Photography</em>
          </span>
        </a>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {menuItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} onClick={(e) => scrollTo(e, item.href)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          {user ? (
            <Link
              to={user.role === "admin" ? "/admin" : "/dashboard"}
              className="nav-user"
              title={user.role === "admin" ? "Admin Dashboard" : "My Bookings"}
            >
              <span className="nav-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </span>
              {user.name}
            </Link>
          ) : (
            <>
              <Link to="/auth" className="btn btn-outline btn-sm">
                Login
              </Link>
              <Link to="/auth" className="btn btn-gold btn-sm">
                Sign Up
              </Link>
            </>
          )}
          <button
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            {menuItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={(e) => scrollTo(e, item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
            {user && (
              <>
                <li>
                  <Link
                    to={user.role === "admin" ? "/admin" : "/dashboard"}
                    onClick={() => setMenuOpen(false)}
                  >
                    {user.role === "admin" ? "Admin Dashboard" : "My Bookings"}
                  </Link>
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <Link to="/auth" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/auth" onClick={() => setMenuOpen(false)}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

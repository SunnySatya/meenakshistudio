import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PasswordInput from "../components/PasswordInput";

export default function UserAuth() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        await register(form.name, form.email, form.password);
      } else {
        const data = await login(form.email, form.password);
        if (data.role === "admin") {
          navigate("/admin");
          return;
        }
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card auth-card">
        <Link to="/" className="logo">
          <span className="logo-mark">M</span>
          <span className="logo-text">
            Meenakshi <em>Studio</em>
          </span>
        </Link>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === "login" ? "active" : ""}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`auth-tab ${mode === "signup" ? "active" : ""}`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <PasswordInput
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-gold btn-lg"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : "Create Account"}
          </button>
        </form>

        <p className="admin-hint">
          By continuing, you agree to our Terms &amp; Privacy Policy.
        </p>
      </div>
    </div>
  );
}

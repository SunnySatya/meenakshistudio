import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Camera,
  MapPin,
  Gift,
  User,
  CreditCard,
} from "lucide-react";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function UserDashboard() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/auth");
      return;
    }
    api
      .get("/bookings/my")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Failed to load bookings", err))
      .finally(() => setBookingsLoading(false));
  }, [user, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const formatDate = (d) => {
    if (!d) return "Not set";
    const date = new Date(d);
    return isNaN(date)
      ? "Not set"
      : date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
  };

  const formatMoney = (n) => {
    const num = Number(n) || 0;
    return "₹" + num.toLocaleString("en-IN");
  };

  const remaining = (b) => {
    return Math.max(
      0,
      (Number(b.totalAmount) || 0) - (Number(b.paidAmount) || 0),
    );
  };

  const paymentPercent = (b) => {
    const total = Number(b.totalAmount) || 0;
    if (total <= 0) return 0;
    return Math.min(
      100,
      Math.round(((Number(b.paidAmount) || 0) / total) * 100),
    );
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <div className="container">
        <div className="ud-header">
          <div>
            <span className="eyebrow">My Account</span>
            <h1 className="section-title">
              Welcome back, <em>{user?.name?.split(" ")[0]}</em>
            </h1>
            <p className="section-subtitle">
              Track your bookings and manage your account.
            </p>
          </div>
          <div className="ud-actions">
            <Link to="/" className="btn btn-outline">
              ← Back to Home
            </Link>
            <button className="btn btn-red" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="ud-grid">
          <aside className="ud-sidebar">
            <div className="ud-profile">
              <div className="ud-avatar">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <h3>{user?.name}</h3>
              <p>{user?.email}</p>
            </div>
            <nav className="ud-nav">
              <span className="ud-nav-item active">My Bookings</span>
              <span className="ud-nav-item" onClick={handleLogout}>
                Logout
              </span>
            </nav>
          </aside>

          <div className="ud-content">
            <div className="ud-content-head">
              <h2>My Bookings</h2>
              <span className="ud-count">{bookings.length} total</span>
            </div>

            {bookingsLoading ? (
              <div className="empty-state">
                <div className="spinner"></div>
                <p>Loading your bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <Calendar size={40} />
                </div>
                <h3>No bookings yet</h3>
                <p>
                  You haven't made any booking requests. Ready to capture your
                  special moments?
                </p>
                <Link to="/#booking" className="btn btn-gold">
                  Book a Session
                </Link>
              </div>
            ) : (
              <div className="ud-bookings">
                {bookings.map((b) => (
                  <div className="ud-booking-card" key={b._id}>
                    <div className="ud-booking-top">
                      <div className="ud-booking-event">
                        <span className="ud-event-icon">
                          <Camera size={22} />
                        </span>
                        <div>
                          <h4>{b.eventType || "Photography Session"}</h4>
                          <span className={`ud-status status-${b.status}`}>
                            {STATUS_LABELS[b.status] || b.status}
                          </span>
                        </div>
                      </div>
                      <span className="ud-booking-id">
                        #{b._id?.slice(-6)?.toUpperCase()}
                      </span>
                    </div>

                    <div className="ud-booking-details">
                      <div className="ud-detail">
                        <span className="ud-detail-icon">
                          <Calendar size={16} />
                        </span>
                        <div>
                          <label>Date</label>
                          <p>{formatDate(b.date)}</p>
                        </div>
                      </div>
                      <div className="ud-detail">
                        <span className="ud-detail-icon">
                          <MapPin size={16} />
                        </span>
                        <div>
                          <label>Venue / Location</label>
                          <p>{b.location || "To be confirmed"}</p>
                        </div>
                      </div>
                      <div className="ud-detail">
                        <span className="ud-detail-icon">
                          <Gift size={16} />
                        </span>
                        <div>
                          <label>Package</label>
                          <p>{b.package || "Custom"}</p>
                        </div>
                      </div>
                      <div className="ud-detail">
                        <span className="ud-detail-icon">
                          <User size={16} />
                        </span>
                        <div>
                          <label>Photographer</label>
                          <p>{b.photographer || "Royal Photography"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="ud-payment">
                      <div className="ud-payment-head">
                        <span>
                          <CreditCard size={16} style={{ marginRight: 6, verticalAlign: "middle" }} /> Payment Details
                        </span>
                        <span
                          className={`ud-pay-badge ${
                            remaining(b) <= 0 ? "paid" : "due"
                          }`}
                        >
                          {remaining(b) <= 0 ? "Paid in Full" : "Balance Due"}
                        </span>
                      </div>
                      <div className="ud-payment-grid">
                        <div className="ud-pay-item">
                          <label>Total Payment</label>
                          <p>{formatMoney(b.totalAmount)}</p>
                        </div>
                        <div className="ud-pay-item">
                          <label>Paid Amount</label>
                          <p className="paid-amount">
                            {formatMoney(b.paidAmount)}
                          </p>
                        </div>
                        <div className="ud-pay-item">
                          <label>Remaining Payment</label>
                          <p className="remain-amount">
                            {formatMoney(remaining(b))}
                          </p>
                        </div>
                      </div>
                      <div className="ud-pay-progress">
                        <div
                          className="ud-pay-progress-fill"
                          style={{ width: `${paymentPercent(b)}%` }}
                        ></div>
                      </div>
                      <div className="ud-pay-progress-label">
                        <span>{paymentPercent(b)}% paid</span>
                        {remaining(b) > 0 && (
                          <span>{formatMoney(remaining(b))} remaining</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

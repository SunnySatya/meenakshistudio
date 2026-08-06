import React, { useState, useEffect } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function Booking() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Wedding",
    date: "",
    package: "",
    location: "",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await api.post("/bookings", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        eventType: form.eventType,
        date: form.date || undefined,
        package: form.package,
        location: form.location,
        photographer: "Meenakshi Studio",
      });
      setStatus({
        type: "success",
        msg: "Thank you! Your booking request has been received. I'll get back to you shortly.",
      });
      setForm({
        name: user ? user.name : "",
        email: user ? user.email : "",
        phone: "",
        eventType: "Wedding",
        date: "",
        package: "",
        location: "",
        message: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        msg: "Something went wrong. Please try again or contact me directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="booking" id="booking">
      <div className="container">
        <div className="booking-wrap">
          <div className="booking-info">
            <span className="eyebrow">Book Me</span>
            <h2 className="section-title">
              Let's Create Something
              <br />
              Beautiful Together
            </h2>
            <p>
              Ready to capture your special moments? Fill in the form and I'll
              personally get back to you to plan the perfect session — from
              ideas to the final, beautifully delivered gallery.
            </p>

            <div className="booking-contact">
              <div className="contact-row">
                <div className="contact-ico">📧</div>
                <div>
                  <h4>Email</h4>
                  <span>meenakshistudio@gmail.com</span>
                </div>
              </div>
              <div className="contact-row">
                <div className="contact-ico">📞</div>
                <div>
                  <h4>Phone</h4>
                  <span>+919719177111</span>
                </div>
              </div>
              <div className="contact-row">
                <div className="contact-ico">📍</div>
                <div>
                  <h4>Based In</h4>
                  <span>Etah-Meenakshi Studio In Front of City Kotwali G.T. Road Etah UP  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="booking-card">
            <h3>Book a Session</h3>
            <p className="card-sub">
              Tell me about your shoot — I'll respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
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
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 ..."
                  />
                </div>
                <div className="form-group">
                  <label>Event Type</label>
                  <select
                    name="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                  >
                    <option>Wedding</option>
                    <option>Pre-Wedding</option>
                    <option>Portrait</option>
                    <option>Fashion</option>
                    <option>Birthday</option>
                    <option>Corporate</option>
                    <option>Maternity</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Package</label>
                  <select
                    name="package"
                    value={form.package}
                    onChange={handleChange}
                  >
                    <option value="">Select package</option>
                    <option>Silver</option>
                    <option>Gold</option>
                    <option>Platinum</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label>Venue / Location</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Taj Palace, New Delhi"
                  />
                </div>
                <div className="form-group full">
                  <label>Tell Me About Your Shoot</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Location, number of guests, the story behind your event..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-gold btn-lg"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Request Booking"}
              </button>

              {status && (
                <div className={`form-message ${status.type}`}>
                  {status.msg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

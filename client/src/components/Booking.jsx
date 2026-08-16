import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function Booking() {
  const { user } = useAuth();
  const [packages, setPackages] = useState([]);
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

  // Load packages to populate the dropdown and show the selected price.
  useEffect(() => {
    api
      .get("/packages")
      .then((res) => setPackages(res.data))
      .catch(() => {});
  }, []);

  const selectedPackage = packages.find((p) => p.name === form.package);

  const formatPrice = (price) => {
    if (!price) return "";
    return "₹" + Number(price).toLocaleString("en-IN");
  };

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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (bookingId, receiptInfo) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      throw new Error("Could not load Razorpay. Please try again.");
    }

    const orderRes = await api.post("/payments/create-order", { bookingId });
    const { orderId, keyId } = orderRes.data;

    return new Promise((resolve, reject) => {
      const rzp = new window.Razorpay({
        key: keyId,
        order_id: orderId,
        amount: orderRes.data.amount * 100,
        currency: "INR",
        name: "Royal Photography",
        description: `Advance payment for ${receiptInfo.package || "booking"} session`,
        prefill: {
          name: receiptInfo.name,
          email: receiptInfo.email,
          contact: receiptInfo.phone,
        },
        handler: async (response) => {
          try {
            await api.post("/payments/verify", {
              bookingId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            resolve();
          } catch (err) {
            reject(err);
          }
        },
        modal: {
          ondismiss: () => reject(new Error("Payment cancelled")),
        },
        theme: { color: "#c9a24b" },
      });
      rzp.open();
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await api.post("/bookings", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        eventType: form.eventType,
        date: form.date || undefined,
        package: form.package,
        location: form.location,
        photographer: "Royal Photography",
      });

      const advanceAmount =
        form.package === "Other"
          ? 1000
          : form.eventType === "Small Party"
            ? 1000
            : selectedPackage?.advance ||
              (selectedPackage
                ? Math.round(selectedPackage.price * 0.25)
                : 5000);

      await handlePayment(res.data._id, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        package: form.package,
      });

      setStatus({
        type: "success",
        msg: `Payment successful! Your booking is confirmed. Advance of ${formatPrice(
          advanceAmount,
        )} received. I'll get back to you shortly.`,
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
      const msg = err.response?.data?.message;
      setStatus({
        type: "error",
        msg:
          msg && msg !== "Payment cancelled"
            ? msg
            : "Booking received. Payment pending — you can pay the advance later via WhatsApp.",
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
                <div className="contact-ico">
                  <Mail size={18} />
                </div>
                <div>
                  <h4>Email</h4>
                  <span>sunnysatya4@gmail.com</span>
                </div>
              </div>
              <div className="contact-row">
                <div className="contact-ico">
                  <Phone size={18} />
                </div>
                <div>
                  <h4>Phone</h4>
                  <span>+916398665027</span>
                </div>
              </div>
              <div className="contact-row">
                <div className="contact-ico">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4>Based In</h4>
                  <span>We Get Only Online Work, Help Address- Etah UP </span>
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
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 ..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Event Type *</label>
                  <select
                    name="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                    required
                  >
                    <option>Wedding</option>
                    <option>Pre-Wedding</option>
                    <option>Portrait</option>
                    <option>Fashion</option>
                    <option>Birthday</option>
                    <option>Small Party</option>
                    <option>Corporate</option>
                    <option>Maternity</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Preferred Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Package *</label>
                  <select
                    name="package"
                    value={form.package}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select package</option>
                    {packages.map((p) => (
                      <option key={p._id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  {selectedPackage && (
                    <small
                      style={{
                        display: "block",
                        marginTop: "6px",
                        color: "var(--gold, #c9a24b)",
                        fontWeight: 600,
                      }}
                    >
                      {selectedPackage.name} —{" "}
                      {formatPrice(selectedPackage.price)}
                      <br />
                      <span style={{ color: "#0aa2c0" }}>
                        Advance to confirm: {formatPrice(selectedPackage.advance)}
                      </span>
                    </small>
                  )}
                  {form.package === "Other" && (
                    <small
                      style={{
                        display: "block",
                        marginTop: "6px",
                        color: "#0aa2c0",
                        fontWeight: 600,
                      }}
                    >
                      Advance to confirm: {formatPrice(1000)}
                    </small>
                  )}
                  {form.eventType === "Small Party" && (
                    <small
                      style={{
                        display: "block",
                        marginTop: "6px",
                        color: "#0aa2c0",
                        fontWeight: 600,
                      }}
                    >
                      Advance to confirm: {formatPrice(1000)}
                    </small>
                  )}
                </div>
                <div className="form-group full">
                  <label>Venue / Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Taj Palace, New Delhi"
                    required
                  />
                </div>
                <div className="form-group full">
                  <label>Tell Me About Your Shoot *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Location, number of guests, the story behind your event..."
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-gold btn-lg"
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay Advance & Confirm Booking"}
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

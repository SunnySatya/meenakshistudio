import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import api from "../../api";
import Toast from "../../components/admin/Toast";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [toast, setToast] = useState(null);

  const fetchAll = async () => {
    const res = await api.get("/bookings");
    setBookings(res.data);
  };
  useEffect(() => {
    fetchAll();
  }, []);

  const createBooking = async (data) => {
    try {
      await api.post("/bookings", data);
      showToast("Booking created!");
      fetchAll();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to create booking",
        "error",
      );
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}`, { status });
      showToast("Booking status updated!");
      fetchAll();
    } catch (err) {
      showToast("Failed to update", "error");
    }
  };

  const updatePayment = async (id, totalAmount, paidAmount) => {
    try {
      await api.put(`/bookings/${id}`, {
        totalAmount: Number(totalAmount) || 0,
        paidAmount: Number(paidAmount) || 0,
      });
      showToast("Payment details updated!");
      fetchAll();
    } catch (err) {
      showToast("Failed to update payment", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await api.delete(`/bookings/${id}`);
      showToast("Booking deleted!");
      fetchAll();
    } catch (err) {
      showToast("Failed to delete", "error");
    }
  };

  const statusColors = {
    pending: "var(--gold)",
    confirmed: "#4ade80",
    completed: "#7b2ff7",
    cancelled: "#ff4d4d",
  };

  return (
    <div>
      <AddBookingForm onCreate={createBooking} />

      <div className="admin-card">
        <h3>All Bookings ({bookings.length})</h3>
        {bookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Calendar size={40} />
            </div>
            <p>No bookings yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Event</th>
                  <th className="hide-sm">Date</th>
                  <th>Status</th>
                  <th>Total (₹)</th>
                  <th>Paid (₹)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <PaymentRow
                    key={b._id}
                    booking={b}
                    onUpdate={updatePayment}
                    onDelete={handleDelete}
                    onStatus={updateStatus}
                    statusColors={statusColors}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

function PaymentRow({
  booking: b,
  onUpdate,
  onDelete,
  onStatus,
  statusColors,
}) {
  const [total, setTotal] = useState(b.totalAmount || 0);
  const [paid, setPaid] = useState(b.paidAmount || 0);

  const remaining = Math.max(
    0,
    (Number(b.totalAmount) || 0) - (Number(b.paidAmount) || 0),
  );

  return (
    <tr>
      <td>
        {b.name}
        <br />
        <small style={{ color: "var(--text-soft)" }}>{b.email}</small>
      </td>
      <td>{b.eventType}</td>
      <td className="hide-sm">
        {b.date ? new Date(b.date).toLocaleDateString() : "—"}
      </td>
      <td>
        <select
          value={b.status}
          onChange={(e) => onStatus(b._id, e.target.value)}
          style={{
            color: statusColors[b.status] || "#333",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "6px 10px",
          }}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </td>
      <td>
        <input
          className="pay-input"
          type="number"
          min="0"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />
      </td>
      <td>
        <input
          className="pay-input"
          type="number"
          min="0"
          value={paid}
          onChange={(e) => setPaid(e.target.value)}
        />
        {remaining > 0 && (
          <div>
            <small style={{ color: "#e41e3f" }}>
              Due: ₹{remaining.toLocaleString()}
            </small>
          </div>
        )}
      </td>
      <td>
        <div className="actions">
          <button
            className="btn-edit"
            onClick={() => onUpdate(b._id, total, paid)}
          >
            Save
          </button>
          <button className="btn-del" onClick={() => onDelete(b._id)}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

function AddBookingForm({ onCreate }) {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    package: "",
    totalAmount: "",
    paidAmount: "",
    status: "pending",
  });

  useEffect(() => {
    api
      .get("/packages")
      .then((res) => setPackages(res.data))
      .catch(() => {});
  }, []);

  const selectedPkg = packages.find((p) => p.name === form.package);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      // Auto-fill total from the selected package's price.
      if (name === "package") {
        const pkg = packages.find((p) => p.name === value);
        if (pkg) next.totalAmount = pkg.price;
      }
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Name and email are required");
      return;
    }
    onCreate({
      name: form.name,
      email: form.email,
      phone: form.phone,
      eventType: form.eventType,
      date: form.date || undefined,
      package: form.package,
      totalAmount: Number(form.totalAmount) || 0,
      paidAmount: Number(form.paidAmount) || 0,
      status: form.status,
    });
    setForm({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      date: "",
      package: "",
      totalAmount: "",
      paidAmount: "",
      status: "pending",
    });
  };

  return (
    <div className="admin-card">
      <h3>Add Booking</h3>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Client name"
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
              placeholder="client@email.com"
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
            <input
              type="text"
              name="eventType"
              value={form.eventType}
              onChange={handleChange}
              placeholder="e.g. Wedding"
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Package</label>
            <select name="package" value={form.package} onChange={handleChange}>
              <option value="">Select package</option>
              {packages.map((p) => (
                <option key={p._id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
            {selectedPkg && (
              <small
                style={{ display: "block", marginTop: "6px", color: "#c9a24b" }}
              >
                ₹{selectedPkg.price.toLocaleString("en-IN")}
              </small>
            )}
          </div>
          <div className="form-group">
            <label>Total Amount (₹)</label>
            <input
              type="number"
              name="totalAmount"
              min="0"
              value={form.totalAmount}
              onChange={handleChange}
              placeholder="Auto-filled from package"
            />
          </div>
          <div className="form-group">
            <label>Paid Amount (₹)</label>
            <input
              type="number"
              name="paidAmount"
              min="0"
              value={form.paidAmount}
              onChange={handleChange}
              placeholder="0"
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-gold">
            Add Booking
          </button>
        </div>
      </form>
    </div>
  );
}

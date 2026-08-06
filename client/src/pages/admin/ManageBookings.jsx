import React, { useState, useEffect } from "react";
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
      <div className="admin-card">
        <h3>All Bookings ({bookings.length})</h3>
        {bookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
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

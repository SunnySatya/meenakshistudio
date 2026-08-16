import React, { useState, useEffect } from "react";
import { Mail, Download } from "lucide-react";
import api from "../../api";
import Toast from "../../components/admin/Toast";

export default function ManageSubscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [toast, setToast] = useState(null);

  const fetchSubscribers = async () => {
    const res = await api.get("/subscribers");
    setSubscribers(res.data);
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subscriber?")) return;
    try {
      await api.delete(`/subscribers/${id}`);
      showToast("Subscriber removed!");
      fetchSubscribers();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to delete subscriber",
        "error",
      );
    }
  };

  const exportCsv = () => {
    const rows = [
      ["Email", "Subscribed On"],
      ...subscribers.map((s) => [
        s.email,
        s.createdAt ? new Date(s.createdAt).toLocaleString() : "",
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="admin-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Subscribers ({subscribers.length})</h3>
          {subscribers.length > 0 && (
            <button className="btn btn-gold btn-sm" onClick={exportCsv}>
              <Download size={16} style={{ marginRight: 6, verticalAlign: "middle" }} /> Export CSV
            </button>
          )}
        </div>
        {subscribers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Mail size={40} />
            </div>
            <p>No subscribers yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Subscribed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s) => (
                  <tr key={s._id}>
                    <td>{s.email}</td>
                    <td>
                      {s.createdAt
                        ? new Date(s.createdAt).toLocaleString()
                        : "—"}
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn-del"
                          onClick={() => handleDelete(s._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
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
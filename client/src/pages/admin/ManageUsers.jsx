import React, { useState, useEffect } from "react";
import api from "../../api";
import Toast from "../../components/admin/Toast";
import { useAuth } from "../../context/AuthContext";

export default function ManageUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [toast, setToast] = useState(null);

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const changeRole = async (id, role) => {
    try {
      await api.put(`/users/${id}/role`, { role });
      showToast("User role updated!");
      fetchUsers();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to update role",
        "error",
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user account?")) return;
    try {
      await api.delete(`/users/${id}`);
      showToast("User deleted!");
      fetchUsers();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to delete user",
        "error",
      );
    }
  };

  return (
    <div>
      <div className="admin-card">
        <h3>Registered Users ({users.length})</h3>
        {users.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <p>No users registered yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const isSelf = u._id === currentUser?._id;
                  return (
                    <tr key={u._id}>
                      <td>
                        {u.name}
                        {isSelf && (
                          <span
                            style={{
                              marginLeft: "6px",
                              fontSize: "0.7rem",
                              background: "var(--gold)",
                              color: "#fff",
                              borderRadius: "6px",
                              padding: "2px 6px",
                            }}
                          >
                            You
                          </span>
                        )}
                      </td>
                      <td>{u.email}</td>
                      <td>
                        <select
                          value={u.role}
                          disabled={isSelf}
                          onChange={(e) => changeRole(u._id, e.target.value)}
                          style={{
                            color:
                              u.role === "admin"
                                ? "#7b2ff7"
                                : "var(--text-soft)",
                            background: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "6px 10px",
                          }}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>
                        {u.createdAt
                          ? new Date(u.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td>
                        <div className="actions">
                          <button
                            className="btn-del"
                            disabled={isSelf}
                            onClick={() => handleDelete(u._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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

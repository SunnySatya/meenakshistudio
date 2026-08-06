import React, { useState, useEffect } from "react";
import api from "../../api";
import Toast from "../../components/admin/Toast";

const emptyForm = { name: "", icon: "📸", description: "" };

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchAll = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };
  useEffect(() => {
    fetchAll();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) {
      showToast("Name is required", "error");
      return;
    }
    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, form);
        showToast("Category updated!");
      } else {
        await api.post("/categories", form);
        showToast("Category added!");
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchAll();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to save", "error");
    }
  };

  const handleEdit = (c) => {
    setEditingId(c._id);
    setForm({ name: c.name, icon: c.icon, description: c.description });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await api.delete(`/categories/${id}`);
      showToast("Category deleted!");
      fetchAll();
    } catch (err) {
      showToast("Failed to delete", "error");
    }
  };

  return (
    <div>
      <div className="admin-card">
        <h3>{editingId ? "Edit Category" : "Add Category"}</h3>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Wedding Photography"
              required
            />
          </div>
          <div className="form-group">
            <label>Icon (emoji)</label>
            <input
              name="icon"
              value={form.icon}
              onChange={handleChange}
              placeholder="💍"
            />
          </div>
          <div className="form-group full">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-gold">
              {editingId ? "Update" : "Add Category"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-glass"
                onClick={() => {
                  setForm(emptyForm);
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h3>All Categories ({categories.length})</h3>
        {categories.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <p>No categories yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Icon</th>
                  <th>Name</th>
                  <th className="hide-sm">Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c._id}>
                    <td style={{ fontSize: "1.5rem" }}>{c.icon}</td>
                    <td>{c.name}</td>
                    <td className="hide-sm">{c.description}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(c)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-del"
                          onClick={() => handleDelete(c._id)}
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

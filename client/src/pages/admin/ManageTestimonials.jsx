import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import api from "../../api";
import Toast from "../../components/admin/Toast";

const emptyForm = { name: "", role: "", text: "", rating: 5, avatar: "" };

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchAll = async () => {
    const res = await api.get("/testimonials");
    setTestimonials(res.data);
  };
  useEffect(() => {
    fetchAll();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "rating" ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.text) {
      showToast("Name and testimonial are required", "error");
      return;
    }
    try {
      if (editingId) {
        await api.put(`/testimonials/${editingId}`, form);
        showToast("Testimonial updated!");
      } else {
        await api.post("/testimonials", form);
        showToast("Testimonial added!");
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchAll();
    } catch (err) {
      showToast("Failed to save", "error");
    }
  };

  const handleEdit = (t) => {
    setEditingId(t._id);
    setForm({
      name: t.name,
      role: t.role,
      text: t.text,
      rating: t.rating,
      avatar: t.avatar,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await api.delete(`/testimonials/${id}`);
      showToast("Testimonial deleted!");
      fetchAll();
    } catch (err) {
      showToast("Failed to delete", "error");
    }
  };

  return (
    <div>
      <div className="admin-card">
        <h3>{editingId ? "Edit Testimonial" : "Add Testimonial"}</h3>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Client name"
              required
            />
          </div>
          <div className="form-group">
            <label>Role / Event</label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="e.g. Wedding Photography"
            />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <input
              name="rating"
              type="number"
              step="1"
              min="1"
              max="5"
              value={form.rating}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Avatar URL</label>
            <input
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>
          <div className="form-group full">
            <label>Testimonial</label>
            <textarea
              name="text"
              value={form.text}
              onChange={handleChange}
              placeholder="What did they say?"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-gold">
              {editingId ? "Update" : "Add Testimonial"}
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
        <h3>All Testimonials ({testimonials.length})</h3>
        {testimonials.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <MessageSquare size={40} />
            </div>
            <p>No testimonials yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Rating</th>
                  <th className="hide-sm">Testimonial</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t) => (
                  <tr key={t._id}>
                    <td>
                      <img src={t.avatar} alt={t.name} className="thumb" />
                    </td>
                    <td>{t.name}</td>
                    <td>{"★".repeat(Math.round(t.rating))}</td>
                    <td className="hide-sm" style={{ maxWidth: "280px" }}>
                      {t.text.slice(0, 60)}...
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(t)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-del"
                          onClick={() => handleDelete(t._id)}
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

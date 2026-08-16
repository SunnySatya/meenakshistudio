import React, { useState, useEffect } from "react";
import { Rocket, BadgeCheck, Star } from "lucide-react";
import api from "../../api";
import Toast from "../../components/admin/Toast";

const emptyForm = {
  name: "",
  specialty: "",
  coverImage: "",
  avatar: "",
  rating: 5,
  bookings: 0,
  price: 0,
  experience: 0,
  available: true,
  verified: true,
  featured: true,
};

export default function ManagePhotographers() {
  const [photographers, setPhotographers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [toast, setToast] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchAll = async () => {
    const res = await api.get("/photographers");
    setPhotographers(res.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : name === "rating" ||
              name === "bookings" ||
              name === "price" ||
              name === "experience"
            ? Number(value)
            : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) {
      showToast("Name is required", "error");
      return;
    }
    try {
      if (editingId) {
        await api.put(`/photographers/${editingId}`, form);
        showToast("Photographer updated!");
      } else {
        await api.post("/photographers", form);
        showToast("Photographer added!");
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchAll();
    } catch (err) {
      showToast("Failed to save", "error");
    }
  };

  const handleEdit = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name,
      specialty: p.specialty,
      coverImage: p.coverImage,
      avatar: p.avatar,
      rating: p.rating,
      bookings: p.bookings,
      price: p.price,
      experience: p.experience,
      available: p.available,
      verified: p.verified,
      featured: p.featured,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this photographer?")) return;
    try {
      await api.delete(`/photographers/${id}`);
      showToast("Photographer deleted!");
      fetchAll();
    } catch (err) {
      showToast("Failed to delete", "error");
    }
  };

  const formatPrice = (p) =>
    p >= 1000 ? "₹" + (p / 1000).toFixed(1).replace(/\.0$/, "") + "K" : "₹" + p;

  return (
    <div>
      <div className="admin-card">
        <h3>{editingId ? "Edit Photographer" : "Add Photographer"}</h3>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              required
            />
          </div>
          <div className="form-group">
            <label>Specialty</label>
            <input
              name="specialty"
              value={form.specialty}
              onChange={handleChange}
              placeholder="e.g. Wedding & Cinematic"
            />
          </div>
          <div className="form-group">
            <label>Cover Image URL</label>
            <input
              name="coverImage"
              value={form.coverImage}
              onChange={handleChange}
              placeholder="https://..."
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
          <div className="form-group">
            <label>Rating</label>
            <input
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={form.rating}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Bookings</label>
            <input
              name="bookings"
              type="number"
              value={form.bookings}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Experience (yrs)</label>
            <input
              name="experience"
              type="number"
              value={form.experience}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Available</label>
            <select
              name="available"
              value={form.available}
              onChange={(e) =>
                setForm({ ...form, available: e.target.value === "true" })
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="form-group">
            <label>Verified</label>
            <select
              name="verified"
              value={form.verified}
              onChange={(e) =>
                setForm({ ...form, verified: e.target.value === "true" })
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="form-group">
            <label>Featured</label>
            <select
              name="featured"
              value={form.featured}
              onChange={(e) =>
                setForm({ ...form, featured: e.target.value === "true" })
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-gold">
              {editingId ? "Update" : "Add Photographer"}
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
        <h3>All Photographers ({photographers.length})</h3>
        {photographers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Rocket size={40} />
            </div>
            <p>No photographers yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Specialty</th>
                  <th className="hide-sm">Rating</th>
                  <th className="hide-sm">Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {photographers.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <img src={p.avatar} alt={p.name} className="thumb" />
                    </td>
                    <td>
                      {p.name}{" "}
                      {p.verified && (
                        <BadgeCheck
                          size={15}
                          style={{ verticalAlign: "middle", color: "#0aa2c0" }}
                        />
                      )}
                    </td>
                    <td>{p.specialty}</td>
                    <td className="hide-sm">
                      <Star
                        size={14}
                        style={{ verticalAlign: "middle", color: "#f5b301" }}
                      />{" "}
                      {p.rating}
                    </td>
                    <td className="hide-sm">{formatPrice(p.price)}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-del"
                          onClick={() => handleDelete(p._id)}
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

import React, { useState, useEffect } from "react";
import { Package, Star } from "lucide-react";
import api from "../../api";
import Toast from "../../components/admin/Toast";

const emptyForm = {
  name: "",
  price: 0,
  advance: 5000,
  description: "",
  icon: "📦",
  features: [],
  featured: false,
};

export default function ManagePackages() {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [featuresText, setFeaturesText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchAll = async () => {
    const res = await api.get("/packages");
    setPackages(res.data);
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
    setForm({
      ...form,
      [name]: name === "price" || name === "advance" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) {
      showToast("Name is required", "error");
      return;
    }
    const features = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f);
    const payload = { ...form, features };
    try {
      if (editingId) {
        await api.put(`/packages/${editingId}`, payload);
        showToast("Package updated!");
      } else {
        await api.post("/packages", payload);
        showToast("Package added!");
      }
      setForm(emptyForm);
      setFeaturesText("");
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
      price: p.price,
      advance: p.advance || 5000,
      description: p.description,
      icon: p.icon,
      featured: p.featured,
    });
    setFeaturesText(p.features.join("\n"));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;
    try {
      await api.delete(`/packages/${id}`);
      showToast("Package deleted!");
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
        <h3>{editingId ? "Edit Package" : "Add Package"}</h3>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Gold"
              required
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
            <label>Advance Amount</label>
            <input
              name="advance"
              type="number"
              value={form.advance}
              onChange={handleChange}
              placeholder="e.g. 5000"
            />
          </div>
          <div className="form-group">
            <label>Icon (emoji)</label>
            <input
              name="icon"
              value={form.icon}
              onChange={handleChange}
              placeholder="🥇"
            />
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
          <div className="form-group full">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description"
            />
          </div>
          <div className="form-group full">
            <label>Features (one per line)</label>
            <textarea
              name="features"
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder={
                "8 Hours Coverage\n400+ Edited Photos\n2 Photographers"
              }
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-gold">
              {editingId ? "Update" : "Add Package"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-glass"
                onClick={() => {
                  setForm(emptyForm);
                  setFeaturesText("");
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
        <h3>All Packages ({packages.length})</h3>
        {packages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Package size={40} />
            </div>
            <p>No packages yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Icon</th>
                  <th>Name</th>
                  <th className="hide-sm">Price</th>
                  <th className="hide-sm">Features</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((p) => (
                  <tr key={p._id}>
                    <td style={{ fontSize: "1.5rem" }}>{p.icon}</td>
                    <td>
                      {p.name}{" "}
                      {p.featured && (
                        <Star
                          size={14}
                          style={{ verticalAlign: "middle", color: "#f5b301" }}
                        />
                      )}
                    </td>
                    <td className="hide-sm">{formatPrice(p.price)}</td>
                    <td className="hide-sm">{p.features.length} items</td>
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

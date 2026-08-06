import React, { useState, useEffect, useRef } from "react";
import api from "../../api";
import Toast from "../../components/admin/Toast";

export default function ManagePortfolio() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
    photographer: "",
    featured: true,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [toast, setToast] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const fetchItems = async () => {
    const res = await api.get("/portfolio");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => {});
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) {
      showToast("Title is required", "error");
      return;
    }
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("category", form.category);
    fd.append("photographer", form.photographer);
    fd.append("featured", form.featured);
    if (file) fd.append("image", file);

    setUploading(true);
    try {
      if (editingId) {
        await api.put(`/portfolio/${editingId}`, fd);
        showToast("Portfolio item updated!");
      } else {
        await api.post("/portfolio", fd);
        showToast("Recent work uploaded!");
      }
      resetForm();
      fetchItems();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to save", "error");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: "", category: "", photographer: "", featured: true });
    setFile(null);
    setPreview("");
    setEditingId(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      category: item.category,
      photographer: item.photographer,
      featured: item.featured,
    });
    setPreview(item.image);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this portfolio item?")) return;
    try {
      await api.delete(`/portfolio/${id}`);
      showToast("Portfolio item deleted!");
      fetchItems();
    } catch (err) {
      showToast("Failed to delete", "error");
    }
  };

  return (
    <div>
      <div className="admin-card">
        <h3>{editingId ? "Edit Portfolio Item" : "Upload Recent Work"}</h3>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Golden Hour Wedding"
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Photographer</label>
            <input
              type="text"
              value={form.photographer}
              onChange={(e) =>
                setForm({ ...form, photographer: e.target.value })
              }
              placeholder="e.g. Ayesha S."
            />
          </div>
          <div className="form-group">
            <label>Featured</label>
            <select
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
            <label>Image Upload</label>
            <div className="file-input-wrap">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileRef}
              />
            </div>
            {preview && (
              <img src={preview} alt="Preview" className="image-preview" />
            )}
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-gold" disabled={uploading}>
              {uploading ? (
                <span className="btn-loader">
                  <span className="spinner-btn"></span>
                  {editingId ? "Updating…" : "Uploading…"}
                </span>
              ) : editingId ? (
                "Update Item"
              ) : (
                "Upload Work"
              )}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-glass"
                onClick={resetForm}
                disabled={uploading}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h3>All Portfolio Items ({items.length})</h3>
        {items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🖼️</div>
            <p>No portfolio items yet. Upload your recent work above.</p>
          </div>
        ) : (
          <div className="table-wrap" style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th className="hide-sm">Category</th>
                  <th>Photographer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="thumb"
                      />
                    </td>
                    <td>{item.title}</td>
                    <td className="hide-sm">{item.category}</td>
                    <td>{item.photographer}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-del"
                          onClick={() => handleDelete(item._id)}
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

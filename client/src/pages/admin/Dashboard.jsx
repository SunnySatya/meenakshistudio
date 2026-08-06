import React, { useState, useEffect } from "react";
import api from "../../api";

export default function Dashboard() {
  const [counts, setCounts] = useState({
    portfolio: 0,
    photographers: 0,
    categories: 0,
    packages: 0,
    testimonials: 0,
    bookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          portfolio,
          photographers,
          categories,
          packages,
          testimonials,
          bookings,
        ] = await Promise.all([
          api.get("/portfolio"),
          api.get("/photographers"),
          api.get("/categories"),
          api.get("/packages"),
          api.get("/testimonials"),
          api.get("/bookings"),
        ]);
        setCounts({
          portfolio: portfolio.data.length,
          photographers: photographers.data.length,
          categories: categories.data.length,
          packages: packages.data.length,
          testimonials: testimonials.data.length,
          bookings: bookings.data.length,
        });
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const stats = [
    { label: "Portfolio Items", value: counts.portfolio, icon: "🖼️" },
    { label: "Photographers", value: counts.photographers, icon: "🧑‍🚀" },
    { label: "Categories", value: counts.categories, icon: "📂" },
    { label: "Packages", value: counts.packages, icon: "📦" },
    { label: "Testimonials", value: counts.testimonials, icon: "💬" },
    { label: "Bookings", value: counts.bookings, icon: "📅" },
  ];

  if (loading) {
    return (
      <div className="empty-state">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-card-icon">{s.icon}</div>
            <div className="stat-card-info">
              <h4>{s.value}</h4>
              <p>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h3>Welcome back, Admin 🎉</h3>
        <p style={{ color: "var(--text-muted)" }}>
          Manage your photography platform from the side menu. Upload recent
          work in the Portfolio section, manage photographers, categories,
          packages, testimonials, and bookings.
        </p>
      </div>
    </div>
  );
}

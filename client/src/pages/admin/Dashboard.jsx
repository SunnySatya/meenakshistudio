import React, { useState, useEffect } from "react";
import {
  Images,
  Camera,
  FolderOpen,
  Package,
  MessageSquare,
  Calendar,
  IndianRupee,
  Pin,
  Hourglass,
  Receipt,
  CheckCircle2,
  CircleCheck,
  Clock3,
  XCircle,
  BarChart3,
  PartyPopper,
} from "lucide-react";
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
  const [bookings, setBookings] = useState([]);
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
          bookingRes,
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
          bookings: bookingRes.data.length,
        });
        setBookings(bookingRes.data);
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const stats = [
    { label: "Portfolio Items", value: counts.portfolio, icon: Images },
    { label: "Photographers", value: counts.photographers, icon: Camera },
    { label: "Categories", value: counts.categories, icon: FolderOpen },
    { label: "Packages", value: counts.packages, icon: Package },
    { label: "Testimonials", value: counts.testimonials, icon: MessageSquare },
    { label: "Bookings", value: counts.bookings, icon: Calendar },
  ];

  // ----- Money management metrics (derived from bookings) -----
  const money = { totalEarned: 0, due: 0, totalValue: 0 };
  const statusCount = {
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  };
  bookings.forEach((b) => {
    const total = Number(b.totalAmount) || 0;
    const paid = Number(b.paidAmount) || 0;
    if (b.status !== "cancelled") {
      money.totalEarned += paid;
      money.totalValue += total;
      money.due += Math.max(0, total - paid);
    }
    if (statusCount[b.status] !== undefined) {
      statusCount[b.status] += 1;
    }
  });

  const advanceBookings = statusCount.pending + statusCount.confirmed;

  const moneyCards = [
    {
      label: "Total Earnings",
      value: "₹" + money.totalEarned.toLocaleString(),
      icon: IndianRupee,
      accent: "green",
    },
    {
      label: "Advance Bookings",
      value: advanceBookings,
      icon: Pin,
      accent: "blue",
      sub: `₹${money.due.toLocaleString()} pending`,
    },
    {
      label: "Remaining / Due",
      value: "₹" + money.due.toLocaleString(),
      icon: Hourglass,
      accent: "red",
    },
    {
      label: "Total Booking Value",
      value: "₹" + money.totalValue.toLocaleString(),
      icon: Receipt,
      accent: "gold",
    },
  ];

  const statusCards = [
    {
      label: "Completed",
      value: statusCount.completed,
      icon: CheckCircle2,
      accent: "green",
    },
    {
      label: "Confirmed",
      value: statusCount.confirmed,
      icon: CircleCheck,
      accent: "blue",
    },
    {
      label: "Pending",
      value: statusCount.pending,
      icon: Clock3,
      accent: "gold",
    },
    {
      label: "Cancelled",
      value: statusCount.cancelled,
      icon: XCircle,
      accent: "red",
    },
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
      {/* Existing resource counts */}
      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-card-icon">
                <s.icon size={22} />
              </div>
            <div className="stat-card-info">
              <h4>{s.value}</h4>
              <p>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Money Management */}
      <div className="admin-card">
        <div className="money-head">
          <h3>
            <IndianRupee size={20} style={{ marginRight: 8, verticalAlign: "middle" }} /> Money Management
          </h3>
          <span className="money-sub">Based on booking payments</span>
        </div>

        <div className="stats-grid money-grid">
          {moneyCards.map((c) => (
            <div
              className={`stat-card money-card money-${c.accent}`}
              key={c.label}
            >
              <div className="stat-card-icon">
                <c.icon size={22} />
              </div>
              <div className="stat-card-info">
                <h4 className="money-value">{c.value}</h4>
                <p>{c.label}</p>
                {c.sub && <small className="money-sub">{c.sub}</small>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking status breakdown */}
      <div className="admin-card">
        <div className="money-head">
          <h3>
            <BarChart3 size={20} style={{ marginRight: 8, verticalAlign: "middle" }} /> Booking Status
          </h3>
          <span className="money-sub">Breakdown by status</span>
        </div>
        <div className="stats-grid money-grid">
          {statusCards.map((c) => (
            <div
              className={`stat-card money-card money-${c.accent}`}
              key={c.label}
            >
              <div className="stat-card-icon">
                <c.icon size={22} />
              </div>
              <div className="stat-card-info">
                <h4 className="money-value">{c.value}</h4>
                <p>{c.label} Bookings</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h3>
          Welcome back, Admin{" "}
          <PartyPopper size={18} style={{ verticalAlign: "middle" }} />
        </h3>
        <p style={{ color: "var(--text-muted)" }}>
          Manage your photography platform from the side menu. Upload recent
          work in the Portfolio section, manage photographers, categories,
          packages, testimonials, and bookings.
        </p>
      </div>
    </div>
  );
}

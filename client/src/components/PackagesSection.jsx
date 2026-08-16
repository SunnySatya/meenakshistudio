import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import api from "../api";

export default function PackagesSection() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    api
      .get("/packages")
      .then((res) => setPackages(res.data))
      .catch((err) => console.error("Failed to load packages", err));
  }, []);

  const formatPrice = (price) => {
    if (price >= 1000)
      return "₹" + (price / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return "₹" + price;
  };

  const scrollToBooking = () => {
    const target = document.querySelector("#booking");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="packages" id="packages">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Pricing</span>
          <h2 className="section-title">Packages &amp; Pricing</h2>
          <p className="section-subtitle">
            Thoughtfully crafted packages for every celebration. Each is
            tailored to make your session effortless and unforgettable.
          </p>
        </div>

        <div className="package-grid">
          {packages.map((pkg) => (
            <div
              className={`package-card ${pkg.featured ? "featured" : ""}`}
              key={pkg._id}
            >
              {pkg.featured && (
                <div className="package-badge">Most Popular</div>
              )}
              <div className="package-icon">{pkg.icon}</div>
              <h3>{pkg.name}</h3>
              <div className="package-price">
                {formatPrice(pkg.price)}
                <span> /event</span>
              </div>
              <div className="package-advance">
                Advance to confirm:{" "}
                <strong>{formatPrice(pkg.advance)}</strong>
              </div>
              <ul className="package-features">
                {pkg.features.map((f, i) => (
                  <li key={i}>
                    <span className="check">
                      <Check size={14} />
                    </span>{" "}
                    {f}
                  </li>
                ))}
                {pkg.disabledFeatures &&
                  pkg.disabledFeatures.map((f, i) => (
                    <li key={`d-${i}`} className="disabled">
                      <span className="cross">
                        <X size={14} />
                      </span>{" "}
                      {f}
                    </li>
                  ))}
              </ul>
              <button
                className={`btn ${pkg.featured ? "btn-gold" : "btn-outline"}`}
                onClick={scrollToBooking}
              >
                Book This Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

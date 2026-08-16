import React, { useState, useEffect } from "react";
import { ZoomIn } from "lucide-react";
import api from "../api";

export default function Portfolio({ onOpen }) {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api
      .get("/portfolio")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Failed to load portfolio", err));
  }, []);

  const categories = [
    "All",
    "Wedding",
    "Ring Ceremony",
    "Haldi",
    "Mehendi",
    "Event",
    "Birthday",
  ];
  const normalized = (c) => c.toLowerCase().replace(/\s+/g, " ");
  const filtered =
    filter === "All"
      ? items
      : items.filter((i) => normalized(i.category) === normalized(filter));

  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Gallery</span>
          <h2 className="section-title">My Work</h2>
          <p className="section-subtitle">
            A curated collection of my favourite moments — each one a story told
            through light, emotion, and artistry.
          </p>
        </div>

        <div className="portfolio-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="masonry">
          {filtered.map((item) => (
            <div
              className="masonry-item"
              key={item._id}
              onClick={() => onOpen(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
              />

              <div className="masonry-overlay">
                <div className="zoom-icon">
                  <ZoomIn size={20} />
                </div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

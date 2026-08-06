import React, { useState, useEffect } from "react";
import api from "../api";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    api
      .get("/testimonials")
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.error("Failed to load testimonials", err));
  }, []);

  const renderStars = (rating) => "★".repeat(Math.round(rating));

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Testimonials</span>
          <h2 className="section-title">Words From My Clients</h2>
          <p className="section-subtitle">
            Real stories from families and couples who trusted me with their
            most precious moments.
          </p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t._id}>
              <span className="testimonial-quote">"</span>
              <div className="testimonial-stars">{renderStars(t.rating)}</div>
              <p>"{t.text}"</p>
              <div className="testimonial-author">
                <img src={t.avatar} alt={t.name} />
                <div>
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

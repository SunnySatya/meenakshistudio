import React, { useState, useEffect } from "react";
import banner1 from "../images/banner1.jpg";
import banner2 from "../images/banner2.jpg";
import banner3 from "../images/banner3.jpg";
import banner4 from "../images/banner4.JPG";
import banner5 from "../images/banner5.jpg";

const slides = [
  {
    image: banner1,
    title: "Capturing Etah's",
    highlight: "Most Beautiful Weddings",
    text: "Etah's Number One Cinematic wedding photography that turns your special day into timeless art.",
  },
  {
    image: banner2,
    title: "Every Love Story",
    highlight: "Deserves to Be Told",
    text: "From haldi to phere, I'll be there to capture every emotion of your celebration.",
  },
  {
    image: banner3,
    title: "Timeless Frames",
    highlight: "For Every Celebration",
    text: "Haldi, mehendi, ring ceremony and more — real moments, crafted beautifully.",
  },
  {
    image: banner4,
    title: "Moments That Matter",
    highlight: "Captured Forever",
    text: "Every smile, every glance — preserving the memories you'll treasure for a lifetime.",
  },
  {
    image: banner5,
    title: "A Celebration of",
    highlight: "Love & Light",
    text: "Beautifully crafted portraits and cinematic storytelling for your biggest days.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (href) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="home">
      <div className="slider">
        {slides.map((slide, i) => (
          <div className={`slide ${i === current ? "active" : ""}`} key={i}>
            <img src={slide.image} alt={slide.title} />
            <div className="slide-overlay"></div>
          </div>
        ))}
      </div>

      <div className="container hero-content">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="dot"></span>
            Book Now Etah's Best Wedding Photographer
          </div>

          <h1>
            {slides[current].title}
            <br />
            <span className="gradient-text">{slides[current].highlight}</span>
          </h1>
        </div>

        <div className="hero-actions">
          <div className="hero-cta">
            <button
              className="btn btn-gold btn-lg"
              onClick={() => scrollTo("#booking")}
            >
              Book a Session
            </button>
            <button
              className="btn btn-outline btn-lg"
              onClick={() => scrollTo("#portfolio")}
            >
              View My Work
            </button>
          </div>

          <div className="hero-stats-strip">
            <div className="hero-stat">
              <strong>
                22<span>+</span>
              </strong>
              <span>Years Experience</span>
            </div>
            <div className="hero-stat">
              <strong>
                4790<span>+</span>
              </strong>
              <span>Happy Clients</span>
            </div>
            <div className="hero-stat">
              <strong>
                6460<span>+</span>
              </strong>
              <span>Shoots Delivered</span>
            </div>
            <div className="hero-stat">
              <strong>
                4.9<span>★</span>
              </strong>
              <span>Avg Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

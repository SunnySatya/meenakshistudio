import React from "react";
import about1 from "../images/about1.jpg";
import about2 from "../images/about2.jpg";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-wrap">
          <div className="about-visual">
            <div className="about-exp">
              <strong>22+</strong>
              <span>Years of Art</span>
            </div>
            <div className="main-img">
              <img src={about1} alt="Deepak Gupta — Photographer" />
            </div>
            <div className="about-frame">
              <img src={about2} alt="Haldi ceremony moment" />
            </div>
          </div>

          <div className="about-content">
            <span className="eyebrow">About Me</span>
            <h2 className="section-title">
              The Artist Behind
              <br />
              the Lens
            </h2>
            <p>
              Hello, I'm <em>Deepak Gupta</em> — a passionate photographer who
              believes every moment deserves to be preserved beautifully. For
              over a decade, I've had the privilege of capturing weddings,
              portraits, and once-in-a-lifetime celebrations for families across
              India.
            </p>
            <p>
              My style blends <em>cinematic storytelling</em> with natural,
              candid emotion. I don't just take photos — I create timeless
              heirlooms that let you relive your most precious moments for
              generations. we believes in Quality over Quantity.
            </p>

            <div className="about-skills">
              <div className="skill-tag">
                <span className="icon">💍</span> Wedding Photography
              </div>
              <div className="skill-tag">
                <span className="icon">❤️</span> Pre-Wedding &amp; Portraits
              </div>
              <div className="skill-tag">
                <span className="icon">👗</span> Fashion &amp; Editorial
              </div>
              <div className="skill-tag">
                <span className="icon">🎬</span> Cinematic Films
              </div>
            </div>

            <div className="about-sign">— Deepak Gupta</div>
          </div>
        </div>
      </div>
    </section>
  );
}

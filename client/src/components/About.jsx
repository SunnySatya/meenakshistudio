import React from "react";
import { Gem, Heart, Shirt, Clapperboard } from "lucide-react";
import about1 from "../images/about1.png";
import about2 from "../images/about2.png";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-wrap">
          <div className="about-visual">
            <div className="about-exp">
              <strong>12+</strong>
              <span>Years of Art</span>
            </div>
            <div className="main-img">
              <img src={about1} alt="Shani Devpriya — Photographer" />
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
              Hello, I'm <em>Shani Devpriya</em> — a passionate photographer who
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
                <span className="icon">
                  <Gem size={18} />
                </span>{" "}
                Wedding Photography
              </div>
              <div className="skill-tag">
                <span className="icon">
                  <Heart size={18} />
                </span>{" "}
                Pre-Wedding &amp; Portraits
              </div>
              <div className="skill-tag">
                <span className="icon">
                  <Shirt size={18} />
                </span>{" "}
                Fashion &amp; Editorial
              </div>
              <div className="skill-tag">
                <span className="icon">
                  <Clapperboard size={18} />
                </span>{" "}
                Cinematic Films
              </div>
            </div>

            <div className="about-sign">— Shani Devpriya</div>
          </div>
        </div>
      </div>
    </section>
  );
}

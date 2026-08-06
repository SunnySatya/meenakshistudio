import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Portfolio from "../components/Portfolio";
import PackagesSection from "../components/PackagesSection";
import Testimonials from "../components/Testimonials";
import Booking from "../components/Booking";
import Footer from "../components/Footer";
import Lightbox from "../components/Lightbox";

export default function Home() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Portfolio onOpen={(item) => setLightbox(item)} />
      <PackagesSection />
      <Testimonials />
      <Booking />
      <Footer />
      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}

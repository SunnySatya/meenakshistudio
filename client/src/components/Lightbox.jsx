import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="lightbox active" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>
          <X size={24} />
        </button>
        <img src={item.image} alt={item.title} />
        <div className="lightbox-caption">
          {item.title} — {item.category} • by {item.photographer || "Royal Photography"}
        </div>
      </div>
    </div>
  );
}

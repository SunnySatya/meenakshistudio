import React from "react";

// WhatsApp number in international format (no +, no spaces)
const WHATSAPP_NUMBER = "919719177111";

export default function WhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent(
      "Hello Meenakshi Studio! I have a question about booking a session.",
    );
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <button
      type="button"
      className="whatsapp-float"
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className="whatsapp-icon"
        fill="currentColor"
      >
        <path d="M16.004 3C8.832 3 3 8.832 3 16.004c0 2.973.89 5.742 2.42 8.038L3 29l5.16-2.36c2.21 1.31 4.72 2.02 7.344 2.02 7.172 0 13.004-5.832 13.004-13.004S23.176 3 16.004 3zm0 24.004c-2.59 0-5.01-.78-7.02-2.11l-.5-.3-3.06 1.4 1.41-2.98-.32-.5c-1.6-2.16-2.53-4.78-2.53-7.62C4.004 9.19 9.19 4.004 16.004 4.004c3.33 0 6.46 1.3 8.82 3.66 2.36 2.36 3.66 5.49 3.66 8.82s-1.3 6.46-3.66 8.82c-2.36 2.36-5.49 3.66-8.82 3.66zm4.84-8.06c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.72-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.4-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.02-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.26 0 1.34.97 2.63 1.11 2.81.14.18 1.91 2.92 4.63 4.09.65.28 1.15.45 1.55.58.65.21 1.24.18 1.7.11.52-.08 1.59-.65 1.82-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" />
      </svg>
    </button>
  );
}

import React from "react";

export default function Toast({ message, type = "success", onClose }) {
  if (!message) return null;
  const icon = type === "success" ? "✅" : "⚠️";
  return (
    <div className={`toast ${type}`}>
      <span className="toast-icon">{icon}</span>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: "none",
          color: "var(--text-muted)",
          fontSize: "1rem",
          marginLeft: "8px",
        }}
      >
        ✕
      </button>
    </div>
  );
}

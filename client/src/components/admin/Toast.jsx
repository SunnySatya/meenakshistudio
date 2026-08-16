import React from "react";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";

export default function Toast({ message, type = "success", onClose }) {
  if (!message) return null;
  const Icon = type === "success" ? CheckCircle2 : AlertTriangle;
  return (
    <div className={`toast ${type}`}>
      <span className="toast-icon">
        <Icon size={18} />
      </span>
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
        <X size={18} />
      </button>
    </div>
  );
}

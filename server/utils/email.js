// Email notification helper — sends booking alerts via SMTP (Nodemailer).
//
// Required env vars:
//   SMTP_HOST           — e.g. smtp.gmail.com
//   SMTP_PORT           — e.g. 587
//   SMTP_USER           — the sender email address
//   SMTP_PASS           — App password (Gmail) or SMTP password
//   NOTIFY_EMAIL        — email address that should receive booking alerts
//
// Note: Gmail needs an "App Password" (google.com/settings/security → App passwords)
// created from a Google account with 2-Step Verification enabled.

const nodemailer = require("nodemailer");

function createTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    console.warn("[Email] SMTP_HOST / SMTP_USER / SMTP_PASS not set — skipping notification");
    return null;
  }
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user, pass },
  });
}

function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return String(date);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Notify the admin via email when a booking is created.
// Fire-and-forget: never throws — failures are logged, not propagated.
async function notifyBooking(booking) {
  const to = process.env.NOTIFY_EMAIL;
  if (!to) {
    console.warn("[Email] NOTIFY_EMAIL not set — skipping notification");
    return { skipped: true };
  }

  const transporter = createTransport();
  if (!transporter) return { skipped: true };

  const lines = [
    "A new booking was received on Royal Photography.",
    "",
    `Name: ${booking.name || "-"}`,
    `Email: ${booking.email || "-"}`,
    `Phone: ${booking.phone || "-"}`,
    `Event: ${booking.eventType || "-"}`,
    `Date: ${formatDate(booking.date)}`,
    `Package: ${booking.package || "-"}`,
    `Location: ${booking.location || "-"}`,
    `Total: ${booking.totalAmount ? "₹" + Number(booking.totalAmount).toLocaleString("en-IN") : "-"}`,
    `Advance paid: ${booking.paidAmount ? "₹" + Number(booking.paidAmount).toLocaleString("en-IN") : "0"}`,
    `Status: ${booking.status || "pending"}`,
  ];

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "New Booking — Royal Photography",
      text: lines.join("\n"),
    });
    console.log("[Email] Booking notification sent to", to);
    return { sent: true };
  } catch (err) {
    console.error("[Email] Failed to send booking notification:", err.message);
    return { error: err.message };
  }
}

module.exports = { notifyBooking };
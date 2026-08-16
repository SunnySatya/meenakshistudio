import React from "react";
import { Link } from "react-router-dom";

const docs = {
  privacy: {
    title: "Privacy Policy",
    updated: "August 2026",
    sections: [
      {
        heading: "1. Introduction",
        paragraphs: [
          "Royal Photography (\"we\", \"our\", or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our booking services.",
        ],
      },
      {
        heading: "2. Information We Collect",
        paragraphs: [
          "We may collect the following information when you interact with our website:",
        ],
        list: [
          "Personal details such as your name, email address, and phone number.",
          "Booking information including event type, preferred date, venue location, and message.",
          "Payment details required to process your session payments.",
          "Usage data such as pages visited, device type, and browser information through cookies.",
        ],
      },
      {
        heading: "3. How We Use Your Information",
        paragraphs: [
          "We use the information we collect to provide and improve our photography and booking services, including:",
        ],
        list: [
          "Processing and responding to your booking requests.",
          "Communicating with you about your sessions, quotes, and updates.",
          "Improving our website, gallery, and customer experience.",
          "Sending promotional materials only if you have opted in.",
          "Complying with applicable legal and regulatory requirements.",
        ],
      },
      {
        heading: "4. Sharing of Information",
        paragraphs: [
          "We do not sell, trade, or rent your personal information to third parties. We may share your information only with trusted service providers who assist us in operating our website and delivering our services, and only when required by law.",
        ],
      },
      {
        heading: "5. Data Security",
        paragraphs: [
          "We implement reasonable technical and organisational safeguards to protect your personal information from unauthorised access, alteration, disclosure, or destruction.",
        ],
      },
      {
        heading: "6. Data Retention",
        paragraphs: [
          "We retain your personal information only for as long as necessary to fulfil the purposes described in this policy, to comply with legal obligations, and to resolve disputes.",
        ],
      },
      {
        heading: "7. Your Rights",
        paragraphs: [
          "Depending on your location, you may have the right to access, correct, update, or delete your personal information. To exercise any of these rights, please contact us using the details below.",
        ],
      },
      {
        heading: "8. Changes to This Policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    updated: "August 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        paragraphs: [
          "By accessing and using the Royal Photography website and services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.",
        ],
      },
      {
        heading: "2. Booking Requests",
        paragraphs: [
          "Submitting a booking request through our website does not guarantee a confirmed session. All bookings are subject to availability and final confirmation by Royal Photography via email or phone.",
        ],
      },
      {
        heading: "3. Pricing & Payment",
        paragraphs: [
          "Prices for our photography packages are listed on the website and are subject to change without prior notice. A booking is considered confirmed only after an advance payment, if applicable, is received and acknowledged by us.",
        ],
      },
      {
        heading: "4. Cancellation & Refunds",
        paragraphs: [
          "Cancellations and refunds are handled on a case-by-case basis. Please contact us as early as possible if you need to reschedule or cancel your session. Advance payments may be non-refundable depending on the circumstances.",
        ],
      },
      {
        heading: "5. Intellectual Property",
        paragraphs: [
          "All content on this website, including photographs, text, logos, and graphics, is the property of Royal Photography and is protected by applicable copyright laws. You may not reproduce, distribute, or use any content without our prior written consent.",
        ],
      },
      {
        heading: "6. User Conduct",
        paragraphs: [
          "You agree not to misuse our website, attempt to gain unauthorised access to our systems, or use our services for any unlawful purpose.",
        ],
      },
      {
        heading: "7. Limitation of Liability",
        paragraphs: [
          "To the fullest extent permitted by law, Royal Photography shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or services.",
        ],
      },
      {
        heading: "8. Governing Law",
        paragraphs: [
          "These Terms & Conditions are governed by the laws of India. Any disputes arising under these terms shall be subject to the jurisdiction of the courts located in Etah, Uttar Pradesh.",
        ],
      },
      {
        heading: "9. Changes to These Terms",
        paragraphs: [
          "We reserve the right to modify these Terms & Conditions at any time. Continued use of our services after changes are posted constitutes acceptance of the revised terms.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    updated: "August 2026",
    sections: [
      {
        heading: "1. What Are Cookies",
        paragraphs: [
          "Cookies are small text files stored on your device when you visit a website. They help the website remember your actions and preferences over time.",
        ],
      },
      {
        heading: "2. How We Use Cookies",
        paragraphs: [
          "We use cookies to improve your browsing experience, understand how our website is used, and enhance the functionality of our gallery and booking forms.",
        ],
      },
      {
        heading: "3. Types of Cookies We Use",
        paragraphs: ["The cookies used on our website include:"],
        list: [
          "Essential cookies: required for the website to function, such as keeping you signed in.",
          "Performance cookies: help us understand how visitors use the site so we can improve it.",
          "Functionality cookies: remember your preferences, such as selected filters.",
        ],
      },
      {
        heading: "4. Managing Cookies",
        paragraphs: [
          "You can control and delete cookies through your browser settings. Please note that disabling cookies may affect the performance and functionality of our website.",
        ],
      },
      {
        heading: "5. Third-Party Cookies",
        paragraphs: [
          "Some of our pages may embed content from third-party services (such as Google Fonts) that may set their own cookies. We do not control these third-party cookies.",
        ],
      },
      {
        heading: "6. Changes to This Policy",
        paragraphs: [
          "We may update this Cookie Policy from time to time. Any changes will be reflected on this page with an updated revision date.",
        ],
      },
    ],
  },
};

export default function Legal({ type }) {
  const doc = docs[type] || docs.privacy;

  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-card">
          <Link to="/" className="legal-back">
            ← Back to Home
          </Link>
          <span className="eyebrow">Legal</span>
          <h1 className="section-title">{doc.title}</h1>
          <p className="legal-updated">Last updated: {doc.updated}</p>

          <div className="legal-body">
            {doc.sections.map((s, i) => (
              <section key={i}>
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((item, k) => (
                      <li key={k}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="legal-contact">
            <p>
              Have questions about your privacy or these policies? Email us at{" "}
              <a href="mailto:sunnysatya4@gmail.com">
                sunnysatya4@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

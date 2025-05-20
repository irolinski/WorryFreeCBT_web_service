"use client";

import { useState } from "react";

const ContactScreen = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    try {
      const res = await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      alert("Email sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send email.");
    }
  };

  return (
    <div className="section">
      <div className="contact-screen">
        <div className="content">
          <div className="screen-header">
            <h2 className="screen-header-main">Connect with us</h2>
            <h3 className="screen-header-sub">
              From users to researchers, we're eager to get in touch!
            </h3>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-user-data-row">
              <input
                name="email"
                className={`${
                  contactForm.email.length > 0 ? "is-active" : null
                }`}
                id="contact-form-email"
                placeholder="Your email address"
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
                type="email"
              />
              <input
                name="name"
                className={`${
                  contactForm.name.length > 0 ? "is-active" : null
                }`}
                id="contact-form-name"
                placeholder="Your name and surname"
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({ ...contactForm, name: e.target.value })
                }
                type="text"
              />
            </div>
            <textarea
              name="message"
              className={`${
                contactForm.message.length > 0 ? "is-active" : null
              }`}
              id="contact-form-message"
              placeholder="Your message"
              value={contactForm.message}
              onChange={(e) =>
                setContactForm({ ...contactForm, message: e.target.value })
              }
            />
            <div className="contact-form-button-row">
              <button type="submit" className="contact-form-button">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;

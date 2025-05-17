"use client";

import { useState } from "react";

const ContactForm = () => {
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
    <div>
      <h2>Connect with us</h2>
      <h3>From users to researchers, we're eager to get in touch!</h3>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex-row flex w-full">
          <div className="flex flex-col w-1/2 px-2">
            <label htmlFor="contact-form-name">Name:</label>
            <input
              name="name"
              className="border"
              id="contact-form-name"
              value={contactForm.name}
              onChange={(e) =>
                setContactForm({ ...contactForm, name: e.target.value })
              }
              type="text"
            />
          </div>
          <div className="flex flex-col w-1/2 px-2">
            <label htmlFor="contact-form-email">E-mail:</label>
            <input
              name="email"
              className="border"
              id="contact-form-email"
              value={contactForm.email}
              onChange={(e) =>
                setContactForm({ ...contactForm, email: e.target.value })
              }
              type="email"
            />
          </div>
        </div>
        <div className="px-2">
          <label htmlFor="contact-form-message">Message:</label>
          <textarea
            name="message"
            id="contact-form-message"
            value={contactForm.message}
            onChange={(e) =>
              setContactForm({ ...contactForm, message: e.target.value })
            }
            className="w-full border"
          />
        </div>
        <button type="submit" className="border">
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

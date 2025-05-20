"use client";

import { useState } from "react";
import { InputLength } from "@/types/global";
import {
  validateEmailInput,
  validateMessageInput,
  validateNameInput,
  validateStringLength,
} from "@/utils/formValidation";

const NAME_LENGHT: InputLength = { min: 2, max: 60 };
const EMAIL_LENGTH: InputLength = { min: 5, max: 300 };
const MESSAGE_LENGHT: InputLength = { min: 100, max: 1000 };

const ContactScreen = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactFormErrors, setContactFormErrors] = useState<{
    email: boolean;
    name: boolean;
    message: boolean;
  }>({ email: false, name: false, message: false });
  const [disableSendButton, setDisableSendButton] = useState<boolean>(false);

  const validateContactForm = (): boolean => {
    let isValidated = true;

    //content validation
    if (
      !validateNameInput(contactForm.name) ||
      !validateEmailInput(contactForm.email) ||
      !validateMessageInput(contactForm.message)
    ) {
      isValidated = false;
    }

    //length validation

    if (
      !validateStringLength(contactForm.name, NAME_LENGHT.min, NAME_LENGHT.max)
    ) {
      isValidated = false;
      alert(
        `Name should be between ${NAME_LENGHT.min} and ${NAME_LENGHT.max} characters.`
      );
    }

    if (
      !validateStringLength(
        contactForm.email,
        EMAIL_LENGTH.min,
        EMAIL_LENGTH.max
      )
    ) {
      isValidated = false;
      alert(
        `E-mail should be between ${EMAIL_LENGTH.min} and ${EMAIL_LENGTH.max} characters.`
      );
    }

    if (
      !validateStringLength(
        contactForm.message,
        MESSAGE_LENGHT.min,
        MESSAGE_LENGHT.max
      )
    ) {
      isValidated = false;
      alert(
        `Message should be between ${MESSAGE_LENGHT.min} and ${MESSAGE_LENGHT.max} characters.`
      );
    }

    return isValidated;
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (validateContactForm()) {
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
        setDisableSendButton(true);
      } catch (err) {
        console.error(err);
        alert("Failed to send email.");
      }
    }
  };

  return (
    <div className="section" id="contact-screen">
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
                } ${contactFormErrors.email ? "invalid-input" : null}`}
                id="contact-form-email"
                placeholder="Your email address"
                maxLength={EMAIL_LENGTH.max}
                value={contactForm.email}
                onChange={(e) =>
                  validateEmailInput(e.target.value) &&
                  setContactForm({ ...contactForm, email: e.target.value })
                }
                onBlur={(e) => {
                  setContactFormErrors((prev) => ({
                    ...prev,
                    email: !validateEmailInput(e.target.value),
                  }));
                }}
                type="email"
              />
              <input
                name="name"
                className={`${
                  contactForm.name.length > 0 ? "is-active" : null
                } ${contactFormErrors.name ? "invalid-input" : null}`}
                id="contact-form-name"
                placeholder="Your name and surname"
                maxLength={NAME_LENGHT.max}
                value={contactForm.name}
                onChange={(e) =>
                  validateNameInput(e.target.value) &&
                  setContactForm({ ...contactForm, name: e.target.value })
                }
                onBlur={(e) => {
                  setContactFormErrors((prev) => ({
                    ...prev,
                    name: !validateNameInput(e.target.value),
                  }));
                }}
                type="text"
              />
            </div>
            <textarea
              name="message"
              className={`${
                contactForm.message.length > 0 ? "is-active" : null
              } ${contactFormErrors.message ? "invalid-input" : null}`}
              id="contact-form-message"
              placeholder="Your message"
              maxLength={MESSAGE_LENGHT.max}
              value={contactForm.message}
              onChange={(e) =>
                validateMessageInput(e.target.value) &&
                setContactForm({ ...contactForm, message: e.target.value })
              }
              onBlur={(e) => {
                setContactFormErrors((prev) => ({
                  ...prev,
                  message: !validateMessageInput(e.target.value),
                }));
              }}
            />
            <div className="contact-form-button-row">
              <button
                type="submit"
                className={`contact-form-button ${
                  disableSendButton ? "disabled" : null
                }`}
                disabled={disableSendButton}
              >
                {!disableSendButton ? "Send" : "Sent!"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;

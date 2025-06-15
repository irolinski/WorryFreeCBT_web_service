"use client";
import { useState } from "react";
import { InputLength } from "@/types/global";
import {
  validateEmailInput,
  validateMessageInput,
  validateNameInput,
  validateStringLength,
} from "@/utils/formValidation";

const NAME_LENGTH: InputLength = { min: 2, max: 60 };
const EMAIL_LENGTH: InputLength = { min: 5, max: 300 };
const MESSAGE_LENGTH: InputLength = { min: 100, max: 1500 };

const MAX_FILE_SIZE_MB = 4;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const params = new URLSearchParams(window.location.search);
const deviceInfo = {
  brand: params.get("brand"),
  modelName: params.get("modelName"),
  manufacturer: params.get("manufacturer"),
  osName: params.get("osName"),
  osVersion: params.get("osVersion"),
};

const ReportBugScreen = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: `What was supposed to happen: \n\n\n\nWhat actually happened:\n\n\n\n `,
  });
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [contactFormErrors, setContactFormErrors] = useState({
    email: false,
    name: false,
    message: false,
    file: false,
  });
  const [disableSendButton, setDisableSendButton] = useState(false);

  const validateFile = (file: File | null): boolean => {
    if (file) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return false;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        return false;
      }
    }
    return true;
  };

  const validateContactForm = (): boolean => {
    let isValidated = true;

    if (
      !validateNameInput(contactForm.name) ||
      !validateEmailInput(contactForm.email) ||
      !validateMessageInput(contactForm.message)
    ) {
      isValidated = false;
    }

    if (
      !validateStringLength(contactForm.name, NAME_LENGTH.min, NAME_LENGTH.max)
    ) {
      isValidated = false;
      alert(
        `Name should be between ${NAME_LENGTH.min} and ${NAME_LENGTH.max} characters.`
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
        `Email should be between ${EMAIL_LENGTH.min} and ${EMAIL_LENGTH.max} characters.`
      );
    }

    if (
      !validateStringLength(
        contactForm.message,
        MESSAGE_LENGTH.min,
        MESSAGE_LENGTH.max
      )
    ) {
      isValidated = false;
      alert(
        `Bug description should be between ${MESSAGE_LENGTH.min} and ${MESSAGE_LENGTH.max} characters.`
      );
    }

    if (!validateFile(screenshot)) {
      isValidated = false;
      alert(
        `Invalid file type or size. Only PNG, JPEG, or WebP images under 2MB are allowed.`
      );
    }

    return isValidated;
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    const messageBody =
      contactForm.message +
      "\n\n\n\n\nUser's device info: " +
      JSON.stringify(deviceInfo);

    if (validateContactForm()) {
      const formData = new FormData();
      formData.append("name", contactForm.name);
      formData.append("email", contactForm.email);
      formData.append("message", messageBody);
      if (screenshot) formData.append("screenshot", screenshot);

      try {
        const res = await fetch("/api/report_bug", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        alert("Bug report sent successfully!");
        setDisableSendButton(true);
      } catch (err) {
        console.error(err);
        alert("Failed to send bug report.");
      }
    }
  };

  return (
    <div className="section" id="report-bug">
      <div className="report-bug-screen">
        <div className="content">
          <div className="screen-header">
            <h2 className="screen-header-main">Report a Bug</h2>
            <h3 className="screen-header-sub">
              Encountered a problem? Let us know below.
            </h3>
          </div>
          <form className="bug-form" onSubmit={handleSubmit}>
            <div className="input-row">
              <label className="bug-form-label" htmlFor="email">
                First, let us know your e-mail adress: <br />
                <span className="bug-form-label-subtitle">
                  (so that we can write you back if there is a need)
                </span>
              </label>
              <input
                name="email"
                className={`${
                  contactForm.email.length > 0 ? "is-active" : ""
                } ${contactFormErrors.email ? "invalid-input" : ""}`}
                placeholder="Your email address"
                maxLength={EMAIL_LENGTH.max}
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
                onBlur={(e) => {
                  setContactFormErrors((prev) => ({
                    ...prev,
                    email: !validateEmailInput(e.target.value),
                  }));
                }}
                type="email"
                id="email"
              />
            </div>
            <div className="input-row">
              <label className="bug-form-label" htmlFor="message">
                Now, describe the bug to us: <br />
                <span className="bug-form-label-subtitle">
                  (describe both the expected behavior and the actual behavior)
                </span>
              </label>
              <textarea
                name="message"
                className={`${
                  contactForm.message.length > 0 ? "is-active" : ""
                } ${contactFormErrors.message ? "invalid-input" : ""}`}
                placeholder="Describe the bug in detail..."
                maxLength={MESSAGE_LENGTH.max}
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                onBlur={(e) => {
                  setContactFormErrors((prev) => ({
                    ...prev,
                    message: !validateMessageInput(e.target.value),
                  }));
                }}
                id="message"
              />
            </div>

            <div className="input-row file-upload-wrapper">
              <label className="bug-form-label" htmlFor="screenshot">
                Attach a screenshot:
              </label>
              <div className="file-upload-field">
                <label htmlFor="screenshot" className="button upload-button">
                  Choose File
                </label>
                <span className="file-name">
                  {screenshot?.name || "No file selected"}
                </span>
                <input
                  type="file"
                  id="screenshot"
                  accept=".png,.jpg,.jpeg,.webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setScreenshot(file);
                    setContactFormErrors((prev) => ({
                      ...prev,
                      file: !validateFile(file),
                    }));
                  }}
                />
              </div>
            </div>
            <div className="input-row">
              <label htmlFor="name" className="bug-form-label">
                Lastly, tell us your name: <br />
                <span className="bug-form-label-subtitle">
                  (so that we know how to adress you when writing you back)
                </span>
              </label>
              <input
                name="name"
                className={`${contactForm.name.length > 0 ? "is-active" : ""} ${
                  contactFormErrors.name ? "invalid-input" : ""
                }`}
                placeholder="Your name"
                maxLength={NAME_LENGTH.max}
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({ ...contactForm, name: e.target.value })
                }
                onBlur={(e) => {
                  setContactFormErrors((prev) => ({
                    ...prev,
                    name: !validateNameInput(e.target.value),
                  }));
                }}
                type="text"
                id="name"
              />
            </div>

            <div className="form-button-row">
              <button
                type="submit"
                className={`form-button contact-form-button ${
                  disableSendButton ? "disabled" : ""
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

export default ReportBugScreen;

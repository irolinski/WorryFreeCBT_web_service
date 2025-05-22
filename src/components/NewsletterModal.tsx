"use client";

import { useState } from "react";
import { InputLength } from "@/types/global";
import {
  validateEmailInput,
  validateNameInput,
  validateStringLength,
} from "@/utils/formValidation";

const NAME_LENGHT: InputLength = { min: 2, max: 60 };
const EMAIL_LENGTH: InputLength = { min: 5, max: 300 };

const NewsletterModal = ({
  isOpen,
  handleCloseButtonPress,
}: {
  isOpen: boolean;
  handleCloseButtonPress: () => void;
}) => {
  const [newsletterForm, setNewsletterForm] = useState({
    name: "",
    email: "",
  });
  const [newsletterFormErrors, setNewsletterFormErrors] = useState<{
    email: boolean;
    name: boolean;
  }>({ email: false, name: false });
  const [disableSendButton, setDisableSendButton] = useState<boolean>(false);

  const validateNewsletterForm = (): boolean => {
    let isValidated = true;

    //content validation
    if (
      !validateNameInput(newsletterForm.name) ||
      !validateEmailInput(newsletterForm.email)
    ) {
      isValidated = false;
    }

    //length validation

    if (
      !validateStringLength(
        newsletterForm.name,
        NAME_LENGHT.min,
        NAME_LENGHT.max
      )
    ) {
      isValidated = false;
      alert(
        `Name should be between ${NAME_LENGHT.min} and ${NAME_LENGHT.max} characters.`
      );
    }

    if (
      !validateStringLength(
        newsletterForm.email,
        EMAIL_LENGTH.min,
        EMAIL_LENGTH.max
      )
    ) {
      isValidated = false;
      alert(
        `E-mail should be between ${EMAIL_LENGTH.min} and ${EMAIL_LENGTH.max} characters.`
      );
    }

    return isValidated;
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    //add api call to db here
    if (validateNewsletterForm()) {
      try {
        const res = await fetch("/api/newsletter_subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newsletterForm),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        alert(
          "Thank you for your trust!\n\nYou have been added to our mailing list!"
        );
        setDisableSendButton(true);
      } catch (err: unknown) {
        if (err instanceof Error && err.message) {
          alert(`${err.message}`);
        } else {
          alert("Something went wrong.");
        }
      }
    }
  };

  return (
    <div className={`newsletter-modal ${isOpen ? "is-open" : null}`}>
      <div className="modal-overlay">
        <div className="modal-body">
          <button
            className="modal-close-button"
            onClick={() => handleCloseButtonPress()}
          >
            &#10005;
          </button>
          <div>
            <h2 className="modal-title">Subscribe to our Newsletter</h2>
            <div className="modal-content">
              <h5 className="modal-subtext">
                We&apos;ll let you know about new features in our app, events.
                We promise not to use it more than once per every couple of
                weeks.
              </h5>
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <div className="newsletter-form__fields">
                  <input
                    name="name"
                    className={`form-input ${
                      newsletterForm.name.length > 0 ? "form-input--active" : ""
                    } ${
                      newsletterFormErrors.name ? "form-input--invalid" : ""
                    }`}
                    id="newsletter-form-name"
                    placeholder="Your name and surname"
                    maxLength={NAME_LENGHT.max}
                    value={newsletterForm.name}
                    onChange={(e) =>
                      validateNameInput(e.target.value) &&
                      setNewsletterForm({
                        ...newsletterForm,
                        name: e.target.value,
                      })
                    }
                    onBlur={(e) => {
                      setNewsletterFormErrors((prev) => ({
                        ...prev,
                        name: !validateNameInput(e.target.value),
                      }));
                    }}
                    type="text"
                  />
                  <input
                    name="email"
                    className={`form-input ${
                      newsletterForm.email.length > 0
                        ? "form-input--active"
                        : ""
                    } ${
                      newsletterFormErrors.email ? "form-input--invalid" : ""
                    }`}
                    id="newsletter-form-email"
                    placeholder="Your email address"
                    maxLength={EMAIL_LENGTH.max}
                    value={newsletterForm.email}
                    onChange={(e) =>
                      validateEmailInput(e.target.value) &&
                      setNewsletterForm({
                        ...newsletterForm,
                        email: e.target.value,
                      })
                    }
                    onBlur={(e) => {
                      setNewsletterFormErrors((prev) => ({
                        ...prev,
                        email: !validateEmailInput(e.target.value),
                      }));
                    }}
                    type="email"
                  />
                </div>

                <div className="newsletter-form__actions">
                  <button
                    type="submit"
                    className={`newsletter-form__submit ${
                      disableSendButton
                        ? "newsletter-form__submit--disabled"
                        : ""
                    }`}
                    disabled={disableSendButton}
                  >
                    {!disableSendButton ? "Send" : "Sent!"}
                  </button>
                </div>
              </form>
            </div>
            <span className="modal-privacy-note">
              We value your privacy and will never send any irrelevant
              information
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;

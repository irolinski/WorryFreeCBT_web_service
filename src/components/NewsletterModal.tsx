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
    message: "",
  });
  const [newsletterFormErrors, setNewsletterFormErrors] = useState<{
    email: boolean;
    name: boolean;
    message: boolean;
  }>({ email: false, name: false, message: false });
  const [disableSendButton, setDisableSendButton] = useState<boolean>(false);

  const validateNewsletterForm = (): boolean => {
    let isValidated = true;

    //content validation
    if (
      !validateNameInput(newsletterForm.name) ||
      !validateEmailInput(newsletterForm.email) ||
      !validateMessageInput(newsletterForm.message)
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
    if (validateNewsletterForm()) {
      try {
        const res = await fetch("/api/sendmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newsletterForm),
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
    <div className={`fixed inset-0 z-40 ${isOpen ? "block" : "hidden"}`}>
      <div
        className={`newsletter-modal fixed z-40 block h-full w-full ${
          isOpen ? "block" : "hidden"
        } `}
      >
        <div className="modal-body relative top-1/2 mx-auto min-h-[250px] -translate-y-1/2 bg-gray p-12 text-center w-[95vw] xs:w-[85vw] sm:w-[75vw] lg:w-[60vw] xl:w-[55vw]">
          <button
            className="no-style absolute right-0 top-0 m-4 p-4"
            onClick={() => handleCloseButtonPress()}
          >
            &#10005;
          </button>
          <div>
            <h2 className="p-4 text-2xl font-bold">
              Subscribe to our Newsletter
            </h2>
            <div className=" xs:mx-8 xs:my-12 lg:px-8 items-center  flex flex-col">
              <h5 className="text-sm ">
                We'll let you know about new features in our app, events. We
                promise not to use it more than once per every couple of weeks.
              </h5>
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <div className="newsletter-form-user-data-row">
                  <input
                    name="name"
                    className={`${
                      newsletterForm.name.length > 0 ? "is-active" : null
                    } ${newsletterFormErrors.name ? "invalid-input" : null}`}
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
                    className={`${
                      newsletterForm.email.length > 0 ? "is-active" : null
                    } ${newsletterFormErrors.email ? "invalid-input" : null}`}
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

                <div className="newsletter-form-button-row">
                  <button
                    type="submit"
                    className={`newsletter-form-button ${
                      disableSendButton ? "disabled" : null
                    }`}
                    disabled={disableSendButton}
                  >
                    {!disableSendButton ? "Send" : "Sent!"}
                  </button>
                </div>
              </form>
            </div>
            <span className=" text-sm pb-1 border-b">
              We value your privacy and will never send any irrelevant
              information{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;

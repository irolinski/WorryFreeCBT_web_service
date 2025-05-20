import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WorryFree | Privacy",
};

export default function PrivacyPage() {
  return (
    <div className="text-only-page-wrapper">
      <h2 className="main-header">Privacy Policy</h2>
      <p>
        WorryFree (“we”, “our” or “us”) is committed to protecting your privacy.
        <br />
        This Privacy Policy explains how your personal information is handled by
        WorryFree.
      </p>

      <p>
        This Privacy Policy applies to our mobile application, WorryFree (“the
        App“). By accessing the App, you indicate that you have read,
        understood, and agree to the handling of personal information as
        described in this policy. All anonymous data — including any personal or
        exercise data you enter — is stored solely on your device. We do not
        access, collect, or claim any rights to this information. We collect
        only anonymous usage data, which may include information such as your
        device type, model, usage duration, and button interactions. This data
        is used exclusively to provide and improve the Service. We will not use
        or share your information with anyone except as described in this
        Privacy Policy.{" "}
      </p>

      <h3 className="subheader">Information Collection and Use</h3>

      <p>
        For a better experience while using our Service, you may choose to
        provide the App with limited personally identifiable information, such
        as your name, a photo, or the contact information of a close friend.
        This information is stored solely on your device and is not collected,
        transmitted, or accessed by us in any way.
      </p>

      <p>
        The app uses a third-party service, Google Analytics, which may collect
        technical usage data that, depending on configuration, could potentially
        be used to identify you. However, we have configured Google Analytics to
        respect user privacy by ensuring that no personally identifiable
        information (PII), such as names or email addresses, is transmitted. We
        strongly recommend reviewing Google’s Privacy Policy here:{" "}
        <a href="https://policies.google.com/privacy">
          https://policies.google.com/privacy
        </a>
        .
      </p>

      <p>
        In certain features of the WorryFree App, you may be asked to grant
        permission to access your device’s contact list. This access is used
        solely to allow you to select a contact for sharing app usage, sending a
        support message, or adding that person as a support contact. We do not
        store, transmit, or process your contact list on our servers. All access
        is handled locally on your device through secure system-level
        permissions using the Expo Contacts module. You may deny or revoke this
        permission at any time through your device settings.
      </p>

      <h3 className="subheader">Service Providers</h3>

      <p>
        We may employ third-party companies and individuals for the following
        purposes:
      </p>
      <ul>
        <li>To facilitate our Service;</li>
        <li>To provide the Service on our behalf;</li>
        <li>To perform Service-related tasks; or</li>
        <li>To help us analyze how the Service is used.</li>
      </ul>

      <p>
        We use Google Analytics for Firebase to collect aggregated, anonymous
        usage data. This includes information such as screen views and usage
        frequency, which helps us understand how the App is being used and how
        to improve it. For more details on how this service is implemented,
        please refer to the “Information Collection and Use” section. We
        strongly recommend reviewing Google’s Privacy Policy here:{" "}
        <a href="https://policies.google.com/privacy">
          https://policies.google.com/privacy
        </a>
        .
      </p>

      <p>
        For handling all user input data and several app features, we use the
        Expo SQLite database, which operates entirely locally. This means that
        all such data is stored solely on your device and is not transmitted to
        any external servers.
      </p>

      <h3 className="subheader">Security</h3>
      <p>
        We value your trust and are committed to protecting your information.
        Most data, including personal and exercise information, is stored
        locally on your device and is never transmitted to our servers. For
        anonymous usage analytics collected via Google Analytics for Firebase,
        we rely on commercially accepted security practices provided by Google.
        However, please note that no method of transmission over the internet or
        method of electronic storage is 100% secure.
      </p>

      <h3 className="subheader">Children’s Privacy</h3>
      <p>
        This Service does not address anyone under the age of 13. We do not
        knowingly collect personal identifiable information from children under
        13. In the case we discover that a child under 13 has provided us with
        personal information, we immediately delete this from our servers. If
        you are a parent or guardian and you are aware that your child has
        provided us with personal information, please contact us so that we will
        be able to perform necessary actions.
      </p>

      <h3 className="subheader">Changes to This Privacy Policy</h3>
      <p>
        We may update our Privacy Policy from time to time. Thus, you are
        advised to review this page periodically for any changes. We will notify
        you of any changes by posting the new Privacy Policy on this page. These
        changes are effective immediately, after they are posted on this page.
      </p>

      <h3 className="subheader">Contact Us</h3>
      <p>
        If you have any questions or suggestions about our Privacy Policy, do
        not hesitate to contact us.
      </p>
      <p>
        <a href="mailto:help.worryfree@gmail.com">help.worryfree@gmail.com</a>
      </p>
    </div>
  );
}

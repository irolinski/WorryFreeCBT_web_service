"use client";

import React, { useState } from "react";
import Footer from "../../components/Footer";
import NewsletterModal from "../../components/NewsletterModal";
import ContactScreen from "../../components/screens/Contact";
import LandingScreen from "../../components/screens/Landing";

export const HomepageBody = () => {
  const [showNewsletterModal, setShowNewsletterModal] =
    useState<boolean>(false);

  return (
    <React.Fragment>
      <div className="flex flex-col">
        <div className="main">
          <LandingScreen
            handleOpenNewsletterModal={() => setShowNewsletterModal(true)}
          />
          <ContactScreen />
        </div>
        <Footer />
      </div>
      <NewsletterModal
        isOpen={showNewsletterModal}
        handleCloseButtonPress={() => setShowNewsletterModal(false)}
      />
    </React.Fragment>
  );
};

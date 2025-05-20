import { Metadata } from "next";
import React from "react";
import Footer from "@/components/Footer";
import ContactScreen from "@/components/screens/Contact";
import LandingScreen from "@/components/screens/Landing";

export const metadata: Metadata = {
  title: "WorryFree | Home",
};

export default function HomePage() {
  return (
    <React.Fragment>
      <div className="flex flex-col">
        <div className="main">
          <LandingScreen />
          <ContactScreen />
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}

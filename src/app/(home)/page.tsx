import React from "react";
import ContactScreen from "@/components/screens/Contact";
import LandingScreen from "@/components/screens/Landing";

export default function HomePage() {
  return (
    <React.Fragment>
      <div className="main">
        <LandingScreen />
        <ContactScreen />
      </div>
    </React.Fragment>
  );
}

import { Metadata } from "next";
import React from "react";
import { HomepageBody } from "@/app/(home)/HomepageBody";

export const metadata: Metadata = {
  title: "WorryFree | Home",
};

export default function HomePage() {
  return (
    <React.Fragment>
      <HomepageBody />
    </React.Fragment>
  );
}

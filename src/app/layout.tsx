import type { Metadata } from "next";
import "./globals.scss";
import { Inter, Kodchasan } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const kodchasanStandard = Kodchasan({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kodchasan-standard",
});
const kodchasanBold = Kodchasan({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-kodchasan-bold",
});

export const metadata: Metadata = {
  title: "WorryFree - Pocket CBT Aid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${kodchasanStandard.variable} ${kodchasanBold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Landiv - Build Stunning Landing Pages",
    template: "%s | Landiv",
  },
  description:
    "Create beautiful, high-converting landing pages with drag-and-drop simplicity. No coding required.",
  keywords: [
    "landing page builder",
    "page builder",
    "website builder",
    "no code",
    "drag and drop",
    "cms",
  ],
  authors: [{ name: "Landiv Team" }],
  creator: "Landiv",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Landiv",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@landiv",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}

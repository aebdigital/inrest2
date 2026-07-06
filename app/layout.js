import JsonLd from "../components/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "INREST | Opláštenia budov, hydroizolácie a klampiarska výroba",
    template: "%s | INREST",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "INREST",
    "opláštenia budov",
    "hydroizolácie",
    "strešné svetlíky",
    "klampiarska výroba",
    "Považská Bystrica",
    "ploché strechy",
    "fasádne systémy",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  category: "construction",
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: "INREST | Opláštenia budov, hydroizolácie a klampiarska výroba",
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl("/media/hero.jpg"),
        width: 1024,
        height: 768,
        alt: "Priemyselný objekt realizovaný spoločnosťou INREST",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INREST | Opláštenia budov, hydroizolácie a klampiarska výroba",
    description: siteConfig.description,
    images: [absoluteUrl("/media/hero.jpg")],
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: ["/favicon.png"],
    apple: [{ url: "/favicon.png" }],
  },
  manifest: absoluteUrl("/manifest.webmanifest"),
};

export const viewport = {
  themeColor: "#ffffff",
};

import { SiteFooter } from "@/components/site-footer";
import { CookieCompliance } from "@/components/cookie-compliance";

export default function RootLayout({ children }) {
  return (
    <html lang="sk">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <JsonLd />
        {children}
        <CookieCompliance />
        <SiteFooter />
      </body>
    </html>
  );
}

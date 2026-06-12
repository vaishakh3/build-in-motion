import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Build in Motion | AI Build Sprint Inside Kochi Metro",
  description:
    "Build in Motion is a Codex Community Kochi AI build sprint inside an exclusive after-hours Kochi Metro train, followed by demos and judging at Vyttila.",
  openGraph: {
    title: "Build in Motion",
    description: "100 builders. One exclusive metro. Two hours to build with AI.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build in Motion",
    description: "100 builders. One exclusive metro. Two hours to build with AI.",
  },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Build in Motion",
  description:
    "An after-hours AI build sprint inside an exclusive Kochi Metro train, organized by Codex Community Kochi in collaboration with Kochi Metro Rail Limited. Details subject to final confirmation.",
  startDate: "2026-07-18T21:30:00+05:30",
  endDate: "2026-07-19T05:00:00+05:30",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Vyttila Metro Station (venue subject to confirmation)",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kochi",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Codex Community Kochi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${grotesk.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="noise min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
        {children}
      </body>
    </html>
  );
}

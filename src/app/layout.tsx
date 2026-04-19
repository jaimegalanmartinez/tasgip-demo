import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import LayoutShell from "../components/LayoutShell";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://demo.tasgip.eu"),
  title: {
    default: "Tasgip",
    template: "%s · Tasgip",
  },
  description: "One task, any team. Cross-team task management without duplication.",
  manifest: "/site.webmanifest",
  applicationName: "Tasgip",
  openGraph: {
    type: "website",
    url: "https://demo.tasgip.eu",
    siteName: "Tasgip",
    title: "Tasgip — One task, any team",
    description: "No more duplicating tickets across boards. Drag tasks freely across team backlogs and states.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasgip — One task, any team",
    description: "No more duplicating tickets across boards. Drag tasks freely across team backlogs and states.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://demo.tasgip.eu",
  },
  verification: {
    google: "bJMXEzJg9RE77LJT2gpEtU37Z5QrDZW6EYu20j-KWSA",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex bg-gray-50 dark:bg-gray-900">
        <LayoutShell>{children}</LayoutShell>
        <Analytics />
        <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}

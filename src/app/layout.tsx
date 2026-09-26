import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { PlanProvider } from "@/context/plan-context";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const description =
  "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.";

// Prefer the stable production domain over VERCEL_URL, which points at the
// current deployment's unique hostname and redirects instead of serving
// assets directly (breaks Open Graph/Twitter image previews).
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FitLog — Workout Library",
    template: "%s — FitLog",
  },
  description,
  openGraph: {
    title: "FitLog — Workout Library",
    description,
    type: "website",
    images: ["/banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "FitLog — Workout Library",
    description,
    images: ["/banner.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg font-sans text-white">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: "#1a1a1e",
                color: "#ffffff",
                border: "1px solid #262629",
              },
              iconTheme: {
                primary: "#ccff00",
                secondary: "#0a0a0b",
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
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

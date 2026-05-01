import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const poppins = Poppins({
  subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"], variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Sreenidhi Deccan Little Stars Academy",
    template: "%s | Sreenidhi Deccan Little Stars Academy",
  },
  description: "Official website of Sreenidhi Deccan Little Stars Academy.",
  icons: {
    icon: "/lssa-logo.png",
    shortcut: "/lssa-logo.png",
    apple: "/lssa-logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased bg-slate-50 text-slate-900 flex flex-col min-h-screen`}>
        <Navigation />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

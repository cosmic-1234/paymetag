import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-mulish",
});

export const metadata: Metadata = {
  title: "DeshBoard | NRI Wealth Command Center",
  description: "Unified view of your bank accounts, properties, mutual funds, and taxes in India.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mulish.variable}>
      <body className="min-h-screen bg-[#F4F7F8] text-[#001535] font-sans antialiased">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

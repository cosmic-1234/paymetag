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
  title: "DeshVault | NRI Financial Portal",
  description: "Unified view of your bank accounts, properties, mutual funds, and taxes in India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mulish.variable}>
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

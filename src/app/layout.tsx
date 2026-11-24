import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "Consulta el clima actual",
  description: "Applicacion meteorologica con next.js y OpenWeatherMap",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />
        <Navbar />
        <main className="main-container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

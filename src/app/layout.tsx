import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import Head from "next/head";
import { LanguageProvider } from "./components/context/LanguageContext";
import LanguageSwitcher from "./components/context/LanguageSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barretto Transfer",
  description: "Tours y Transporte",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <Head>
        <link rel="icon" href="/icon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <Navbar />
          <LanguageSwitcher />
          <div className="h-screen opacity-100 mb-5">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}

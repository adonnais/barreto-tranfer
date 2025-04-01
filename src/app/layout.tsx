import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import { LanguageProvider } from "./components/context/LanguageContext";
import LanguageSwitcher from "./components/context/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Barretto Transfer",
  description: "Tours y Transporte",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/icons.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap" rel="stylesheet" />

      </head>
      <body className="antialiased">
        <LanguageProvider>
          {/* Barra superior con el botón de cambio de idioma */}
          <div className="w-full h-[15px] bg-white flex justify-end items-center px-4 py-1 z-50">
            <LanguageSwitcher />
          </div>
          <Navbar />
          <main className="h-screen opacity-100 mb-5">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}

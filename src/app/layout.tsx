import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Poiret_One } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";


// Configurar las fuentes
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-roboto" });
const poiretOne = Poiret_One({ weight: "400", subsets: ["latin"], variable: "--font-poiret-one" });

export const metadata: Metadata = {
  title: "Barretto Transfer",
  description: "Tours y Transporte",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="es" className={`${roboto.variable} ${poiretOne.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/icons.png" />
      </head>
      <body className="antialiased">
         <Navbar />
          <main className="h-screen opacity-100 mb-5">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;

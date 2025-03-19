/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Habilita la exportación estática
  reactStrictMode: true, // Modo estricto para detectar errores en desarrollo
  images: {
    unoptimized: true, // Necesario para exportar imágenes sin optimización en modo estático
    domains: ["dl.dropboxusercontent.com"], // Permite imágenes desde Dropbox
  },
};

module.exports = nextConfig;

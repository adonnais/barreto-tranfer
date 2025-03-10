/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Habilita el modo estricto para detectar errores en desarrollo
  images: {
    domains: ["dl.dropboxusercontent.com"], // Permite imágenes desde Dropbox
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Exportación estática para hosting sin servidor
  reactStrictMode: true, // Activa el modo estricto de React

  images: {
    unoptimized: true, // Permite exportar imágenes sin optimización
    domains: ["dl.dropboxusercontent.com"], // Permite imágenes desde Dropbox
  },

  experimental: {
    turbo: false, // Desactiva TurboPack si causa problemas
  },

  trailingSlash: true, // Agrega "/" al final de las rutas (útil para Firebase Hosting)
};

module.exports = nextConfig;

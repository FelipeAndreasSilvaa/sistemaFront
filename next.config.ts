/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',            // Seu backend local
      'res.cloudinary.com',   // domínio padrão do Cloudinary
      // adicione aqui outros domínios se usar mais serviços externos
    ],
  },
};

module.exports = nextConfig;

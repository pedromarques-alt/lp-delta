/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Permite abrir o servidor de dev através de túneis (port forwarding do VS Code, ngrok, Cloudflare).
  allowedDevOrigins: ["**.devtunnels.ms", "**.ngrok-free.app", "**.trycloudflare.com"],
};
export default nextConfig;

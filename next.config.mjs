import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/constants/env");

const isDev = process.argv.indexOf("dev") !== -1;
const isBuild = process.argv.indexOf("build") !== -1;

if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1";
  const { build } = await import("velite");
  await build({ watch: isDev, clean: !isDev });
}

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  redirects: async () => {
    return [
      {
        source: "/resume",
        destination:
          "https://github.com/Sanskargupta0/Sanskargupta0/raw/main/Sanskar-Gupta.pdf",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/Sanskargupta0/",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/SanskarGupta0",
        permanent: true,
      },
      {
        source: "/support",
        destination: "https://buymeacoffee.com/SanskarGupta0",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/Sanskar362002/",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "https://x.com/Sanskar362002",
        permanent: true,
      },
      {
        source: "/youtube",
        destination: "https://www.youtube.com/@sanskargupta9454",
        permanent: true,
      },
      {
        source: "/x",
        destination: "https://www.x.com/Sanskar362002",
        permanent: true,
      },
      {
        source: "/peerlist",
        destination: "https://peerlist.io/sanskargupta0",
        permanent: true,
      },
      {
        source: "/discord",
        destination: "https://discord.com/users/Sanskargupta0",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import { ConfigProps } from "./types/config";

export const config = {
  appName: "Hi I'm Sanskar",
  appDesignation: "Software Developer",
  appDescription: `Hi, I'm Sanskar. I'm funny.`,

  domainName: "sanskargupta.dev",

  colors: {
    theme: "dark",
    main: "#000000",
  },

  social: {
    github: "https://github.com/Sanskargupta0",
    linkedin: "https://www.linkedin.com/in/Sanskargupta0/",
    instagram: "https://www.instagram.com/Sanskar362002/",
    discord: "https://discordapp.com/users/sanskargupta0",
    email: "Sanskar362002@gmail.com",
    phone: "+919169444674",
    youtube: "https://www.youtube.com/@sanskargupta9454",
    twitter: "https://x.com/Sanskar362002",
    buymeacoffee: "https://buymeacoffee.com/sanskargupta0",
  },

  auth: {
    loginUrl: "/api/auth/signin",
    callbackUrl: "/dashboard",
  },
} as ConfigProps;

export default config;

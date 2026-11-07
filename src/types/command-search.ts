export type CommandSearchEntry = {
  id: string;
  group: "Navigation" | "Projects" | "Articles" | "Actions";
  title: string;
  description: string;
  href?: string;
  keywords?: string;
};

import { posts } from "#site/content";
import projects from "~/components/project/_project-mock";
import type { CommandSearchEntry } from "~/types/command-search";

// Only searchable metadata crosses the client boundary, never article bodies or images.
export function getCommandSearchEntries(): CommandSearchEntry[] {
  return [
    ...[
      ["Home", "/", "Overview and recent work"],
      ["About", "/#about", "Background and software development experience"],
      ["Projects", "/projects", "Browse projects and live demos"],
      ["Blog", "/blog", "Read all articles"],
      ["Resume", "/resume", "View and download my professional resume"],
      ["Topics", "/tags", "Browse articles by topic"],
      ["Contact", "/#contact", "Get in touch"],
    ].map(([title, href, description]) => ({
      id: "nav-" + title.toLowerCase(),
      group: "Navigation" as const,
      title: "Go to " + title,
      description,
      href,
    })),
    ...projects.map((project, index) => ({
      id: "project-" + index,
      group: "Projects" as const,
      title: project.title,
      description: project.description,
      keywords: project.stacks.join(" "),
      href: "/projects?search=" + encodeURIComponent(project.title),
    })),
    ...posts
      .filter((post) => post.published && post.slugAsParams.startsWith("en/"))
      .map((post) => ({
        id: "article-" + post.slugAsParams,
        group: "Articles" as const,
        title: post.title,
        description: post.description,
        keywords: post.tags.join(" "),
        href: "/blog/" + post.slugAsParams,
      })),
  ];
}

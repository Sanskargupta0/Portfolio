import projects from "~/components/project/_project-mock";
import { getProjectHref } from "~/lib/project-links";
import { posts } from "#site/content";
import { slug } from "github-slugger";
import { MetadataRoute } from "next";
import { BasePath } from "~/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedPosts = posts.filter((post) => post.published);
  const blogPosts = publishedPosts.map((post) => ({
    url: BasePath(`/blog/${post.slugAsParams}`),
    lastModified: post.updatedAt ?? post.importedAt ?? post.date,
  }));
  const tagPages = Array.from(
    new Set(publishedPosts.flatMap((post) => post.tags.map((tag) => slug(tag))))
  ).map((tag) => ({ url: BasePath(`/tags/${tag}`) }));

  return [
    ...["", "/blog", "/projects", "/tags", "/resume"].map((path) => ({ url: BasePath(path) })),
    ...projects.map((project) => ({ url: BasePath(getProjectHref(project.title)) })),
    ...blogPosts,
    ...tagPages,
  ];
}

import { posts } from "#site/content";
import { notFound } from "next/navigation";
import { JsonSchemaLD } from "~/components/post";
import { getSEOTags } from "~/lib/seo";
import "~/styles/mdx.css";
import BlogDetailClient from "./blog-detail-client";

interface BlogPostParams {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: BlogPostParams["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  if (post === undefined || !post.published) {
    return notFound();
  }

  return post;
}

export async function generateStaticParams(): Promise<BlogPostParams["params"][]> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export async function generateMetadata({ params }: BlogPostParams) {
  const post = await getPostFromParams(params);

  return getSEOTags({
    title: post.title,
    description: post.description,
    keywords: post.tags.map((tag) => tag.replaceAll("-", " ")),
    canonicalUrlRelative: `/blog/${post.slugAsParams}`,
    extraTags: {
      openGraph: {
        title: post.title,
        description: post.description,
        url: `/blog/${post.slugAsParams}`,
        images: [
          {
            url: post.cover.src,
            width: 1200,
            height: 660,
          },
        ],
        locale: "en_US",
        type: "article",
        publishedTime: post.originalPublishedAt ?? post.date,
        modifiedTime: post.updatedAt ?? post.importedAt ?? post.date,
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: [post.cover.src],
      },
    },
  });
}

export default async function BlogDetail({ params }: BlogPostParams) {
  const post = await getPostFromParams(params);

  return (
    <>
      <JsonSchemaLD post={post} />
      <BlogDetailClient post={post} />
    </>
  );
}

"use client";

import type { Post } from "#site/content";
import { useMemo } from "react";
import Link from "next/link";
import { PostList } from "~/components/post";

export default function TagDetailClient({ posts, title }: { posts: Post[]; title: string }) {
  const displayPosts = useMemo(() => posts
    .filter((post) => post.published && post.slugAsParams.startsWith("en/"))
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date)), [posts]);

  return (
    <div className="!mt-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-medium">{title}</h1>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Browse articles, guides, and practical examples about {title.toLowerCase()}.
      </p>
      <PostList posts={displayPosts} />
      <p className="mt-6 text-sm text-muted-foreground">
        <Link href="/tags" className="underline underline-offset-4">
          Browse all topics
        </Link>{" "}
        or{" "}
        <Link href="/blog" className="underline underline-offset-4">
          view all articles
        </Link>
        .
      </p>
    </div>
  );
}

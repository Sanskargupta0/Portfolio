import TagsPageClient from "./tags-page-client";
import { getSEOTags } from "~/lib/seo";

export const metadata = getSEOTags({
  title: "Software Development Topics | Sanskar Gupta",
  description:
    "Browse articles by topic, including Next.js, JavaScript, Go, Python, AI, cybersecurity, web performance, and software engineering careers.",
  canonicalUrlRelative: "/tags",
});

export default function TagsPage() {
  return <TagsPageClient />;
}

import { posts } from "#site/content";
import { notFound, permanentRedirect } from "next/navigation";
import { getPostsByTagSlug } from "~/lib/utils";
import { getSEOTags } from "~/lib/seo";
import TagDetailClient from "./tag-detail-client";

const labels: Record<string, string> = {
  nextjs: "Next.js",
  nodejs: "Node.js",
  golang: "Go",
  cpython: "CPython",
  gpt4all: "GPT4All",
  tensorflowjs: "TensorFlow.js",
  "ui-design": "UI Design",
  "ux-design": "UX Design",
  "ai-coding-tools": "AI Coding Tools",
  "local-llm": "Local LLMs",
  "cpu-inference": "CPU Inference",
  "api-security": "API Security",
  "ai-agents": "AI Agents",
  "ai-in-education": "AI in Education",
};

const legacyTags: Record<string, string> = {
  ai: "artificial-intelligence",
  ml: "machine-learning",
  webdev: "web-development",
  frontend: "frontend-development",
  development: "software-engineering",
  performance: "web-performance",
  design: "ui-design",
  education: "educational-technology",
  fullstack: "full-stack-development",
  tensorflow: "tensorflowjs",
  llm: "local-llm",
  security: "cybersecurity",
  cdn: "content-delivery-networks",
  "static-site-generator": "static-site-generation",
  personal: "sports-commentary",
  learning: "learning-to-code",
  architecture: "software-architecture",
  story: "short-stories",
  tools: "browser-ai",
  opinion: "sports-commentary",
  internals: "cpython",
  meta: "segment-anything",
  sam: "segment-anything",
  cpu: "cpu-inference",
  "local-ai": "local-llm",
  tutorial: "local-llm",
  humor: "short-stories",
};

function getTag(encodedTag: string) {
  let tag: string;
  try {
    tag = decodeURIComponent(encodedTag).normalize("NFC");
  } catch {
    notFound();
  }
  if (Object.prototype.hasOwnProperty.call(legacyTags, tag)) {
    permanentRedirect(`/tags/${legacyTags[tag]}`);
  }
  const matching = getPostsByTagSlug(
    posts.filter((post) => post.published),
    tag
  );
  if (!matching.length) notFound();
  const label =
    labels[tag] ?? tag.replaceAll("-", " ").replace(/^./, (letter) => letter.toUpperCase());
  return { matching, label };
}

export function generateMetadata({ params }: { params: { tag: string } }) {
  const { label } = getTag(params.tag);
  return getSEOTags({
    title: `${label} Articles | Sanskar Gupta`,
    description: `Explore articles, guides, and practical examples about ${label.toLowerCase()}. Browse related posts on Sanskar Gupta's blog.`,
    keywords: [label],
    canonicalUrlRelative: `/tags/${params.tag}`,
  });
}

export default function TagDetailPage({ params }: { params: { tag: string } }) {
  const { matching, label } = getTag(params.tag);
  return <TagDetailClient posts={matching} title={label} />;
}

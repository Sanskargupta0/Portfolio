import { Post } from "#site/content";
import { Calendar, Timer } from "lucide-react";
import React from "react";
import { cn, formatDate } from "~/lib/utils";
import PostViews from "./post-views";

interface PostMetaProps {
  title: string;
  date: string;
  dateType?: "published" | "editorial";
  metadata: Post["metadata"];
  isDetailPage?: boolean;
  slug?: string;
}
const PostMetadata: React.FC<PostMetaProps> = ({
  title,
  date,
  dateType = "published",
  metadata,
  isDetailPage,
  slug,
}) => {
  const Title = isDetailPage ? "h1" : "h3";
  const dateLabel = dateType === "editorial" ? "Editorial date" : "Published on";
  return (
    <hgroup className={cn("space-y-2 p-0", { "p-0": isDetailPage })}>
      <Title
        className={cn(`font-ubuntu text-lg transition-colors group-hover:text-ring`, {
          "text-xl font-semibold": isDetailPage,
        })}
      >
        {title}
      </Title>

      <div
        className={cn("flex items-center gap-2", {
          "flex-wrap justify-between": isDetailPage,
        })}
      >
        <dl>
          <dt className="sr-only">{dateLabel}</dt>
          <dd
            className={cn("flex items-center gap-1 text-xs text-muted-foreground", {
              "block gap-2 text-sm": isDetailPage,
            })}
          >
            {isDetailPage ? (
              <span>{dateLabel} </span>
            ) : (
              <Calendar className={cn("size-3", { "size-4": isDetailPage })} aria-hidden="true" />
            )}
            <time dateTime={date} aria-label={`${dateLabel} ${formatDate(date)}`}>
              {formatDate(date)}
            </time>
          </dd>
        </dl>

        <div className="flex items-center gap-3">
          {isDetailPage && <PostViews slug={slug!} />}
          <dl>
            <dt className="sr-only">Reading time</dt>
            <dd
              className={cn("flex items-center gap-1 text-xs text-muted-foreground", {
                "gap-1 text-sm": isDetailPage,
              })}
            >
              <Timer className={cn("size-3", { "size-4": isDetailPage })} aria-hidden="true" />
              <span>{metadata.readingTime} min read</span>
            </dd>
          </dl>
        </div>
      </div>
    </hgroup>
  );
};

export default PostMetadata;

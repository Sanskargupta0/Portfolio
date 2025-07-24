import Image from "next/image";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { cn } from "~/lib/utils";
import { CustomLink } from "../mdx";
import { typo } from "../ui/typograpghy";
import { TProject } from "./_project-mock";

type ProjectItemProps = {} & TProject;

const linkClass = "!p-0 h-full hover:!text-[#25dde5] !flex items-center gap-2 !text-sm !text-ring";

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  description,
  deployedURL,
  cover,
  stacks,
  categories,
  isRepo,
  repoUrl,
}) => {
  return (
    <li role="listitem">
      <div className="grid gap-4 rounded-md">
        <div className="relative aspect-video">
          <Image
            alt={`${title} not found`}
            priority
            placeholder="blur"
            src={cover}
            className="size-full rounded-md"
          />
        </div>

        <hgroup className="space-y-2 sm:space-y-1">
          <h2 className="font-ubuntu text-base font-medium">{title}</h2>

          <div className="space-y-2">
            <p className={"text-xs text-ring"} aria-label="project stacks">
              {stacks.join(" / ")}
            </p>
            
            <div className="flex flex-wrap gap-1" aria-label="project categories">
              {categories.map((category) => (
                <span
                  key={category}
                  className="px-2 py-0.5 text-xs rounded-full bg-accent text-accent-foreground capitalize"
                >
                  {category.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>

          <p className={cn(typo({ variant: "paragraph", size: "sm" }), "!mt-4 line-clamp-2")}>
            {description}
          </p>

          <div className="!mt-2 flex items-center gap-4">
            {deployedURL && (
              <CustomLink
                aria-label={`visit ${title} live URL}`}
                href={deployedURL}
                className={linkClass}
              >
                <FaExternalLinkAlt size={12} />
                <span> Live Preview</span>
              </CustomLink>
            )}

            {isRepo && (
              <CustomLink
                aria-label={`visit ${title} Github Repo`}
                href={repoUrl as string}
                className={linkClass}
              >
                <FaGithub />
                <span> Repo Url</span>
              </CustomLink>
            )}
          </div>
        </hgroup>
      </div>
    </li>
  );
};
export default ProjectItem;

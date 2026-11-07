import ResumePreview from "~/components/resume-preview";
import { Download, ExternalLink } from "lucide-react";
import { buttonVariants } from "~/components/ui/button";
import { resumeConfig } from "~/constants/resume";
import { getSEOTags } from "~/lib/seo";

export const metadata = getSEOTags({
  title: "Resume | Sanskar Gupta",
  description:
    "View and download Sanskar Gupta's resume, including software development experience, projects, and technical skills.",
  canonicalUrlRelative: "/resume",
});

export default function ResumePage() {
  return (
    <section className="py-16" aria-labelledby="resume-title">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 id="resume-title" className="text-2xl font-semibold tracking-tight">
            Resume
          </h1>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-2 text-base text-muted-foreground">
            <a
              href={resumeConfig.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View resume PDF in a new tab"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "h-8 gap-1.5 shadow-sm",
              })}
            >
              <ExternalLink aria-hidden="true" className="size-3.5" />
              View
            </a>
            <span>and</span>
            <a
              href={resumeConfig.downloadUrl}
              download={resumeConfig.filename}
              aria-label="Download resume PDF"
              className={buttonVariants({
                variant: "default",
                size: "sm",
                className: "h-8 gap-1.5 shadow-sm",
              })}
            >
              <Download aria-hidden="true" className="size-3.5" />
              Download
            </a>
            <span>my professional resume.</span>
          </p>
        </div>
        <hr className="border-border" />
        <div className="mx-auto max-w-2xl space-y-3">
          <ResumePreview />
          <p className="text-center text-sm text-muted-foreground">
            If the preview is unavailable, open or download the PDF above.
          </p>
        </div>
      </div>
    </section>
  );
}

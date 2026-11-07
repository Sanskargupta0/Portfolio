"use client";

import dynamic from "next/dynamic";

const ResumePdfViewer = dynamic(() => import("./resume-pdf-viewer"), {
  ssr: false,
  loading: () => (
    <p
      role="status"
      className="flex min-h-80 items-center justify-center text-sm text-muted-foreground"
    >
      Loading resume preview...
    </p>
  ),
});

export default function ResumePreview() {
  return <ResumePdfViewer />;
}

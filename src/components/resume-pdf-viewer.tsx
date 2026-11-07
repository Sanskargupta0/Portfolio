"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Maximize, Minus, Plus, RotateCw } from "lucide-react";
import { resumeConfig } from "~/constants/resume";
import { buttonVariants } from "~/components/ui/button";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

const pdfOptions = {
  cMapUrl: "/pdfjs/cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "/pdfjs/standard_fonts/",
  wasmUrl: "/pdfjs/wasm/",
};

export default function ResumePdfViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pages, setPages] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setWidth(Math.max(1, Math.floor(entry.contentRect.width)));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const toolClass = buttonVariants({
    variant: "ghost",
    size: "icon",
    className: "size-9 shrink-0",
  });
  const loading = (
    <p
      role="status"
      className="flex min-h-80 items-center justify-center text-sm text-muted-foreground"
    >
      Loading resume preview...
    </p>
  );

  return (
    <div
      className="min-w-0 overflow-hidden rounded-lg border border-border bg-muted/30"
      aria-label="Resume PDF preview"
    >
      <div
        className="flex flex-wrap items-center justify-between gap-1 border-b border-border bg-background px-2 py-1.5"
        role="toolbar"
        aria-label="Resume preview controls"
      >
        <span className="px-2 text-xs text-muted-foreground">
          {pages ? `${pages} ${pages === 1 ? "page" : "pages"}` : "Resume"}
        </span>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            aria-label="Zoom out"
            title="Zoom out"
            className={toolClass}
            disabled={!pages || failed || zoom <= 0.5}
            onClick={() =>
              setZoom((value) => Math.max(0.5, Math.round((value - 0.25) * 100) / 100))
            }
          >
            <Minus size={16} />
          </button>
          <span className="min-w-12 text-center font-mono text-xs tabular-nums" aria-live="polite">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            aria-label="Zoom in"
            title="Zoom in"
            className={toolClass}
            disabled={!pages || failed || zoom >= 2}
            onClick={() => setZoom((value) => Math.min(2, Math.round((value + 0.25) * 100) / 100))}
          >
            <Plus size={16} />
          </button>
          <button
            type="button"
            aria-label="Fit resume to width"
            title="Fit to width"
            className={toolClass}
            disabled={!pages || failed}
            onClick={() => setZoom(1)}
          >
            <Maximize size={16} />
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="w-full min-w-0 overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="Resume pages. Scroll horizontally when zoomed in."
      >
        {width > 0 && (
          <Document
            key={attempt}
            file={resumeConfig.previewUrl}
            options={pdfOptions}
            loading={loading}
            onLoadSuccess={({ numPages }) => {
              setPages(numPages);
              setFailed(false);
            }}
            onLoadError={() => setFailed(true)}
            externalLinkTarget="_blank"
            externalLinkRel="noopener noreferrer"
            error={
              <div
                role="alert"
                className="flex min-h-80 flex-col items-center justify-center gap-3 px-5 text-center text-sm text-muted-foreground"
              >
                <p>The resume preview could not load. Try again or use View above.</p>
                <button
                  type="button"
                  className={buttonVariants({ variant: "outline", size: "sm", className: "gap-2" })}
                  onClick={() => {
                    setFailed(false);
                    setPages(0);
                    setAttempt((value) => value + 1);
                  }}
                >
                  <RotateCw size={14} />
                  Retry preview
                </button>
              </div>
            }
            className="space-y-3"
          >
            {Array.from({ length: pages }, (_, index) => (
              <Page
                key={index + 1}
                pageNumber={index + 1}
                width={Math.max(1, Math.floor(width * zoom))}
                devicePixelRatio={Math.min(
                  typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
                  2
                )}
                canvasBackground="white"
                loading={loading}
                error={
                  <p role="alert" className="p-6 text-sm text-muted-foreground">
                    This page could not render. Use View above to open the resume.
                  </p>
                }
                className="mx-auto w-fit bg-white text-black shadow-sm"
              />
            ))}
          </Document>
        )}
      </div>
    </div>
  );
}

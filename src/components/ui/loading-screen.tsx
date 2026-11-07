"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

function LoadingOverlay() {
  const video = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    const rootOverflow = root.style.overflow;
    const bodyOverflow = document.body.style.overflow;
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      root.style.overflow = rootOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, []);

  useEffect(() => {
    if (!video.current) return;
    video.current.currentTime = 0;
    if (reducedMotion) video.current.pause();
    else void video.current.play().catch(() => {});
  }, [reducedMotion]);

  return (
    <motion.div
      data-site-loader=""
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]"
      initial={false}
      exit={{ y: reducedMotion ? 0 : "-100%", opacity: reducedMotion ? 0 : 1 }}
      transition={{ duration: reducedMotion ? 0 : 1.1, ease: [0.76, 0, 0.24, 1] }}
    >
      <video
        ref={video}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="w-64 max-w-[80vw] motion-reduce:hidden"
      >
        <source src="/loader.mp4" type="video/mp4" />
      </video>
      <span className="sr-only">Loading page</span>
    </motion.div>
  );
}

// Root provider stays mounted across routes, so this runs once per document load.
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => setVisible(false), reducedMotion ? 0 : 2725);
    return () => clearTimeout(timer);
  }, []);
  return <AnimatePresence>{visible && <LoadingOverlay key="site-loader" />}</AnimatePresence>;
}

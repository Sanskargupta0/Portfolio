"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MapPin, Timer } from "lucide-react";
import { profileLocation, profileTitles } from "~/constants/profile";

export default function ProfileHeadline() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setIndex(0);
      return;
    }
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % profileTitles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  return (
    <div data-profile-headline="">
      <span className="sr-only">{profileTitles.join(", ")}</span>
      <div aria-hidden="true" className="mt-1 h-5 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={index}
            initial={{ y: reducedMotion ? 0 : 12, opacity: reducedMotion ? 1 : 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reducedMotion ? 0 : -12, opacity: reducedMotion ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
            className="whitespace-nowrap font-mono text-[13px] leading-5 text-muted-foreground"
          >
            {profileTitles[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[11px] leading-5 text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin aria-hidden="true" size={12} className="shrink-0" />
          {profileLocation}
        </span>
        <span aria-hidden="true">&middot;</span>
        <IndianTime />
      </div>
    </div>
  );
}

const indianTimeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

function IndianTime() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <span className="inline-flex items-center gap-1" title="Current time in India (IST, UTC+05:30)">
      <Timer aria-hidden="true" size={12} className="shrink-0" />
      <time
        data-indian-time
        dateTime={now?.toISOString()}
        aria-label={
          now
            ? indianTimeFormat.format(now) + " Indian Standard Time"
            : "Loading Indian Standard Time"
        }
        className="inline-block min-w-[11ch] tabular-nums"
      >
        {now ? indianTimeFormat.format(now) : "--:--:-- --"}
      </time>
    </span>
  );
}

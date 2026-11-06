"use client";

import { useEffect } from "react";
import { startOneko } from "~/lib/oneko";

export default function PetCat() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    let stop: (() => void) | undefined;
    const sync = () => {
      stop?.();
      stop = undefined;
      if (!reducedMotion.matches && finePointer.matches) stop = startOneko();
    };
    sync();
    reducedMotion.addEventListener("change", sync);
    finePointer.addEventListener("change", sync);
    return () => {
      stop?.();
      reducedMotion.removeEventListener("change", sync);
      finePointer.removeEventListener("change", sync);
    };
  }, []);
  return null;
}

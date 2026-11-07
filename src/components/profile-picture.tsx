"use client";

import { useState } from "react";
import Image from "next/image";
import { RotateCw } from "lucide-react";
import portrait from "~/assets/images/live-the-code.webp";

const pictures = [
  { src: portrait, alt: "Sanskar Gupta" },
  {
    src: "/images/profile/luffy-straw-hat.jpg",
    alt: "Monkey D. Luffy wearing his straw hat from One Piece",
  },
];

export default function ProfilePicture() {
  const [index, setIndex] = useState(0);
  const picture = pictures[index]!;

  return (
    <div className="relative aspect-square" data-profile-picture>
      <div className="absolute inset-0 -z-10 rounded-md bg-[#00adb5]" />
      <button
        type="button"
        onClick={() => setIndex((current) => (current + 1) % pictures.length)}
        aria-label="Switch profile image"
        title="Click to change profile image"
        className="group relative block size-full -rotate-3 cursor-pointer overflow-hidden rounded-md bg-background shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
      >
        <Image
          src={picture.src}
          alt={picture.alt}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 768px) 30vw, 100vw"
          className="pointer-events-none select-none object-cover"
          {...(index === 0
            ? { placeholder: "blur" as const, blurDataURL: portrait.blurDataURL, priority: true }
            : {})}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-0 transition-opacity group-hover:opacity-[0.18] motion-reduce:transition-none"
        />
        <span
          aria-hidden="true"
          className="absolute right-2 top-2 flex size-9 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-transform group-hover:rotate-12 group-focus-visible:rotate-12 motion-reduce:transform-none motion-reduce:transition-none"
        >
          <RotateCw size={15} strokeWidth={2} />
        </span>
      </button>
      <span className="sr-only" role="status">
        {picture.alt}. Image {index + 1} of {pictures.length}.
      </span>
    </div>
  );
}

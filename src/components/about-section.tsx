"use client";

import { cn } from "~/lib/utils";
import { typo } from "./ui/typograpghy";
import Image from "next/image";
import livethecode from "~/assets/images/live-the-code.webp";
// import { annotationsConfig } from "~/constants/anime";

const AboutSection = () => {

  return (
    <section className="grid gap-8 sm:gap-4 md:grid-cols-3" aria-label="About">
  <div className="order-2 space-y-3 sm:order-1 md:col-span-2">
    <h1 className="font-ubuntu text-lg font-semibold sm:text-xl">
      Sanskar Gupta <span className="text-italic font-normal text-[#00adb5]">aka Ayush</span>
    </h1>

    <p className={typo({ variant: "paragraph", font: "sans" })}>
      <span>Product-focused Software Developer</span> who ships fast and builds for impact. I turn ideas into <span className="text-[#00adb5]">scalable, production-ready systems</span> and obsess over the details that make software reliable, efficient, and secure.
    </p>

    <p className={typo({ variant: "paragraph", font: "sans" })}>
      Building <span className="text-[#00adb5]">PioWorker at Piovation GmbH</span>, spanning UI/UX, backend connectors, and code execution; automated QA with <span className="text-[#00adb5]">Playwright, Jenkins, and Grafana</span>, cutting manual testing by <span className="text-[#00adb5]">~90%</span>.
    </p>

    <p className={typo({ variant: "paragraph", font: "sans" })}>
      Built <span className="text-[#00adb5]">Electronicx GmbH's</span> return automation handling <span className="text-[#00adb5]">€520K+ across 5,000+ returns</span>, saving <span className="text-[#00adb5]">2,000+ staff hours</span>. Previously developed <span className="text-[#00adb5]">Studdy-Buddy</span> using <span className="text-[#00adb5]">Gemini AI and RAG</span>, and <span className="text-[#00adb5]">AptiDude's MERN examination platform</span> with real-time anti-cheating detection.
    </p>

    <p className={typo({ variant: "paragraph", font: "sans" })}>
      <span className="text-[#00adb5]">3+ years</span> building. <span className="text-[#00adb5]">30+ freelance products</span> shipped. I don't chase trends - I build systems that work.
      <span className="text-[#00adb5]"> 0 → 1 → 100.</span> Head down, code up, goal clear.
    </p>

    <p className={cn(typo({ variant: "paragraph", font: "sans" }), "sm:!mt-4")}>
      <span className="text-[#00adb5]">Open to Work:</span> Full-Time, Freelance, or Collabs.{" "}
      <a
        href="#contact"
        aria-label="Hire Me"
        className="el-focus-styles text-ring"
      >
        Let's talk.
      </a>
    </p>
  </div>

  <div className="relative order-1 block aspect-square sm:order-2 sm:hidden md:block">
    <div className="absolute inset-0 -z-10 size-full rounded-md bg-[#00adb5]"></div>
    <Image
      alt="Presenting a project at a tech event"
      src={livethecode}
      placeholder="blur"
      className="size-full -rotate-3 transform rounded-md shadow-md"
      priority
    />
  </div>
</section>

  );
};

export default AboutSection;

"use client";

import config from "~/config";
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
      <span className="text-[#00adb5]">About Me <br /></span>
      Hey there! I'm a passionate developer from Lucknow, India. I love building digital solutions and experimenting with new ideas. 
      I’ve participated in 
      <span className="text-[#00adb5]">
      &nbsp;3 hackathons&nbsp; 
      </span> 
      where I sharpened my problem-solving skills and collaborated with amazing minds.
    </p>

    <p className={typo({ variant: "paragraph", font: "sans" })}>
      <span className="text-[#00adb5]">What I do? <br /></span>
      I’ve successfully <span className="text-[#00adb5]"> delivered 10+ freelance </span> projects that solve real-world problems. 
      I'm especially interested in building tools and software that make everyday life simpler, faster, and more efficient <span className="text-[#00adb5]"> #MakeItEasier </span>. 
    </p>

    <p className={typo({ variant: "paragraph", font: "sans" })}>
      I enjoy learning new technologies, exploring open source, and constantly improving my craft. 
      <span className="text-[#00adb5]"> #BuildInPublic </span>
      Whether it's automating workflows or designing better user experiences, I strive to build with purpose.
    </p>

    <p className={cn(typo({ variant: "paragraph", font: "sans" }), "sm:!mt-4")}>
      I’m <span className="text-[#00adb5]">open to work</span>, freelance, or collaborate on exciting projects.{" "}
      <a
        href={`mailto:${config.social.email}`}
        aria-label="Hire Me"
        className="el-focus-styles text-ring"
      >
        Contact Me.
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

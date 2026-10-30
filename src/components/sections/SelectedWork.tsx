"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const projectLayouts = [
  "md:col-span-5",
  "md:col-span-7 md:col-start-6",
  "md:col-span-6 md:col-start-1",
  "md:col-span-6 md:col-start-7",
  "md:col-span-8 md:col-start-3",
];

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".work-header-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-header",
          start: "top 85%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".work-item").forEach((item) => {
        const image = item.querySelector(".work-image-wrap");
        const meta = item.querySelector(".work-meta");

        gsap.from(image, {
          clipPath: "inset(100% 0 0 0)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
        });

        gsap.from(meta, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="work-header panel-glass mb-12 flex flex-col gap-6 p-5 sm:mb-16 sm:p-8 md:mb-24 md:flex-row md:items-end md:justify-between md:p-10">
          <div>
            <p className="mb-3 font-display text-[10px] uppercase tracking-[0.35em] text-accent">
              Selected work
            </p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase leading-none tracking-tight">
              Projects I&apos;ve
              <br />
              built
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Hover cards for stack tags and motion. CRM platforms, product
            frontends, and property websites — shipped with React & Next.js.
          </p>
        </div>
        <div className="work-header-line mb-16 h-px w-full origin-left bg-border md:mb-20" />

        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-x-8 md:gap-y-20">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className={`work-item ${project.offset} ${projectLayouts[index] ?? "md:col-span-6"}`}
            >
              <ProjectCard
                title={project.title}
                category={project.category}
                year={project.year}
                image={project.image}
                aspect={project.aspect}
                index={index}
                tags={project.tags}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

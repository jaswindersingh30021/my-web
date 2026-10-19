"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

function SkillPreview({ active }: { active: number }) {
  const current = skills[active];

  return (
    <div className="skill-preview panel-glass mt-6 p-5 sm:p-6 md:mt-8">
      <p className="font-display text-4xl font-bold text-accent/90 sm:text-5xl">
        {current.index}
      </p>
      <h3 className="mt-3 font-display text-xl uppercase tracking-tight sm:text-2xl">
        {current.title}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        {current.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {current.tags.map((tag) => (
          <span
            key={tag}
            className="border border-accent/25 bg-accent/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 h-1 overflow-hidden bg-border">
        <div
          className="h-full bg-accent transition-all duration-500 ease-out"
          style={{
            width: `${((active + 1) / skills.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".skills-title", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".skill-row", {
        y: 32,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".skill-list",
          start: "top 90%",
          once: true,
        },
        clearProps: "opacity,transform",
      });

      gsap.from(".skill-preview", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".skill-preview",
          start: "top 92%",
          once: true,
        },
        clearProps: "opacity,transform",
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10 border-t border-border px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
          <p className="mb-3 font-display text-[10px] uppercase tracking-[0.35em] text-accent">
            Skills
          </p>
          <h2 className="skills-title font-display text-[clamp(2.25rem,5vw,4rem)] font-bold uppercase leading-none tracking-tight">
            Tools I
            <br />
            work with
          </h2>

          <div className="hidden md:block">
            <SkillPreview active={active} />
          </div>
        </div>

        <div className="skill-list md:col-span-8">
          <div className="mb-6 md:hidden">
            <SkillPreview active={active} />
          </div>

          {skills.map((skill, index) => {
            const isActive = active === index;
            return (
              <button
                key={skill.index}
                type="button"
                className={`skill-row group relative w-full overflow-hidden border-t border-border py-6 text-left opacity-100 transition-all duration-500 sm:py-7 md:py-9 ${
                  isActive
                    ? "border-accent/40 bg-surface-elevated/40 md:pl-4"
                    : "hover:border-accent/25 md:hover:pl-2"
                }`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                data-cursor="hover"
              >
                <span
                  className={`absolute top-0 left-0 h-full w-[3px] origin-top bg-accent transition-transform duration-500 ${
                    isActive ? "scale-y-100" : "scale-y-0"
                  }`}
                  aria-hidden
                />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="flex min-w-0 items-baseline gap-3 sm:gap-4 md:gap-8">
                    <span
                      className={`shrink-0 font-display text-xs transition-colors ${
                        isActive ? "text-accent" : "text-muted"
                      }`}
                    >
                      {skill.index}
                    </span>
                    <h3
                      className={`font-display text-base uppercase tracking-tight transition-colors sm:text-lg md:text-3xl ${
                        isActive ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {skill.title}
                    </h3>
                  </div>
                  <span
                    className={`hidden max-w-xs text-right text-sm leading-relaxed transition-opacity md:block ${
                      isActive ? "text-foreground opacity-100" : "text-muted opacity-40"
                    }`}
                  >
                    {skill.description}
                  </span>
                </div>
                <p
                  className={`mt-3 text-sm leading-relaxed md:hidden ${
                    isActive ? "text-foreground" : "text-muted"
                  }`}
                >
                  {skill.description}
                </p>
              </button>
            );
          })}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}

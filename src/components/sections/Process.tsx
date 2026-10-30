"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step, i) => {
        gsap.from(step, {
          x: i % 2 === 0 ? -40 : 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
          },
        });
      });

      gsap.to(".process-progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const current = processSteps[active];

  return (
    <section
      ref={sectionRef}
      className="border-t border-border px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="mb-3 font-display text-[10px] uppercase tracking-[0.35em] text-accent">
              Process
            </p>
            <h2
              id="process-heading"
              className="font-display text-[clamp(2.25rem,5vw,4rem)] font-bold uppercase leading-none tracking-tight"
            >
              How I work
            </h2>

            <div className="panel-glass mt-8 hidden p-6 md:sticky md:top-28 md:block">
              <p className="font-display text-sm text-accent">{current.step}</p>
              <h3 className="mt-2 font-display text-3xl uppercase tracking-tight">
                {current.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                {current.body}
              </p>
            </div>
          </div>

          <div className="relative md:col-span-7">
            <div className="absolute top-0 bottom-0 left-[11px] hidden w-px overflow-hidden bg-border md:block">
              <div className="process-progress h-full w-full origin-top scale-y-0 bg-accent" />
            </div>

            <ol className="flex flex-col gap-4">
              {processSteps.map((item, index) => {
                const isActive = active === index;
                return (
                  <li key={item.step}>
                    <button
                      type="button"
                      className={`process-step w-full border p-5 text-left transition-all duration-300 md:p-6 ${
                        isActive
                          ? "border-accent/50 bg-surface-elevated/60"
                          : "border-border bg-transparent hover:border-accent/25"
                      }`}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      data-cursor="hover"
                    >
                      <div className="grid gap-2 sm:gap-3 md:grid-cols-12 md:gap-6">
                        <div className="md:col-span-2">
                          <span
                            className={`font-display text-sm ${
                              isActive ? "text-accent" : "text-muted"
                            }`}
                          >
                            {item.step}
                          </span>
                        </div>
                        <div className="md:col-span-4">
                          <h3 className="font-display text-xl uppercase tracking-tight sm:text-2xl md:text-3xl">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-sm leading-relaxed text-muted md:col-span-6">
                          {item.body}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

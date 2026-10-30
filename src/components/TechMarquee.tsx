"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { techMarquee } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function TechMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!trackRef.current || reducedMotion) return;
    const track = trackRef.current;
    const width = track.scrollWidth / 2;

    const tween = gsap.to(track, {
      x: -width,
      duration: 28,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [reducedMotion]);

  const items = [...techMarquee, ...techMarquee];

  return (
    <section
      className="relative border-y border-border py-4 sm:py-5"
      aria-label="Technology stack"
    >
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max items-center gap-8 will-change-transform"
        >
          {items.map((item, i) => (
            <div
              key={`${item}-${i}`}
              className="flex items-center gap-8 whitespace-nowrap"
            >
              <span className="font-display text-xs uppercase tracking-[0.22em] text-foreground/90 sm:text-sm md:text-base">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

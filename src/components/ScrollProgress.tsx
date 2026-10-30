"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!barRef.current || reducedMotion) return;

    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.25,
        },
      },
    );
  }, [reducedMotion]);

  return (
    <div className="pointer-events-none fixed top-0 right-0 left-0 z-[9500] h-[2px] bg-border/50">
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-accent shadow-[0_0_18px_rgba(200,255,0,0.5)]"
      />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function AmbientBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!rootRef.current || reducedMotion) return;

    gsap.to(".ambient-orb-a", {
      x: 80,
      y: -40,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".ambient-orb-b", {
      x: -60,
      y: 50,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [reducedMotion]);

  useEffect(() => {
    if (!isDesktop || reducedMotion || !rootRef.current) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      gsap.to(".ambient-orb-a", {
        x: `+=${x * 0.02}`,
        y: `+=${y * 0.02}`,
        duration: 1.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDesktop, reducedMotion]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden opacity-80"
      aria-hidden
    >
      <div className="ambient-orb-a absolute -top-16 -left-16 h-[220px] w-[220px] rounded-full bg-accent/10 blur-[70px] sm:-top-24 sm:-left-24 sm:h-[420px] sm:w-[420px] sm:blur-[100px]" />
      <div className="ambient-orb-b absolute top-[35%] -right-16 h-[180px] w-[180px] rounded-full bg-accent/8 blur-[60px] sm:-right-32 sm:h-[360px] sm:w-[360px] sm:blur-[90px]" />
      <div className="absolute bottom-0 left-[20%] h-[280px] w-[280px] rounded-full bg-foreground/5 blur-[80px]" />
    </div>
  );
}

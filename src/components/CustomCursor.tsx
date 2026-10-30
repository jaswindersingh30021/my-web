"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isDesktop || reducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("cursor-none");

    const move = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power3.out",
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const onEnterInteractive = () => {
      gsap.to(ring, {
        scale: 2.2,
        borderColor: "rgba(200, 255, 0, 0.9)",
        duration: 0.25,
      });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onLeaveInteractive = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(242, 239, 232, 0.45)",
        duration: 0.25,
      });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const bindInteractive = () => {
      const targets = document.querySelectorAll(
        "a, button, [data-cursor='hover']",
      );
      targets.forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
      return targets;
    };

    let targets = bindInteractive();
    const observer = new MutationObserver(() => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
      targets = bindInteractive();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
      document.body.classList.remove("cursor-none");
    };
  }, [isDesktop, reducedMotion]);

  if (!isDesktop || reducedMotion) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent mix-blend-difference"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/45 mix-blend-difference"
        aria-hidden
      />
    </>
  );
}

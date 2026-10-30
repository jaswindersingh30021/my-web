"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "@/lib/data";

type PreloaderProps = {
  onComplete: () => void;
};

export function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete,
      });

      tl.from(".preloader-char", {
        y: "120%",
        rotate: 8,
        opacity: 0,
        stagger: 0.06,
        duration: 0.9,
        ease: "power4.out",
      })
        .to(
          progressRef.current,
          {
            scaleX: 1,
            duration: 1.4,
            ease: "power2.inOut",
          },
          0.2,
        )
        .to(
          counterRef.current,
          {
            innerText: 100,
            snap: { innerText: 1 },
            duration: 1.4,
            ease: "power2.inOut",
          },
          0.2,
        )
        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          delay: 0.15,
        })
        .to(
          ".preloader-panel",
          {
            yPercent: -100,
            stagger: 0.08,
            duration: 0.85,
            ease: "power4.inOut",
          },
          "-=0.75",
        );
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  const letters = "JS".split("");

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] flex flex-col bg-background text-foreground"
      role="presentation"
    >
      <div className="preloader-panel absolute inset-x-0 top-0 h-1/2 origin-bottom bg-surface" />
      <div className="preloader-panel absolute inset-x-0 bottom-0 h-1/2 origin-top bg-surface" />

      <div className="relative z-10 flex flex-1 flex-col justify-between px-6 py-8 md:px-12 md:py-10">
        <p className="font-display text-[10px] uppercase tracking-[0.35em] text-muted">
          {profile.name} — portfolio
        </p>

        <div className="overflow-hidden">
          <h1 className="font-display flex text-[clamp(4rem,18vw,11rem)] font-bold uppercase leading-[0.85] tracking-tight">
            {letters.map((char, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span className="preloader-char inline-block">{char}</span>
              </span>
            ))}
            <span className="preloader-char inline-block text-accent">.</span>
          </h1>
        </div>

        <div className="flex items-end justify-between gap-8">
          <div className="h-px flex-1 overflow-hidden bg-border">
            <div
              ref={progressRef}
              className="h-full w-full origin-left scale-x-0 bg-accent"
            />
          </div>
          <span
            ref={counterRef}
            className="font-display text-sm tabular-nums tracking-widest text-muted"
          >
            0
          </span>
        </div>
      </div>
    </div>
  );
}

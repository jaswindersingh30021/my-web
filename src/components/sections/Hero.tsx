"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { SkillChipCloud } from "@/components/SkillChipCloud";
import { profile } from "@/lib/data";
import { useTilt } from "@/hooks/useTilt";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const headline = ["I", "CRAFT", "FRONTEND", "EXPERIENCES."] as const;

type HeroProps = {
  ready: boolean;
};

export function Hero({ ready }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { ref: portraitRef, onMove, onLeave, style } = useTilt(6);

  useEffect(() => {
    if (!sectionRef.current || reducedMotion || !ready) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-word", {
        y: "110%",
        rotate: 4,
        opacity: 0,
        stagger: 0.08,
        duration: 1.1,
        ease: "power4.out",
        delay: 0.35,
      });

      gsap.from(".hero-fade", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.9,
      });

      gsap.from(".hero-portrait", {
        scale: 1.08,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      });

      gsap.to(".hero-bg-text", {
        xPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-content", {
        y: 60,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, ready]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-4 pb-24 pt-28 sm:px-6 sm:pb-16 sm:pt-32 md:px-10 md:pb-24"
    >
      <div
        className="hero-bg-text pointer-events-none absolute -right-[8%] top-[8%] hidden select-none font-display text-[clamp(5rem,18vw,16rem)] font-bold uppercase leading-none tracking-tighter text-outline opacity-50 sm:block"
        aria-hidden
      >
        FRONTEND
      </div>

      <div className="hero-content relative z-10 mx-auto grid w-full max-w-[1400px] gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          <div className="hero-fade mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.22em] text-accent">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              {profile.availability}
            </span>
            <span className="font-display text-[10px] uppercase tracking-[0.25em] text-muted">
              {profile.role}
            </span>
          </div>

          <h1 className="font-display max-w-[900px] text-[clamp(2rem,8.5vw,6.5rem)] font-bold uppercase leading-[0.94] tracking-tight break-words">
            {headline.map((word, i) => (
              <span
                key={i}
                className="mr-[0.15em] inline-block overflow-hidden align-top"
              >
                <span
                  className={`hero-word inline-block ${
                    word === "EXPERIENCES." ? "text-accent" : ""
                  }`}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            {profile.intro}
          </p>

          <div className="hero-fade mt-6">
            <SkillChipCloud />
          </div>

          <p className="hero-fade mt-6 font-display text-sm uppercase tracking-[0.2em] text-muted">
            {profile.name}
          </p>

          <div className="hero-fade mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mt-12 md:gap-6">
            <MagneticButton href="#work" variant="primary" className="w-full sm:w-auto">
              View my work
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost" className="w-full sm:w-auto">
              Get in touch
            </MagneticButton>
          </div>
        </div>

        <div className="hero-fade hero-portrait relative lg:col-span-5 lg:justify-self-end">
          <div
            ref={portraitRef}
            style={style}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="gradient-frame relative mx-auto aspect-[3/4] w-full max-w-md lg:max-w-none"
          >
            <div className="corner-mark tl" />
            <div className="corner-mark tr" />
            <div className="corner-mark bl" />
            <div className="corner-mark br" />
            <div className="relative z-10 m-[3px] aspect-[3/4] overflow-hidden bg-background">
              <Image
                src={profile.portrait}
                alt={`Portrait of ${profile.name}, frontend developer`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute right-4 bottom-4 left-4 panel-glass p-3">
                <p className="font-display text-[10px] uppercase tracking-[0.25em] text-accent">
                  Based in India
                </p>
                <p className="mt-1 text-xs text-muted">
                  React · Next.js · GSAP specialist
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#work"
        className="hero-fade absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted transition-colors hover:text-accent sm:bottom-8 md:left-auto md:right-10 md:translate-x-0"
        data-cursor="hover"
      >
        <span>Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}

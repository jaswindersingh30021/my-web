"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, stats } from "@/lib/data";
import { useTilt } from "@/hooks/useTilt";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { ref: photoRef, onMove, onLeave, style } = useTilt(5);

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-line", {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".about-photo", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about-photo",
          start: "top 85%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el) => {
        const target = Number(el.dataset.value ?? 0);
        const suffix = el.dataset.suffix ?? "";
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.val)}${suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32"
    >
      <div
        className="pointer-events-none absolute -left-10 top-1/3 hidden font-display text-[clamp(6rem,20vw,14rem)] font-bold uppercase leading-none text-surface sm:block"
        aria-hidden
      >
        DEV
      </div>

      <div className="relative mx-auto grid max-w-[1400px] gap-16 md:grid-cols-12 md:gap-10">
        <div
          ref={photoRef}
          style={style}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="about-photo gradient-frame relative aspect-[4/5] md:col-span-5"
        >
          <div className="relative z-10 m-[2px] aspect-[4/5] overflow-hidden bg-background">
            <Image
              src={profile.portrait}
              alt={`${profile.name} working as a frontend developer`}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="md:col-span-7 md:pt-8">
          <p className="about-line mb-4 font-display text-[10px] uppercase tracking-[0.35em] text-accent">
            About me
          </p>
          <h2 className="about-line font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-tight tracking-tight">
            Frontend dev.
            <br />
            Detail obsessed.
          </h2>

          <p className="about-line mt-8 text-lg leading-relaxed text-muted md:text-xl">
            Hi, I&apos;m {profile.name} — a frontend developer focused on
            turning designs into fast, responsive, and animated websites. I
            care about typography, motion, and code that teams can maintain.
          </p>
          <p className="about-line mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            I&apos;ve shipped products like BeelsCRM, Yurayi, Mittal & Kansal
            Properties, and the Codigo Mantra website — using React, Next.js,
            Tailwind, GSAP, Payload CMS, shadcn/ui, Bootstrap, and Django where
            needed.
          </p>

          <div className="about-line mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="panel-glass p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <p
                  className="stat-value font-display text-3xl font-bold text-accent md:text-4xl"
                  data-value={stat.value}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

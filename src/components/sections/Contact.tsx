"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioEmail, profile, socialLinks, techMarquee } from "@/lib/data";
import { ContactForm } from "@/components/ContactForm";
import { MagneticButton } from "@/components/MagneticButton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        y: 70,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] border-t border-border pt-16 md:pt-24">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="contact-reveal lg:col-span-7">
            <p className="mb-4 font-display text-[10px] uppercase tracking-[0.35em] text-accent">
              Contact
            </p>
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-bold uppercase leading-[0.95] tracking-tight">
              Let&apos;s build
              <br />
              something together
            </h2>
            <p className="mt-6 max-w-xl text-muted">
              Open to freelance, full-time frontend roles, and collaborations.
            </p>

            <div className="mt-10">
              <a
                ref={emailRef}
                href={`mailto:${portfolioEmail}`}
                className="group inline-block max-w-full break-all font-display text-[clamp(1rem,4.5vw,2.5rem)] uppercase tracking-tight text-foreground transition-colors hover:text-accent sm:break-normal"
                data-cursor="hover"
              >
                <span className="bg-gradient-to-r from-accent to-accent bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size,color] duration-500 group-hover:bg-[length:100%_2px]">
                  {portfolioEmail}
                </span>
              </a>
            </div>

            <div className="mt-10">
              <MagneticButton href={`mailto:${portfolioEmail}`} variant="primary">
                Send an email
              </MagneticButton>
            </div>

            <ContactForm />
          </div>

          <div className="contact-reveal grid gap-4 sm:grid-cols-2 lg:col-span-5">
            <div className="panel-glass p-6">
              <p className="font-display text-[10px] uppercase tracking-[0.25em] text-accent">
                Location
              </p>
              <p className="mt-3 text-sm text-muted">{profile.location}</p>
            </div>
            <div className="panel-glass p-6">
              <p className="font-display text-[10px] uppercase tracking-[0.25em] text-accent">
                Focus
              </p>
              <p className="mt-3 text-sm text-muted">
                Frontend development, UI motion, and product websites.
              </p>
            </div>
            <div className="panel-glass p-6 sm:col-span-2">
              <p className="mb-4 font-display text-[10px] uppercase tracking-[0.25em] text-accent">
                Stack highlights
              </p>
              <div className="flex flex-wrap gap-2">
                {techMarquee.map((item) => (
                  <span
                    key={item}
                    className="chip-interactive border border-border px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ul className="contact-reveal mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-8">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-accent"
                data-cursor="hover"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

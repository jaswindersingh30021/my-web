"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { useActiveSection } from "@/hooks/useActiveSection";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { MagneticButton } from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function Navigation() {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const activeSection = useActiveSection(
    navLinks.map((l) => l.href.replace("#", "")),
  );

  useEffect(() => {
    const header = headerRef.current;
    if (!header || reducedMotion) return;

    ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => {
        if (self.direction === 1) {
          gsap.to(header, {
            y: -100,
            duration: 0.45,
            ease: "power3.out",
          });
        } else {
          gsap.to(header, {
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          });
        }
        if (self.scroll() > 40) {
          header.dataset.scrolled = "true";
        } else {
          header.dataset.scrolled = "false";
        }
      },
    });
  }, [reducedMotion]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!menuRef.current || reducedMotion) return;
    if (open) {
      gsap.fromTo(
        ".mobile-link",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
        },
      );
    }
  }, [open, reducedMotion]);

  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <>
      <header
        ref={headerRef}
        data-scrolled="false"
        className="group/header fixed top-0 right-0 left-0 z-[9000] transition-[background,backdrop-filter,border-color] duration-500 data-[scrolled=true]:border-b data-[scrolled=true]:border-border data-[scrolled=true]:bg-background/75 data-[scrolled=true]:backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4 md:px-10 md:py-5">
          <Link
            href="#top"
            className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-foreground"
            data-cursor="hover"
            onClick={() => setOpen(false)}
          >
            {initials}
            <span className="text-accent">.</span>
          </Link>

          <nav
            className="hidden items-center gap-6 md:flex lg:gap-8"
            aria-label="Primary"
          >
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative font-display text-[11px] uppercase tracking-[0.22em] transition-colors ${
                    isActive ? "text-accent" : "text-muted hover:text-foreground"
                  }`}
                  data-cursor="hover"
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <MagneticButton href="#contact" variant="primary" className="!px-4 !py-3 lg:!px-5">
              Hire me
            </MagneticButton>
          </div>

          <button
            type="button"
            className="relative z-[9100] flex h-11 w-11 items-center justify-center border border-border text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            data-cursor="hover"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`fixed inset-0 z-[9050] flex flex-col bg-background/95 backdrop-blur-xl transition-opacity duration-500 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex flex-1 flex-col justify-center gap-6 px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-link font-display text-5xl font-bold uppercase tracking-tight text-foreground"
              onClick={() => setOpen(false)}
              data-cursor="hover"
            >
              {link.label}
            </Link>
          ))}
          <MagneticButton
            href="#contact"
            variant="primary"
            className="mobile-link mt-4 w-fit"
          >
            Hire me
          </MagneticButton>
        </div>
        <p className="mobile-link px-8 pb-10 text-sm text-muted">
          {profile.role} — {profile.location}
        </p>
      </div>
    </>
  );
}

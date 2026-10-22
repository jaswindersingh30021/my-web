"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { profile, socialLinks } from "@/lib/data";
import { useLenis } from "@/context/LenisContext";

export function Footer() {
  const { getLenis } = useLenis();

  const scrollTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-border bg-background/80 px-4 py-10 backdrop-blur-sm sm:px-6 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href="#top"
            className="font-display text-lg font-semibold uppercase tracking-[0.2em]"
            data-cursor="hover"
          >
            {profile.name}
          </Link>
          <p className="mt-3 text-sm text-muted">
            © 2026 {profile.name}. Frontend developer portfolio.
          </p>
        </div>

        <ul className="flex flex-wrap gap-6">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent"
                data-cursor="hover"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={scrollTop}
          className="inline-flex items-center gap-2 self-start font-display text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-accent md:self-auto"
          data-cursor="hover"
        >
          Back to top
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}

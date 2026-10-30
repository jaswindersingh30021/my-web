"use client";

import { techMarquee } from "@/lib/data";

export function SkillChipCloud() {
  return (
    <div className="hero-fade flex flex-wrap gap-2 md:gap-2.5">
      {techMarquee.slice(0, 8).map((tag) => (
        <span
          key={tag}
          className="chip-interactive border border-border bg-surface/80 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.18em] text-muted backdrop-blur-sm transition-colors hover:border-accent/60 hover:text-accent"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

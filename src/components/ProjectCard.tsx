"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useTilt } from "@/hooks/useTilt";

type ProjectCardProps = {
  title: string;
  category: string;
  year: string;
  image: string;
  aspect: string;
  index: number;
  tags: readonly string[];
};

export function ProjectCard({
  title,
  category,
  year,
  image,
  aspect,
  index,
  tags,
}: ProjectCardProps) {
  const { ref, onMove, onLeave, style } = useTilt(8);

  return (
    <Link href="#contact" className="block" data-cursor="hover">
      <div
        ref={ref}
        style={style}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative"
      >
        <div
          className={`work-image-wrap relative overflow-hidden ${aspect} panel-glass`}
        >
          <span className="pointer-events-none absolute top-3 left-3 z-20 font-display text-[10px] uppercase tracking-[0.3em] text-accent sm:top-4 sm:left-4">
            0{index + 1}
          </span>
          <Image
            src={image}
            alt={`${title} project preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 hidden bg-background/20 opacity-0 transition-opacity duration-500 md:block md:group-hover:opacity-100" />
          <div className="absolute inset-0 hidden items-end justify-between gap-3 p-4 opacity-0 transition-all duration-500 md:flex md:group-hover:opacity-100 sm:p-5">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-foreground/20 bg-background/50 px-2 py-1 text-[10px] uppercase tracking-wider backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-accent bg-accent text-background transition-transform duration-300 group-hover:rotate-45 sm:h-11 sm:w-11">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 md:hidden">
          {tags.map((tag) => (
            <span
              key={tag}
              className="border border-border px-2 py-1 text-[10px] uppercase tracking-wider text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="work-meta mt-4 flex items-start justify-between gap-3 border-b border-border pb-4 transition-colors group-hover:border-accent/40 sm:mt-5 sm:items-end sm:gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-xl uppercase tracking-tight transition-colors group-hover:text-accent sm:text-2xl md:text-3xl">
              {title}
            </h3>
            <p className="mt-1 text-xs text-muted sm:text-sm">{category}</p>
          </div>
          <span className="shrink-0 font-display text-xs text-muted sm:text-sm">
            {year}
          </span>
        </div>
      </div>
    </Link>
  );
}

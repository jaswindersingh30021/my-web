"use client";

import Link from "next/link";
import { useRef, type ReactNode, type RefObject } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type MagneticButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "text";
  type?: "button" | "submit";
  ariaLabel?: string;
};

export function MagneticButton({
  href,
  onClick,
  children,
  className = "",
  variant = "primary",
  type = "button",
  ariaLabel,
}: MagneticButtonProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const base =
    "relative inline-flex items-center justify-center overflow-hidden font-display text-xs uppercase tracking-[0.2em] transition-colors duration-300";

  const variants = {
    primary:
      "border border-accent bg-accent px-8 py-4 text-background hover:bg-transparent hover:text-accent",
    ghost:
      "border border-border px-8 py-4 text-foreground hover:border-accent hover:text-accent",
    text: "px-0 py-2 text-foreground hover:text-accent",
  };

  const handleMove = (e: React.MouseEvent, ref: RefObject<HTMLElement | null>) => {
    if (reducedMotion || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    gsap.to(ref.current, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleLeave = (ref: RefObject<HTMLElement | null>) => {
    if (reducedMotion || !ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  const classes = `${base} min-h-11 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link
        ref={linkRef}
        href={href}
        className={classes}
        onMouseMove={(e) => handleMove(e, linkRef)}
        onMouseLeave={() => handleLeave(linkRef)}
        aria-label={ariaLabel}
        data-cursor="hover"
      >
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef}
      type={type}
      className={classes}
      onClick={onClick}
      onMouseMove={(e) => handleMove(e, buttonRef)}
      onMouseLeave={() => handleLeave(buttonRef)}
      aria-label={ariaLabel}
      data-cursor="hover"
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}

"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { profile } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const PortraitCanvas = dynamic(
  () =>
    import("@/components/three/PortraitCanvas").then((mod) => mod.PortraitCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-border bg-surface">
        <Image
          src={profile.portrait3d}
          alt={`Portrait of ${profile.name}`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 90vw, 40vw"
        />
      </div>
    ),
  },
);

type HeroPortrait3DProps = {
  className?: string;
};

export function HeroPortrait3D({ className = "" }: HeroPortrait3DProps) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return (
      <div
        className={`gradient-frame relative mx-auto aspect-[3/4] w-full max-w-md lg:max-w-none ${className}`}
      >
        <div className="relative z-10 m-[3px] aspect-[3/4] overflow-hidden bg-background">
          <Image
            src={profile.portrait3d}
            alt={`Portrait of ${profile.name}, frontend developer`}
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 40vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`hero-portrait ${className}`}>
      <div className="gradient-frame relative mx-auto aspect-[3/4] w-full max-w-md lg:max-w-none">
        <div className="corner-mark tl" />
        <div className="corner-mark tr" />
        <div className="corner-mark bl" />
        <div className="corner-mark br" />
        <div className="relative z-10 m-[3px] aspect-[3/4] overflow-hidden bg-background">
          <PortraitCanvas className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}

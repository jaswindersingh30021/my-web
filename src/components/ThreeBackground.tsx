"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ThreeScene = dynamic(
  () =>
    import("@/components/three/ThreeScene").then((mod) => mod.ThreeScene),
  {
    ssr: false,
    loading: () => (
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-background"
        aria-hidden
      />
    ),
  },
);

export function ThreeBackground() {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-background"
        aria-hidden
      />
    );
  }

  return <ThreeScene />;
}

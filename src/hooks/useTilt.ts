"use client";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function useTilt(maxTilt = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const canTilt = useMediaQuery("(min-width: 768px) and (pointer: fine)");

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canTilt || reducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = ((x / rect.width) * 2 - 1) * maxTilt;
      const rotateX = ((y / rect.height) * -2 + 1) * maxTilt;

      gsap.to(ref.current, {
        rotateX,
        rotateY,
        transformPerspective: 900,
        duration: 0.45,
        ease: "power2.out",
      });
    },
    [canTilt, maxTilt, reducedMotion],
  );

  const onLeave = useCallback(() => {
    if (!canTilt || reducedMotion || !ref.current) return;
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  }, [canTilt, reducedMotion]);

  return {
    ref,
    onMove: canTilt ? onMove : undefined,
    onLeave: canTilt ? onLeave : undefined,
    style: canTilt ? { transformStyle: "preserve-3d" as const } : undefined,
  };
}

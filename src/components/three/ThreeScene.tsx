"use client";

import { Canvas } from "@react-three/fiber";
import { SceneContent } from "@/components/three/SceneContent";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ThreeScene() {
  const mobile = useMediaQuery("(max-width: 767px)");
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="three-canvas-wrap pointer-events-none fixed inset-0 z-[1] h-[100dvh] w-full">
      <Canvas
        className="!h-full !w-full"
        dpr={mobile ? [1, 1.35] : [1, 1.75]}
        camera={{ position: [0, 0, 7], fov: mobile ? 58 : 50, near: 0.1, far: 40 }}
        gl={{
          alpha: true,
          antialias: !mobile,
          powerPreference: "high-performance",
        }}
        performance={{ min: 0.5 }}
      >
        <SceneContent mobile={mobile} reducedMotion={reducedMotion} />
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/75 to-background/92" />
      <div className="site-grid absolute inset-0 opacity-25" />
    </div>
  );
}

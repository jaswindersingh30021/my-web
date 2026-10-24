"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { PortraitModel } from "@/components/three/PortraitModel";
import { profile } from "@/lib/data";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type PortraitCanvasProps = {
  className?: string;
};

function PortraitFallback() {
  return (
    <mesh>
      <boxGeometry args={[1.2, 1.6, 0.1]} />
      <meshStandardMaterial color="#141414" wireframe />
    </mesh>
  );
}

export function PortraitCanvas({ className = "" }: PortraitCanvasProps) {
  const mobile = useMediaQuery("(max-width: 767px)");
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      aria-label={`3D portrait of ${profile.name}`}
    >
      <Canvas
        className="!h-full !w-full"
        dpr={mobile ? [1, 1.35] : [1, 1.75]}
        camera={{ position: [0, 0, 3.2], fov: mobile ? 52 : 45 }}
        gl={{ alpha: true, antialias: !mobile, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.55} />
        <spotLight
          position={[2.5, 3, 4]}
          intensity={1.1}
          angle={0.45}
          penumbra={0.5}
          color="#c8ff00"
        />
        <pointLight position={[-3, -1, 2]} intensity={0.35} color="#f2efe8" />

        <Suspense fallback={<PortraitFallback />}>
          <PortraitModel
            mobile={mobile}
            imageUrl={profile.portrait3d}
          />
          {!reducedMotion && (
            <Environment preset="city" environmentIntensity={0.15} />
          )}
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={!reducedMotion && !mobile}
          maxPolarAngle={Math.PI / 1.85}
          minPolarAngle={Math.PI / 2.4}
          rotateSpeed={0.45}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
      <p className="pointer-events-none absolute bottom-3 left-3 font-display text-[9px] uppercase tracking-[0.28em] text-accent sm:bottom-4 sm:left-4">
        3D portrait
      </p>
    </div>
  );
}

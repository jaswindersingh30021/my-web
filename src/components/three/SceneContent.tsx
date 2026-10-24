"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import { Float, Sparkles } from "@react-three/drei";
import { PortraitModel } from "@/components/three/PortraitModel";
import { profile } from "@/lib/data";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SceneContentProps = {
  mobile: boolean;
  reducedMotion: boolean;
};

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function ParticleField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 18;
      arr[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 14;
      arr[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={mobileSize(count)}
        color="#c8ff00"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function mobileSize(count: number) {
  return count < 800 ? 0.035 : 0.028;
}

function CoreShapes({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const scroll = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scroll.current = self.progress;
      },
    });

    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };

    if (!mobile) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    return () => {
      st.kill();
      window.removeEventListener("pointermove", onMove);
    };
  }, [mobile]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.12 + scroll.current * Math.PI * 0.8;
    group.current.rotation.x =
      Math.sin(t * 0.25) * 0.15 + pointer.current.y * 0.35;
    group.current.position.x = pointer.current.x * 0.8;
    group.current.position.y = -pointer.current.y * 0.5 + scroll.current * -1.2;
  });

  const scale = mobile ? 0.75 : 1;

  return (
    <group ref={group} scale={scale}>
      <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.6}>
        <mesh>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshBasicMaterial
            color="#c8ff00"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      </Float>

      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.45}>
        <mesh rotation={[0.8, 0.4, 0]}>
          <torusGeometry args={[2.1, 0.02, 12, 120]} />
          <meshBasicMaterial color="#f2efe8" transparent opacity={0.18} />
        </mesh>
      </Float>

      <Float speed={0.9} rotationIntensity={0.25} floatIntensity={0.35}>
        <mesh rotation={[1.2, 0.2, 0.6]}>
          <torusGeometry args={[1.4, 0.015, 10, 80]} />
          <meshBasicMaterial color="#c8ff00" transparent opacity={0.22} />
        </mesh>
      </Float>
    </group>
  );
}

export function SceneContent({ mobile, reducedMotion }: SceneContentProps) {
  const particleCount = mobile ? 600 : 1800;
  const sparkleCount = mobile ? 35 : 90;

  if (reducedMotion) {
    return (
      <>
        <ambientLight intensity={0.4} />
        <mesh>
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshBasicMaterial color="#c8ff00" wireframe transparent opacity={0.12} />
        </mesh>
      </>
    );
  }

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 6]} intensity={0.6} color="#c8ff00" />
      <pointLight position={[-5, -2, 2]} intensity={0.25} color="#f2efe8" />

      <ParticleField count={particleCount} />

      <Sparkles
        count={sparkleCount}
        scale={[14, 10, 8]}
        size={mobile ? 1.2 : 2}
        speed={0.35}
        color="#c8ff00"
        opacity={0.45}
      />

      <CoreShapes mobile={mobile} />

      {!mobile && (
        <Suspense fallback={null}>
          <group position={[3.4, -0.2, -2.2]} scale={0.42} rotation={[0, -0.35, 0]}>
            <PortraitModel mobile={false} imageUrl={profile.portrait3d} />
          </group>
        </Suspense>
      )}
    </>
  );
}

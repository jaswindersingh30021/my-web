"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const portraitVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPointerX;
  uniform float uPointerY;
  varying vec2 vUv;
  varying float vDepth;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float wave =
      sin(pos.x * 4.5 + uTime * 1.2) * 0.012 +
      sin(pos.y * 5.0 + uTime * 0.9) * 0.01;

    pos.z += wave;
    pos.x += uPointerX * 0.08 * pos.z;
    pos.y += uPointerY * 0.06 * pos.z;

    vDepth = pos.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const portraitFragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uTime;
  varying vec2 vUv;
  varying float vDepth;

  void main() {
    vec2 uv = vUv;
    uv.x += sin(uv.y * 12.0 + uTime * 0.6) * 0.0015;

    vec4 color = texture2D(uMap, uv);
    float shade = 0.92 + vDepth * 2.5;
    color.rgb *= shade;

    float rim = smoothstep(0.02, 0.0, min(uv.x, min(1.0 - uv.x, min(uv.y, 1.0 - uv.y))));
    color.rgb += vec3(0.78, 1.0, 0.0) * rim * 0.35;

    gl_FragColor = color;
  }
`;

type PortraitModelProps = {
  mobile: boolean;
  imageUrl: string;
};

export function PortraitModel({ mobile, imageUrl }: PortraitModelProps) {
  const group = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const scroll = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const texture = useTexture(imageUrl, (loaded) => {
    loaded.colorSpace = THREE.SRGBColorSpace;
  });

  const width = mobile ? 1.15 : 1.45;
  const height = mobile ? 1.55 : 1.95;
  const depth = 0.11;

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scroll.current = self.progress;
      },
    });

    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      st.kill();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
      materialRef.current.uniforms.uPointerX.value = pointer.current.x;
      materialRef.current.uniforms.uPointerY.value = -pointer.current.y;
    }

    if (!group.current) return;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.current.x * 0.18 + scroll.current * 0.35,
      0.06,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.current.y * 0.1 - scroll.current * 0.12,
      0.06,
    );
  });

  return (
    <Float speed={1.15} rotationIntensity={0.12} floatIntensity={0.35}>
      <group ref={group}>
        <mesh position={[0, 0, -depth / 2 - 0.02]}>
          <boxGeometry args={[width + 0.08, height + 0.08, depth]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.35} roughness={0.65} />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[width, height, 64, 64]} />
          <shaderMaterial
            ref={materialRef}
            vertexShader={portraitVertex}
            fragmentShader={portraitFragment}
            uniforms={{
              uTime: { value: 0 },
              uPointerX: { value: 0 },
              uPointerY: { value: 0 },
              uMap: { value: texture },
            }}
          />
        </mesh>

        <mesh position={[0, 0, depth / 2 + 0.015]}>
          <planeGeometry args={[width + 0.04, height + 0.04]} />
          <meshBasicMaterial color="#c8ff00" transparent opacity={0.55} wireframe />
        </mesh>

        <mesh position={[width / 2 + 0.02, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[depth, height]} />
          <meshStandardMaterial color="#141414" roughness={0.8} />
        </mesh>
        <mesh position={[-width / 2 - 0.02, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[depth, height]} />
          <meshStandardMaterial color="#141414" roughness={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

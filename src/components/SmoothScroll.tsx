"use client";

import { LenisProvider } from "@/context/LenisContext";

type SmoothScrollProps = {
  children: React.ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  return <LenisProvider>{children}</LenisProvider>;
}

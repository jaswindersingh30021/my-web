"use client";

import { useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";
import { ThreeBackground } from "@/components/ThreeBackground";
import { AmbientBackground } from "@/components/AmbientBackground";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TechMarquee } from "@/components/TechMarquee";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Skills } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export function AppShell() {
  const [ready, setReady] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const id = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(id);
  }, [ready]);

  return (
    <SmoothScroll>
      {showPreloader && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      <ThreeBackground />
      <AmbientBackground />
      <ScrollProgress />
      <CustomCursor />
      <div className="noise-overlay" aria-hidden />
      <Navigation />
      <main className={`relative z-10 ${ready ? "" : "overflow-hidden"}`}>
        <Hero ready={ready} />
        <TechMarquee />
        <SelectedWork />
        <Skills />
        <About />
        <Process />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </SmoothScroll>
  );
}

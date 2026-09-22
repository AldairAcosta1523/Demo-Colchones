"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Lenis + GSAP ticker. Se desactiva con prefers-reduced-motion y en dispositivos táctiles
 * (scroll nativo), pero ScrollTrigger sigue funcionando en ambos casos.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Recalcula posiciones cuando cargan las fuentes y cuando termina el preloader.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    const onReady = () =>
      setTimeout(() => {
        refresh();
        if (location.hash && document.querySelector(location.hash)) scrollToHash(location.hash);
      }, 120);
    window.addEventListener("almara:ready", onReady, { once: true });
    return () => window.removeEventListener("almara:ready", onReady);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      // 0.085 dejaba la página persiguiendo a la rueda: se sentía pastoso más que suave.
      lerp: 0.12,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -64 },
    });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add("lenis-ready");

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
      document.documentElement.classList.remove("lenis-ready");
    };
  }, []);

  return <>{children}</>;
}

/** Scroll suave hacia un ancla, compatible con y sin Lenis. */
export function scrollToHash(hash: string, offset = -64) {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  const lenis = window.__lenis;
  if (!lenis) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const target = () => el.getBoundingClientRect().top + window.scrollY + offset;
  lenis.scrollTo(target(), {
    duration: 1.4,
    onComplete: () => {
      // Si un refresh de ScrollTrigger movió el layout durante el scroll, corrige el destino.
      const delta = target() - window.scrollY;
      if (Math.abs(delta) > 4) lenis.scrollTo(target(), { duration: 0.6 });
    },
  });
}

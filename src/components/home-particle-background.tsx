"use client";

import { usePathname } from "next/navigation";
import { ParticleBackground } from "@/components/particle-background";

export function HomeParticleBackground() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <ParticleBackground
      dotRadius={1.5}
      dotSpacing={14}
      cursorRadius={500}
      bulgeOnly
      bulgeStrength={67}
      gradientFrom="rgba(168, 85, 247, 0.35)"
      gradientTo="rgba(59, 130, 246, 0.25)"
      glowColor="rgba(168, 85, 247, 0.15)"
    />
  );
}

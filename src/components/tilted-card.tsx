"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";

type TiltedCardProps = {
  children: ReactNode;
  className?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
};

export function TiltedCard({
  children,
  className = "",
  rotateAmplitude = 14,
  scaleOnHover = 1.1,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    setRotation({
      x: ((y - bounds.height / 2) / (bounds.height / 2)) * -rotateAmplitude,
      y: ((x - bounds.width / 2) / (bounds.width / 2)) * rotateAmplitude,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative ${className}`}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      animate={{
        rotateX: !reduceMotion && isHovering ? rotation.x : 0,
        rotateY: !reduceMotion && isHovering ? rotation.y : 0,
        scale: !reduceMotion && isHovering ? scaleOnHover : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

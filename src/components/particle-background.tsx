"use client";

import {
  memo,
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
} from "react";

type Dot = {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

type ParticleBackgroundProps = HTMLAttributes<HTMLDivElement> & {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
};

const TWO_PI = Math.PI * 2;

export const ParticleBackground = memo(function ParticleBackground({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = "rgba(168, 85, 247, 0.35)",
  gradientTo = "rgba(180, 151, 207, 0.25)",
  glowColor = "#120F17",
  className = "",
  ...rest
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    prevX: -9999,
    prevY: -9999,
    speed: 0,
  });
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const glowOpacity = useRef(0);
  const engagement = useRef(0);
  const propsRef = useRef({
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  });
  const rebuildRef = useRef<null | (() => void)>(null);
  const glowId = useId();

  propsRef.current = {
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const glowElement = glowRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    const canvasElement = canvas;
    const drawingContext = context;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    function buildDots(width: number, height: number) {
      const props = propsRef.current;
      const step = props.dotRadius + props.dotSpacing;
      const columns = Math.floor(width / step);
      const rows = Math.floor(height / step);
      const paddingX = (width % step) / 2;
      const paddingY = (height % step) / 2;
      const dots = new Array<Dot>(rows * columns);
      let index = 0;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const ax = paddingX + column * step + step / 2;
          const ay = paddingY + row * step + step / 2;
          dots[index] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
          index += 1;
        }
      }

      dotsRef.current = dots;
    }

    function resizeCanvas() {
      const parent = canvasElement.parentElement;
      if (!parent) return;

      const bounds = parent.getBoundingClientRect();
      const width = bounds.width;
      const height = bounds.height;
      canvasElement.width = width * pixelRatio;
      canvasElement.height = height * pixelRatio;
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      drawingContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      sizeRef.current = {
        w: width,
        h: height,
        offsetX: bounds.left + window.scrollX,
        offsetY: bounds.top + window.scrollY,
      };
      buildDots(width, height);
    }

    function scheduleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 100);
    }

    function handleMouseMove(event: MouseEvent) {
      const size = sizeRef.current;
      mouseRef.current.x = event.pageX - size.offsetX;
      mouseRef.current.y = event.pageY - size.offsetY;
    }

    function updateMouseSpeed() {
      const mouse = mouseRef.current;
      const deltaX = mouse.prevX - mouse.x;
      const deltaY = mouse.prevY - mouse.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      mouse.speed += (distance - mouse.speed) * 0.5;
      if (mouse.speed < 0.001) mouse.speed = 0;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    }

    const speedInterval = window.setInterval(updateMouseSpeed, 20);
    let frameCount = 0;

    function tick() {
      frameCount += 1;
      const dots = dotsRef.current;
      const mouse = mouseRef.current;
      const { w: width, h: height } = sizeRef.current;
      const props = propsRef.current;
      const time = frameCount * 0.02;

      const targetEngagement = Math.min(mouse.speed / 5, 1);
      engagement.current += (targetEngagement - engagement.current) * 0.06;
      if (engagement.current < 0.001) engagement.current = 0;

      const currentEngagement = engagement.current;
      glowOpacity.current += (currentEngagement - glowOpacity.current) * 0.08;

      if (glowElement) {
        glowElement.setAttribute("cx", String(mouse.x));
        glowElement.setAttribute("cy", String(mouse.y));
        glowElement.style.opacity = String(glowOpacity.current);
      }

      drawingContext.clearRect(0, 0, width, height);
      const gradient = drawingContext.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, props.gradientFrom);
      gradient.addColorStop(1, props.gradientTo);
      drawingContext.fillStyle = gradient;

      const cursorRadiusSquared = props.cursorRadius * props.cursorRadius;
      const radius = props.dotRadius / 2;
      drawingContext.beginPath();

      for (let index = 0; index < dots.length; index += 1) {
        const dot = dots[index];
        const deltaX = mouse.x - dot.ax;
        const deltaY = mouse.y - dot.ay;
        const distanceSquared = deltaX * deltaX + deltaY * deltaY;

        if (distanceSquared < cursorRadiusSquared && currentEngagement > 0.01) {
          const distance = Math.sqrt(distanceSquared);
          const angle = Math.atan2(deltaY, deltaX);

          if (props.bulgeOnly) {
            const proximity = 1 - distance / props.cursorRadius;
            const push =
              proximity * proximity * props.bulgeStrength * currentEngagement;
            dot.sx += (dot.ax - Math.cos(angle) * push - dot.sx) * 0.15;
            dot.sy += (dot.ay - Math.sin(angle) * push - dot.sy) * 0.15;
          } else {
            const move =
              (500 / Math.max(distance, 0.01)) *
              (mouse.speed * props.cursorForce);
            dot.vx += Math.cos(angle) * -move;
            dot.vy += Math.sin(angle) * -move;
          }
        } else if (props.bulgeOnly) {
          dot.sx += (dot.ax - dot.sx) * 0.1;
          dot.sy += (dot.ay - dot.sy) * 0.1;
        }

        if (!props.bulgeOnly) {
          dot.vx *= 0.9;
          dot.vy *= 0.9;
          dot.x = dot.ax + dot.vx;
          dot.y = dot.ay + dot.vy;
          dot.sx += (dot.x - dot.sx) * 0.1;
          dot.sy += (dot.y - dot.sy) * 0.1;
        }

        let drawX = dot.sx;
        let drawY = dot.sy;

        if (props.waveAmplitude > 0) {
          drawY += Math.sin(dot.ax * 0.03 + time) * props.waveAmplitude;
          drawX +=
            Math.cos(dot.ay * 0.03 + time * 0.7) *
            props.waveAmplitude *
            0.5;
        }

        const sparkles =
          props.sparkle &&
          ((((index * 2654435761) ^ (frameCount >> 3)) >>> 0) % 100 < 3);
        const drawRadius = sparkles ? radius * 1.8 : radius;
        drawingContext.moveTo(drawX + drawRadius, drawY);
        drawingContext.arc(drawX, drawY, drawRadius, 0, TWO_PI);
      }

      drawingContext.fill();
      rafRef.current = window.requestAnimationFrame(tick);
    }

    resizeCanvas();
    window.addEventListener("resize", scheduleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = window.requestAnimationFrame(tick);
    rebuildRef.current = () => {
      const { w: width, h: height } = sizeRef.current;
      if (width > 0 && height > 0) buildDots(width, height);
    };

    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      window.clearInterval(speedInterval);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", scheduleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    rebuildRef.current?.();
  }, [dotRadius, dotSpacing]);

  return (
    <div
      aria-hidden="true"
      className={`dot-field-container absolute inset-0 ${className}`}
      {...rest}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <svg className="pointer-events-none absolute inset-0 size-full">
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowId})`}
          style={{ opacity: 0, willChange: "opacity" }}
        />
      </svg>
    </div>
  );
});

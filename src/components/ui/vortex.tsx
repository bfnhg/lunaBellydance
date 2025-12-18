"use client";

import { useEffect, useRef } from "react";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  rangeHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

export const Vortex = (props: VortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      hue: number;
      alpha: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialisation des particules
    const initParticles = () => {
      particles.length = 0;
      const count = props.particleCount || 600;

      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const baseHue = props.baseHue || 35;
        const hue = baseHue + Math.random() * (props.rangeHue || 100);

        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * (props.baseSpeed || 0.3) + (Math.random() - 0.5) * (props.rangeSpeed || 1),
          vy: (Math.random() - 0.5) * (props.baseSpeed || 0.3) + (Math.random() - 0.5) * (props.rangeSpeed || 1),
          radius: (props.baseRadius || 1.5) + Math.random() * (props.rangeRadius || 4),
          hue,
          alpha: Math.random() * 0.5 + 0.5,
        });
      }
    };

    initParticles();

    const animate = () => {
      ctx.fillStyle = props.backgroundColor || "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.alpha})`;
        ctx.fill();
        ctx.closePath();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [props]);

  return (
    <div className={`relative w-full h-full ${props.containerClassName || ""}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className={`relative z-10 ${props.className || ""}`}>{props.children}</div>
    </div>
  );
};
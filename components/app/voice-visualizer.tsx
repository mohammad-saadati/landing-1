'use client';

import { useEffect, useRef } from 'react';

export function VoiceVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(centerX, centerY) * 0.8;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY - baseRadius * 0.2,
        0,
        centerX,
        centerY,
        baseRadius
      );

      // Animate gradient colors
      const offset1 = (Math.sin(time) + 1) / 2;
      const offset2 = (Math.cos(time * 0.7) + 1) / 2;

      gradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 + offset1 * 0.1})`);
      gradient.addColorStop(0.3, `rgba(255, 220, 150, ${0.8 + offset2 * 0.2})`);
      gradient.addColorStop(0.6, `rgba(255, 165, 80, ${0.9 + offset1 * 0.1})`);
      gradient.addColorStop(1, 'rgba(255, 140, 60, 1)');

      // Draw pulsing circle
      const pulseOffset = Math.sin(time * 2) * 10;
      const radius = baseRadius + pulseOffset;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add subtle glow effect
      ctx.shadowColor = 'rgba(255, 165, 80, 0.5)';
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(animate);
    };

    // Set canvas size
    const updateSize = () => {
      const size = 300;
      canvas.width = size;
      canvas.height = size;
    };

    updateSize();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="h-64 w-64 md:h-80 md:w-80"
        style={{ filter: 'blur(0.5px)' }}
      />
    </div>
  );
}

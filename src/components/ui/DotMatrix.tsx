"use client";

import { useEffect, useRef } from "react";

export default function DotMatrix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Default posisi cahaya di tengah banner
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = width / 2;
    let targetY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Tambahan untuk Mobile (Touch Events)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        targetX = e.touches[0].clientX - rect.left;
        targetY = e.touches[0].clientY - rect.top;
      }
    };
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        targetX = e.touches[0].clientX - rect.left;
        targetY = e.touches[0].clientY - rect.top;
      }
    };
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    // Konfigurasi Grid Titik
    const SPACING = 18; 
    let time = 0;

    const draw = () => {
      time += 0.015;
      
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      // Bersihkan canvas, biarkan FULL TRANSPARAN agar warna background web aslinya yang terlihat
      ctx.clearRect(0, 0, width, height);

      const aura1X = mouseX;
      const aura1Y = mouseY;
      const aura2X = width / 2 + Math.sin(time) * (width / 3);
      const aura2Y = height / 2 + Math.cos(time * 0.8) * (height / 3);

      for (let x = 0; x < width; x += SPACING) {
        for (let y = 0; y < height; y += SPACING) {
          
          const dx1 = x - aura1X;
          const dy1 = y - aura1Y;
          const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
          
          const dx2 = x - aura2X;
          const dy2 = y - aura2Y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          const MAX_DIST_1 = 450; 
          const MAX_DIST_2 = 600; 

          let intensity1 = Math.max(0, 1 - dist1 / MAX_DIST_1);
          let intensity2 = Math.max(0, 1 - dist2 / MAX_DIST_2);
          
          const noise = Math.sin(x * 0.02 + time) * Math.cos(y * 0.02 + time) * 0.1;
          let alpha = (intensity1 * 0.7) + (intensity2 * 0.3) + noise + 0.03;

          if (alpha > 0) {
            const radius = 1 + (intensity1 * 1.5);
            ctx.fillStyle = `rgba(180, 210, 255, ${Math.min(alpha, 1)})`;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    const animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative overflow-hidden"
      style={{
        // Teknik Dewa: Pakai CSS Masking buat nge-fade ujung atas & bawah titik-titiknya
        // Tanpa numpuk warna background buatan sama sekali.
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
      }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

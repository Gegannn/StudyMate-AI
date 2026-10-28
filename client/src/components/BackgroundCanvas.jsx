import { useEffect, useRef } from "react";

export default function BackgroundCanvas({ theme = "dark" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse coordinates with easing
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Particle nodes
    const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
    const particles = [];
    const colors = theme === "dark" 
      ? ["#38bdf8", "#818cf8", "#c084fc", "#34d399", "#f59e0b"]
      : ["#0284c7", "#6366f1", "#9333ea", "#059669", "#d97706"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let time = 0;

    const render = () => {
      time += 0.003;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Clear
      ctx.clearRect(0, 0, width, height);

      // Aurora flowing ambient glow
      const g1 = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        50,
        mouse.x,
        mouse.y,
        Math.max(width, height) * 0.55
      );

      if (theme === "dark") {
        g1.addColorStop(0, "rgba(56, 189, 248, 0.08)");
        g1.addColorStop(0.35, "rgba(129, 140, 248, 0.04)");
        g1.addColorStop(0.7, "rgba(192, 132, 252, 0.02)");
        g1.addColorStop(1, "rgba(10, 15, 29, 0)");
      } else {
        g1.addColorStop(0, "rgba(2, 132, 199, 0.06)");
        g1.addColorStop(0.35, "rgba(99, 102, 241, 0.03)");
        g1.addColorStop(0.7, "rgba(168, 85, 247, 0.015)");
        g1.addColorStop(1, "rgba(248, 250, 252, 0)");
      }

      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Flowing secondary wave
      const waveX = width * 0.7 + Math.sin(time) * 120;
      const waveY = height * 0.4 + Math.cos(time * 0.8) * 100;
      const g2 = ctx.createRadialGradient(waveX, waveY, 30, waveX, waveY, 450);
      g2.addColorStop(0, theme === "dark" ? "rgba(16, 185, 129, 0.04)" : "rgba(16, 185, 129, 0.03)");
      g2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // Draw and connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Particle circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 130) * 0.15;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{
        background: theme === "dark" ? "#090d16" : "#f8fafc"
      }}
    />
  );
}

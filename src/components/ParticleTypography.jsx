import { useEffect, useRef } from "react";

class Particle {
  constructor(originX, originY, size, color, dispersion, returnSpd, startX, startY) {
    this.originX = originX;
    this.originY = originY;
    this.startX = startX;
    this.startY = startY;
    this.x = startX;
    this.y = startY;
    this.vx = 0;
    this.vy = 0;
    this.size = size;
    this.color = color;
    this.dispersion = dispersion;
    this.returnSpd = returnSpd;
  }

  update(mouseX, mouseY) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const interactionRadius = 120;

    if (distance < interactionRadius && mouseX !== -1000 && mouseY !== -1000) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (interactionRadius - distance) / interactionRadius;

      this.vx -= forceDirectionX * force * this.dispersion;
      this.vy -= forceDirectionY * force * this.dispersion;
    }

    this.vx += (this.originX - this.x) * this.returnSpd;
    this.vy += (this.originY - this.y) * this.returnSpd;

    this.vx *= 0.85;
    this.vy *= 0.85;

    const distToOrigin = Math.sqrt(
      Math.pow(this.x - this.originX, 2) + Math.pow(this.y - this.originY, 2)
    );

    if (distToOrigin < 1 && Math.random() > 0.95) {
      this.vx += (Math.random() - 0.5) * 0.2;
      this.vy += (Math.random() - 0.5) * 0.2;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function ParticleTypography({
  text,
  referenceText,
  assembleDuration = 1100,
  fontSize = 90,
  fontFamily = "Space Grotesk, sans-serif",
  particleSize = 1.5,
  particleDensity = 4,
  dispersionStrength = 15,
  returnSpeed = 0.08,
  color = "#00D4FF",
  className,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(text);
  textRef.current = text;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let containerWidth = 0;
    let containerHeight = 0;
    let transitionStart = null;
    let renderedText = null;

    const createParticles = (nextText, previousParticles = []) => {
      const container = containerRef.current;
      if (!container) return;

      containerWidth = container.clientWidth;
      containerHeight = container.clientHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = containerWidth * dpr;
      canvas.height = containerHeight * dpr;
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, containerWidth, containerHeight);

      const maxTextWidth = containerWidth * 0.9;

      // Extra headroom so ascenders and dots never touch the canvas edge
      let effectiveFontSize = Math.min(fontSize, containerHeight * 0.68);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `bold ${effectiveFontSize}px ${fontFamily}`;

      // Size against the longest role so every word renders at the same size
      const sizeSample = referenceText || text;
      let measuredWidth = ctx.measureText(sizeSample).width;
      if (measuredWidth > maxTextWidth) {
        effectiveFontSize = effectiveFontSize * (maxTextWidth / measuredWidth);
        ctx.font = `bold ${effectiveFontSize}px ${fontFamily}`;
      }

      ctx.fillStyle = color;
      ctx.fillText(nextText, containerWidth / 2, containerHeight / 2);

      const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const nextParticles = [];
      const step = Math.max(1, Math.floor(particleDensity * dpr));

      for (let y = 0; y < textCoordinates.height; y += step) {
        for (let x = 0; x < textCoordinates.width; x += step) {
          const index = (y * textCoordinates.width + x) * 4;
          const alpha = textCoordinates.data[index + 3] || 0;
          if (alpha > 128) {
            const originX = x / dpr;
            const originY = y / dpr;

            const previous = previousParticles[nextParticles.length % previousParticles.length];
            const spawnRadius = Math.max(containerWidth, containerHeight) * (0.7 + Math.random() * 0.7);
            const angle = Math.random() * Math.PI * 2;
            const startX = previous?.x ?? containerWidth / 2 + Math.cos(angle) * spawnRadius;
            const startY = previous?.y ?? containerHeight / 2 + Math.sin(angle) * spawnRadius;

            nextParticles.push(
              new Particle(originX, originY, particleSize, color, dispersionStrength, returnSpeed, startX, startY)
            );
          }
        }
      }

      particles = nextParticles;
      renderedText = nextText;
      transitionStart = null;
    };

    const init = () => {
      createParticles(textRef.current);
      transitionStart = null;
    };

    const transitionTo = (nextText) => {
      const previousParticles = particles;
      createParticles(nextText, previousParticles);
      transitionStart = null;

      particles.forEach((particle, index) => {
        const previous = previousParticles[index % previousParticles.length];
        if (previous) {
          particle.x = previous.x;
          particle.y = previous.y;
          particle.startX = previous.x;
          particle.startY = previous.y;
        }
      });
      transitionStart = performance.now();
    };

    const animate = (ts) => {
      if (textRef.current !== renderedText) transitionTo(textRef.current);

      const elapsed = transitionStart === null ? assembleDuration : ts - transitionStart;
      const assembling = elapsed < assembleDuration;
      const t = assembling
        ? transitionStart === null
          ? easeOutCubic(Math.min(1, elapsed / assembleDuration))
          : easeInOutCubic(Math.min(1, elapsed / assembleDuration))
        : 1;

      ctx.clearRect(0, 0, containerWidth, containerHeight);
      particles.forEach((p) => {
        if (assembling) {
          p.x = p.startX + (p.originX - p.startX) * t;
          p.y = p.startY + (p.originY - p.startY) * t;
        } else {
          p.update(mouseX, mouseY);
        }
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => init();

    const timeoutId = setTimeout(() => {
      init();
      animationFrameId = requestAnimationFrame(animate);
    }, 100);

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [referenceText, assembleDuration, fontSize, fontFamily, particleSize, particleDensity, dispersionStrength, returnSpeed, color]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%", minHeight: 100, position: "relative", touchAction: "none" }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
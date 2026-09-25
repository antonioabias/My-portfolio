import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { useEffect, useRef, useState } from "react";

export default function LiquidButton({
  href,
  onClick,
  label,
  icon,
  shape = "pill", // "pill" or "circle"
  size = 46,
  disabled = false,
  onMouseEnter,
  onMouseLeave,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);
  const shaderRef = useRef(null);
  const shaderMount = useRef(null);
  const buttonRef = useRef(null);
  const rippleId = useRef(0);

  const isCircle = shape === "circle";
  const radius = isCircle ? "50%" : 100;

  // Only real outside links (not "#about" style anchors) open in a new tab
  const isExternal = href && !href.startsWith("#");

  useEffect(() => {
    const styleId = "liquid-button-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .liquid-button-shader canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          inset: 0 !important;
        }
        @keyframes liquid-button-ripple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
        .liquid-btn-pill {
          width: clamp(120px, 32vw, 142px);
          height: clamp(40px, 10vw, 46px);
        }
        .liquid-btn-label {
          font-size: clamp(12px, 3vw, 14px);
        }
      `;
      document.head.appendChild(style);
    }

    let cancelled = false;

    const initTimer = setTimeout(() => {
      if (cancelled) return;

      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
        shaderMount.current = null;
      }

      if (shaderRef.current) {
        shaderMount.current = new ShaderMount(
          shaderRef.current,
          liquidMetalFragmentShader,
          {
            u_repetition: 4,
            u_softness: 0.5,
            u_shiftRed: 0.3,
            u_shiftBlue: 0.3,
            u_distortion: 0,
            u_contour: 0,
            u_angle: 45,
            u_scale: 8,
            u_shape: 1,
            u_offsetX: 0.1,
            u_offsetY: -0.1,
          },
          undefined,
          0.6,
        );
      }
    }, 120);

    return () => {
      cancelled = true;
      clearTimeout(initTimer);
      const canvas = shaderRef.current?.querySelector("canvas");
      const gl = canvas?.getContext("webgl") || canvas?.getContext("webgl2");
      gl?.getExtension("WEBGL_lose_context")?.loseContext();

      shaderMount.current?.destroy?.();
      shaderMount.current = null;
    };
  }, []);

  useEffect(() => {
    if (!shaderRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      shaderMount.current?.resize?.();
    });
    resizeObserver.observe(shaderRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(1);
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.6);
    onMouseLeave?.();
  };

  const handleClick = (event) => {
    if (disabled) return;
    shaderMount.current?.setSpeed?.(2.4);
    window.setTimeout(() => {
      shaderMount.current?.setSpeed?.(isHovered ? 1 : 0.6);
    }, 300);

    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const ripple = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        id: rippleId.current++,
      };
      setRipples((current) => [...current, ripple]);
      window.setTimeout(() => {
        setRipples((current) =>
          current.filter((item) => item.id !== ripple.id),
        );
      }, 600);
    }

    onClick?.(event);
  };

  const Tag = href ? "a" : "button";

  return (
    <div style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}>
      <div
        className={isCircle ? "" : "liquid-btn-pill"}
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          width: isCircle ? size : undefined,
          height: isCircle ? size : undefined,
          flexShrink: 0,
          opacity: disabled ? 0.4 : 1,
        }}
      >
        {(label || icon) && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "translateZ(20px)",
              zIndex: 30,
              pointerEvents: "none",
              color: "#fdfdfd",
            }}
          >
            {label ? (
              <span
                className="liquid-btn-label"
                style={{
                  fontWeight: 400,
                  textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            ) : (
              icon
            )}
          </div>
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translateZ(10px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
            zIndex: 20,
            transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "calc(100% - 8px)",
              height: "calc(100% - 8px)",
              margin: 4,
              borderRadius: radius,
              background: "linear-gradient(180deg, #202020 0%, #000000 100%)",
              boxShadow: isPressed ? "inset 0 2px 4px rgba(0,0,0,0.4)" : "none",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translateZ(0) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: radius,
              overflow: "hidden",
              boxShadow: isHovered
                ? "0 0 0 1px rgba(255,255,255,0.25), 0 0 12px rgba(255,255,255,0.2), 0 12px 6px rgba(0,0,0,0.05)"
                : "0 0 0 1px rgba(255,255,255,0.18), 0 0 8px rgba(255,255,255,0.12), 0 20px 12px rgba(0,0,0,0.08)",
            }}
          >
            <div
              ref={shaderRef}
              className="liquid-button-shader"
              aria-hidden="true"
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: radius,
                overflow: "hidden",
                filter: "contrast(1.35) brightness(1.25)",
              }}
            />
            {disabled && (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#fdfdfd",
                }}
              />
            )}
          </div>
        </div>

        <Tag
          ref={buttonRef}
          href={disabled ? undefined : href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          disabled={Tag === "button" ? disabled : undefined}
          aria-label={label || "button"}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 40,
            display: "block",
            overflow: "hidden",
            borderRadius: radius,
            background: "transparent",
            border: "none",
            outline: "none",
            transform: "translateZ(25px)",
            cursor: disabled ? "default" : "pointer",
          }}
        >
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              aria-hidden="true"
              style={{
                position: "absolute",
                left: ripple.x,
                top: ripple.y,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
                pointerEvents: "none",
                animation: "liquid-button-ripple 0.6s ease-out",
              }}
            />
          ))}
        </Tag>
      </div>
    </div>
  );
}

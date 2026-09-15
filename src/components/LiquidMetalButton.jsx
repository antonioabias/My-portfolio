import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { useEffect, useRef, useState } from "react";

export default function LiquidMetalButton({ href = "#about", label = "Meet Me", onMouseEnter, onMouseLeave }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);
  const shaderRef = useRef(null);
  const shaderMount = useRef(null);
  const buttonRef = useRef(null);
  const rippleId = useRef(0);

  useEffect(() => {
    const styleId = "liquid-metal-button-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .liquid-metal-button-shader canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          inset: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes liquid-metal-ripple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
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

    return () => {
      shaderMount.current?.destroy?.();
      shaderMount.current = null;
    };
  }, []);

  const handleMouseEnter = () => {
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
        setRipples((current) => current.filter((item) => item.id !== ripple.id));
      }, 600);
    }
  };

  return (
    <div style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}>
      <div
        style={{
          position: "relative",
          width: 142,
          height: 46,
          transformStyle: "preserve-3d",
          transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
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
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: "#666666",
              fontWeight: 400,
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
        </div>

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
              width: 134,
              height: 38,
              margin: 4,
              borderRadius: 100,
              background: "linear-gradient(180deg, #202020 0%, #000000 100%)",
              boxShadow: isPressed
                ? "inset 0 2px 4px rgba(0, 0, 0, 0.4)"
                : "none",
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
              width: 142,
              height: 46,
              borderRadius: 100,
              overflow: "hidden",
              boxShadow: isHovered
                ? "0 0 0 1px rgba(255, 255, 255, 0.25), 0 0 12px rgba(255, 255, 255, 0.2), 0 12px 6px rgba(0, 0, 0, 0.05)"
                : "0 0 0 1px rgba(255, 255, 255, 0.18), 0 0 8px rgba(255, 255, 255, 0.12), 0 20px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div
              ref={shaderRef}
              className="liquid-metal-button-shader"
              aria-hidden="true"
              style={{ position: "relative", width: 142, height: 46, borderRadius: 100, overflow: "hidden", filter: "contrast(1.35) brightness(1.25)" }}
            />
          </div>
        </div>

        <a
          ref={buttonRef}
          href={href}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          aria-label={label}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 40,
            display: "block",
            overflow: "hidden",
            borderRadius: 100,
            background: "transparent",
            outline: "none",
            transform: "translateZ(25px)",
            cursor: "pointer",
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
                background: "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
                pointerEvents: "none",
                animation: "liquid-metal-ripple 0.6s ease-out",
              }}
            />
          ))}
        </a>
      </div>
    </div>
  );
}

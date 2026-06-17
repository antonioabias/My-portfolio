import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const commands = ["whoami", "ls ./projects", "cat about.md", "npm run dev"];
const GLITCH_CHARS = "アイウエオ<>/{}";

export default function Hero({ setIsHovering }) {
  const [cmd, setCmd] = useState("");
  const [cmdIdx, setCmdIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [antonioText, setAntonioText] = useState("Antonio");
  const [abiasText, setAbiasText] = useState("Abias Jr.");
  const canvasRef = useRef(null);
  const animIdRef = useRef(null);

  // Terminal typing effect
  useEffect(() => {
    const current = commands[cmdIdx];
    let timeout;
    if (!deleting) {
      if (cmd.length < current.length) {
        timeout = setTimeout(() => setCmd(current.slice(0, cmd.length + 1)), 110);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (cmd.length > 0) {
        timeout = setTimeout(() => setCmd(cmd.slice(0, -1)), 60);
      } else {
        setDeleting(false);
        setCmdIdx((i) => (i + 1) % commands.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [cmd, cmdIdx, deleting]);

  // Glitch effect
  const glitch = useCallback((original, setter) => {
    let iter = 0;
    const interval = setInterval(() => {
      setter(
        original.split("").map((c, i) => {
          if (i < iter) return original[i];
          if (c === " ") return " ";
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }).join("")
      );
      iter += 0.5;
      if (iter >= original.length) {
        clearInterval(interval);
        setter(original);
      }
    }, 40);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const chars = ["0", "1", "{", "}", "<", ">", "/", "=", ";", "()"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.08,
      color: Math.random() > 0.6 ? "#00D4FF" : "#6C3BFF",
      char: chars[Math.floor(Math.random() * chars.length)],
      isChar: Math.random() > 0.7,
    }));

    let frame = 0;
    const draw = () => {
      animIdRef.current = requestAnimationFrame(draw);
      if (++frame % 2 !== 0) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.globalAlpha = (1 - dist / 100) * 0.08;
            ctx.strokeStyle = "#00D4FF";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        if (p.isChar) {
          ctx.font = `${10 + p.size * 3}px monospace`;
          ctx.fillText(p.char, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
    };
    draw();

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>

      {/* Particles */}
      <canvas ref={canvasRef} style={{
        position: "fixed", top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0, pointerEvents: "none", opacity: 0.4,
      }} />

      {/* Main content grid */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "grid", gridTemplateColumns: "1fr 1fr",
        alignItems: "center", gap: "4rem",
        padding: "8rem 3rem 4rem",
        maxWidth: 1200, margin: "0 auto", minHeight: "100vh",
        gridAutoRows: "1fr",
      }}>

        {/* Left side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ minWidth: 0 }}
        >
          {/* Terminal */}
          <motion.div variants={itemVariants} style={{
            fontFamily: "var(--font-mono)", fontSize: "0.85rem",
            color: "var(--cyan)", marginBottom: "1.5rem",
            display: "flex", alignItems: "center", gap: "0.25rem",
          }}>
            <span style={{ opacity: 0.6 }}>~/antonio $</span>
            <span>{cmd}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >▋</motion.span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={itemVariants} style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            fontWeight: 700, lineHeight: 1.05,
            marginBottom: "1rem", letterSpacing: "-0.02em",
            minWidth: 0,
          }}>
            <div style={{ overflow: "hidden", minWidth: 0 }}>
              <motion.span
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => { setIsHovering(true); glitch("Antonio", setAntonioText); }}
                onMouseLeave={() => setIsHovering(false)}
                style={{ display: "block", whiteSpace: "nowrap", cursor: "none" }}
              >
                {antonioText}
              </motion.span>
              <motion.span
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => { setIsHovering(true); glitch("Abias Jr.", setAbiasText); }}
                onMouseLeave={() => setIsHovering(false)}
                style={{ display: "block", color: "var(--cyan)", whiteSpace: "nowrap", cursor: "none" }}
              >
                {abiasText}
              </motion.span>
            </div>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} style={{
            fontFamily: "var(--font-display)", fontSize: "1.1rem",
            color: "var(--muted)", fontWeight: 400, marginBottom: "1rem",
          }}>
            Software Engineer{" "}
            <span style={{ color: "var(--cyan)", margin: "0 0.5rem" }}>x</span>
            {" "}UI/UX Designer
          </motion.p>

          {/* Description */}
          <motion.p variants={itemVariants} style={{
            fontSize: "1rem", color: "var(--muted)",
            maxWidth: 480, marginBottom: "2.5rem",
          }}>
            CS graduate from Naga City crafting digital experiences where clean code meets visual arts.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} style={{ display: "flex", gap: "1rem" }}>
            {[
              { label: "View Projects", href: "#projects", primary: true },
              { label: "Let's Talk", href: "#contact", primary: false },
            ].map(({ label, href, primary }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "0.75rem 1.75rem", borderRadius: 6,
                  fontFamily: "var(--font-mono)", fontSize: "0.85rem",
                  fontWeight: 700, letterSpacing: "0.05em",
                  background: primary ? "var(--cyan)" : "transparent",
                  color: primary ? "var(--navy)" : "var(--white)",
                  border: primary ? "1px solid var(--cyan)" : "1px solid rgba(255,255,255,0.2)",
                  cursor: "none", transition: "all 0.25s",
                }}
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - Code Card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          whileHover={{ rotateY: 5, rotateX: -3, scale: 1.02 }}
          style={{ position: "relative", zIndex: 1, perspective: 1000, alignSelf: "center" }}
        >
          <div style={{
            background: "rgba(30,42,58,0.85)",
            border: "1px solid rgba(0,212,255,0.15)",
            borderRadius: 12, overflow: "hidden",
            boxShadow: "0 0 60px rgba(0,212,255,0.08), 0 20px 60px rgba(0,0,0,0.5)",
          }}>
            {/* Card header */}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.8rem 1.2rem",
              background: "rgba(0,0,0,0.3)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              {[["#FF5F57","red"],["#FFBD2E","yellow"],["#28CA41","green"]].map(([color, name]) => (
                <span key={name} style={{ width: 12, height: 12, borderRadius: "50%", background: color, display: "inline-block" }} />
              ))}
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)", marginLeft: "0.5rem" }}>
                antonio.js
              </span>
            </div>

            {/* Code */}
            <pre style={{ padding: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem", lineHeight: 2, overflow: "hidden" }}>
              <code>
                <span style={{ color: "#FF79C6" }}>const </span>
                <span style={{ color: "#50FA7B" }}>antonio</span>
                <span style={{ color: "var(--white)" }}> = {"{"}</span>{"\n"}
                {"  "}<span style={{ color: "#8BE9FD" }}>role</span>
                <span style={{ color: "var(--white)" }}>: </span>
                <span style={{ color: "#F1FA8C" }}>"Software Engineer"</span>
                <span style={{ color: "var(--white)" }}>,</span>{"\n"}
                {"  "}<span style={{ color: "#8BE9FD" }}>location</span>
                <span style={{ color: "var(--white)" }}>: </span>
                <span style={{ color: "#F1FA8C" }}>"Camarines Sur, Philippines"</span>
                <span style={{ color: "var(--white)" }}>,</span>{"\n"}
                {"  "}<span style={{ color: "#8BE9FD" }}>stack</span>
                <span style={{ color: "var(--white)" }}>: [</span>
                <span style={{ color: "#F1FA8C" }}>"React"</span>
                <span style={{ color: "var(--white)" }}>, </span>
                <span style={{ color: "#F1FA8C" }}>"Node.js"</span>
                <span style={{ color: "var(--white)" }}>,</span>{"\n"}
                {"          "}<span style={{ color: "#F1FA8C" }}>"Firebase"</span>
                <span style={{ color: "var(--white)" }}>, </span>
                <span style={{ color: "#F1FA8C" }}>"MySQL"</span>
                <span style={{ color: "var(--white)" }}>],</span>{"\n"}
                {"  "}<span style={{ color: "#8BE9FD" }}>superpower</span>
                <span style={{ color: "var(--white)" }}>: </span>
                <span style={{ color: "#F1FA8C" }}>"Visual Arts + Code"</span>
                <span style={{ color: "var(--white)" }}>,</span>{"\n"}
                {"  "}<span style={{ color: "#8BE9FD" }}>status</span>
                <span style={{ color: "var(--white)" }}>: </span>
                <span style={{ color: "#F1FA8C" }}>"open_to_work"</span>{"\n"}
                <span style={{ color: "var(--white)" }}>{"}"}</span>
                <span style={{ color: "#FF79C6" }}>;</span>
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
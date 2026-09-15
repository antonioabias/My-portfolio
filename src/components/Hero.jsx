import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ParticleTypography from "./ParticleTypography";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const commands = ["whoami", "ls ./projects", "cat about.md", "npm run dev"];
const roles = ["SOFTWARE ENGINEER", "WEB DEVELOPER", "FRONTEND DEVELOPER"];

export default function Hero({ setIsHovering }) {
  const [cmd, setCmd] = useState("");
  const [cmdIdx, setCmdIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);

  // Typewriter effect for the terminal line
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

  // Rotate the particle role text every 3.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIdx((i) => (i + 1) % roles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#05070f" }}>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .hero-spin { animation: spin-slow 60s linear infinite; }
        .hero-spin-reverse { animation: spin-slow-reverse 60s linear infinite; }

        .hero-bg-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .hero-content {
          position: relative;
          z-index: 20;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 8rem 1.5rem 4rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        .hero-role-canvas {
          width: 100%;
          height: clamp(90px, 14vw, 170px);
        }
        .hero-name {
          font-size: clamp(1.1rem, 2.2vw, 1.6rem);
          margin-top: 0.5rem;
        }
        @media (max-width: 768px) {
          .hero-content { padding: 7rem 1.25rem 3rem; }
          .hero-role-canvas { height: clamp(60px, 18vw, 100px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-spin, .hero-spin-reverse { animation: none; }
        }
      `}</style>

      {/* Spinning background icons */}
      <div
        className="hero-bg-layer"
        style={{
          perspective: "1200px",
          transform: "perspective(1200px) rotateX(15deg) scale(0.85)",
          transformOrigin: "center center",
        }}
      >
        <div className="hero-spin" style={{ position: "absolute", inset: 0 }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: 2000, height: 2000,
            transform: "translate(-50%, -50%) rotate(279.05deg)",
            zIndex: 0,
          }}>
            <img
              src="https://cdn.21st.dev/assets/mirror/c6/c66b4f0c389b961a3676312892ca1387d7f8bd1973f44a33c7d47840d297633f.png"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
            />
          </div>
        </div>

        <div className="hero-spin-reverse" style={{ position: "absolute", inset: 0 }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: 1000, height: 1000,
            transform: "translate(-50%, -50%) rotate(304.42deg)",
            zIndex: 1,
          }}>
            <img
              src="https://cdn.21st.dev/assets/mirror/75/75f75d84f07a61893dc2a16aad0c781c32b9e758c8f0adda2a8b252c431fdd82.png"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
            />
          </div>
        </div>

        <div className="hero-spin" style={{ position: "absolute", inset: 0 }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: 800, height: 800,
            transform: "translate(-50%, -50%) rotate(48.33deg)",
            zIndex: 2,
          }}>
            <img
              src="https://cdn.21st.dev/assets/mirror/e0/e08cdf40df3bedc96255e0e30240d7583b0a309da36bcd8a760d3c35cc67a286.png"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }}
            />
          </div>
        </div>
      </div>

      {/* Gradient overlay so content stays readable */}
      <div
        className="hero-bg-layer"
        style={{
          zIndex: 10,
          background: "linear-gradient(to top, #05070f 10%, rgba(5,7,15,0.8) 40%, transparent 100%), linear-gradient(180deg, rgba(5,7,15,0.6) 0%, transparent 30%)",
        }}
      />

      {/* Content */}
      <div className="hero-content">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ width: "100%" }}>
          <motion.div variants={itemVariants} style={{
            fontFamily: "var(--font-mono)", fontSize: "0.85rem",
            color: "#ffffff", marginBottom: "1.5rem",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
          }}>
            <span style={{ opacity: 0.6 }}>~/antonio $</span>
            <span>{cmd}</span>
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>▋</motion.span>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-role-canvas">
            <ParticleTypography text={roles[roleIdx]} color="#ffffff" fontSize={130} />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="hero-name"
            style={{
              fontFamily: "var(--font-display)",
              color: "#ffffff",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            Antonio V. Abias Jr.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "2.5rem" }}>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "0.75rem 1.75rem", borderRadius: 6,
                fontFamily: "var(--font-mono)", fontSize: "0.85rem",
                fontWeight: 700, letterSpacing: "0.05em",
                background: "#ffffff",
                color: "#05070f",
                border: "1px solid #ffffff",
                cursor: "none", transition: "all 0.25s",
              }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "0.75rem 1.75rem", borderRadius: 6,
                fontFamily: "var(--font-mono)", fontSize: "0.85rem",
                fontWeight: 700, letterSpacing: "0.05em",
                background: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.3)",
                cursor: "none", transition: "all 0.25s",
              }}
            >
              Let's Talk
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
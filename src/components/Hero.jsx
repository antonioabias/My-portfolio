import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ParticleTypography from "./ParticleTypography";
import AboutMeButton from "./AboutMeButton";

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
const LONGEST_ROLE = "FRONTEND DEVELOPER";

export default function Hero({ setIsHovering }) {
  const [cmd, setCmd] = useState("");
  const [cmdIdx, setCmdIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const current = commands[cmdIdx];
    let timeout;
    if (!deleting) {
      if (cmd.length < current.length) {
        timeout = setTimeout(
          () => setCmd(current.slice(0, cmd.length + 1)),
          110,
        );
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

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIdx((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#05070f",
      }}
    >
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
          max-width: 1200px;
          margin: 0 auto;
        }
        .hero-role-canvas {
          width: 100%;
          height: clamp(110px, 16vw, 200px);
        }
        .hero-layer-one { width: 2000px !important; height: 2000px !important; }
        .hero-layer-two { width: 1000px !important; height: 1000px !important; }
        .hero-layer-three { width: 800px !important; height: 800px !important; }
        .hero-name {
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          margin-top: 0;
        }
        .hero-name-shine {
          position: relative;
          display: inline-block;
          background: linear-gradient(115deg, rgba(255,255,255,0.5) 25%, #ffffff 45%, rgba(255,255,255,0.5) 65%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: hero-shine-sweep 4s linear infinite;
        }
        @keyframes hero-shine-sweep {
          0% { background-position: 200% 0; }
          100% { background-position: 0% 0; }
        }
        @media (max-width: 768px) {
          .hero-content { padding: 7rem 1.25rem 3rem; }
          .hero-role-canvas { height: clamp(90px, 20vw, 130px); }
          .hero-layer-one { width: 900px !important; height: 900px !important; }
          .hero-layer-two { width: 550px !important; height: 550px !important; }
          .hero-layer-three { width: 420px !important; height: 420px !important; }
          .hero-name { font-size: clamp(1.1rem, 5vw, 1.6rem); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-spin, .hero-spin-reverse, .hero-name-shine { animation: none; }
        }

        .hero-corner {
          position: absolute;
          z-index: 25;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-body);
          font-size: 0.78rem;
          color: var(--muted);
        }
        .hero-corner-tr { top: 1.75rem; right: 1.75rem; }

        .hero-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px rgba(74, 222, 128, 0.7);
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .hero-corner {
            font-size: 0.68rem;
            gap: 0.4rem;
          }
          .hero-corner-tr { top: 1.1rem; right: 1.1rem; }
        }
      `}</style>

      <div className="hero-corner hero-corner-tr">
        <span className="hero-status-dot" />
        <span>Available for work</span>
      </div>

      <div
        className="hero-bg-layer"
        style={{
          perspective: "1200px",
          transform: "perspective(1200px) rotateX(15deg) scale(0.85)",
          transformOrigin: "center center",
        }}
      >
        <div className="hero-spin" style={{ position: "absolute", inset: 0 }}>
          <div
            className="hero-layer-one"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 2000,
              height: 2000,
              transform: "translate(-50%, -50%) rotate(279.05deg)",
              zIndex: 0,
            }}
          >
            <img
              src="https://cdn.21st.dev/assets/mirror/c6/c66b4f0c389b961a3676312892ca1387d7f8bd1973f44a33c7d47840d297633f.png"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.5,
              }}
            />
          </div>
        </div>

        <div
          className="hero-spin-reverse"
          style={{ position: "absolute", inset: 0 }}
        >
          <div
            className="hero-layer-two"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 1000,
              height: 1000,
              transform: "translate(-50%, -50%) rotate(304.42deg)",
              zIndex: 1,
            }}
          >
            <img
              src="https://cdn.21st.dev/assets/mirror/75/75f75d84f07a61893dc2a16aad0c781c32b9e758c8f0adda2a8b252c431fdd82.png"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.6,
              }}
            />
          </div>
        </div>

        <div className="hero-spin" style={{ position: "absolute", inset: 0 }}>
          <div
            className="hero-layer-three"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 800,
              height: 800,
              transform: "translate(-50%, -50%) rotate(48.33deg)",
              zIndex: 2,
            }}
          >
            <img
              src="https://cdn.21st.dev/assets/mirror/e0/e08cdf40df3bedc96255e0e30240d7583b0a309da36bcd8a760d3c35cc67a286.png"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.8,
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="hero-bg-layer"
        style={{
          zIndex: 10,
          background:
            "linear-gradient(to top, #05070f 10%, rgba(5,7,15,0.8) 40%, transparent 100%), linear-gradient(180deg, rgba(5,7,15,0.6) 0%, transparent 30%)",
        }}
      />

      <div className="hero-content">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: "100%" }}
        >
          <motion.div
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "#ffffff",
              marginTop: "1rem",
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
            }}
          >
            <span style={{ opacity: 0.6 }}>~/antonio $</span>
            <span>{cmd}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ▋
            </motion.span>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-role-canvas">
            <ParticleTypography
              text={roles[roleIdx]}
              referenceText={LONGEST_ROLE}
              color="#ffffff"
              fontSize={150}
            />
          </motion.div>

          <motion.p variants={itemVariants} className="hero-name">
            <span
              className="hero-name-shine"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 700,
                letterSpacing: "0.01em",
              }}
            >
              Antonio V. Abias Jr.
            </span>
          </motion.p>

          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.62rem, 2.6vw, 0.95rem)",
              color: "var(--muted)",
              marginTop: "0.9rem",
              maxWidth: 420,
              marginLeft: "auto",
              marginRight: "auto",
              whiteSpace: "nowrap",
            }}
          >
            I design clean interfaces and build them faster with AI.
          </motion.p>

          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2.5rem",
            }}
          >
            <AboutMeButton
              onClick={() => {
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              label="About Me"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import pic from "../assets/pic.jpg";

const CERT_COUNT = 11;

const stats = [
  { num: 10, suffix: "+", label: "Years Coding" },
  { num: 2, suffix: "+", label: "Years Professional" },
  { num: CERT_COUNT, suffix: "", label: "Certifications" },
];

const experience = [
  {
    period: "Jan 2024 — Present",
    role: "Freelance Web Developer",
    company: "AC Architectural Studio",
    desc: "Building a full company website from scratch. Project gallery, services, client inquiry system, and a Gemini AI chatbot for international client acquisition.",
    tags: ["React.js", "Gemini API", "Framer Motion"],
    dot: "#00D4FF",
    active: true,
  },
  {
    period: "Nov 2021 — Aug 2023",
    role: "Data & Advertising Operations",
    company: "Wide-out Workforces Inc. (Broadlume)",
    desc: "Managed product datasets across hundreds of client websites. Data audits, catalog accuracy, and cross-team marketing alignment.",
    tags: ["Salesforce", "Excel", "Floorforce"],
    dot: "#6C3BFF",
    active: false,
  },
];

function useCountUp(target, duration = 900, triggered = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, triggered]);
  return value;
}

function StatCard({ num, suffix, label, triggered }) {
  const val = useCountUp(num, 900, triggered);
  return (
    <div style={{ flex: 1, textAlign: "center" }}>
      <span style={{
        display: "block",
        fontFamily: "var(--font-display)",
        fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
        fontWeight: 700,
        color: "var(--cyan)",
        lineHeight: 1,
      }}>
        {val}{suffix}
      </span>
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.6rem",
        color: "var(--muted)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginTop: "0.4rem",
        display: "block",
      }}>
        {label}
      </span>
    </div>
  );
}

export default function About({ setIsHovering }) {
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTriggered(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} style={{ padding: "7rem 0", position: "relative", zIndex: 1 }}>
      <style>{`
        .about-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          width: min(100%, 63%);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }
        .pic-bio-row {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }
        .tl { position: relative; padding-left: 1.5rem; }
        .tl::before {
          content: '';
          position: absolute;
          left: 0; top: 8px; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, rgba(0,212,255,0.35), rgba(108,59,255,0.08));
        }
        .tl-item { position: relative; margin-bottom: 2rem; }
        .tl-item:last-child { margin-bottom: 0; }
        .tl-dot {
          position: absolute;
          left: -1.875rem;
          top: 7px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid;
          background: var(--navy);
        }
        @media (max-width: 768px) {
          .about-wrapper { width: 92%; }
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
          .pic-bio-row { gap: 1.25rem; }
        }
      `}</style>

      <div className="about-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--cyan)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}
        >
          About
        </motion.div>

        <div className="about-grid">

          {/* LEFT col */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Pic + bio side by side */}
            <div className="pic-bio-row">
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  width: 110,
                  flexShrink: 0,
                  aspectRatio: "3/4",
                  borderRadius: 10,
                  overflow: "hidden",
                  border: "1px solid rgba(0,212,255,0.2)",
                }}
              >
                <img
                  src={pic}
                  alt="Antonio Abias Jr."
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    filter: "grayscale(15%)",
                    display: "block",
                  }}
                />
              </motion.div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.75rem",
                  color: "var(--white)",
                }}>
                  A developer with an{" "}
                  <span style={{ color: "var(--cyan)" }}>artist's eye.</span>
                </h2>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.75, marginBottom: 0 }}>
                  CS graduate from UNC. Background in Visual Arts and Computer Programming — great software isn't just functional, it's <em style={{ color: "var(--white)" }}>felt.</em>
                </p>
              </div>
            </div>

            {/* Second paragraph */}
            <p style={{ fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              Building with React, Node.js, and Firebase. Currently freelancing and integrating AI tools into real client workflows.
            </p>

            {/* Live project indicator */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.55rem 0.9rem",
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: 8,
              marginBottom: "1.5rem",
            }}>
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "var(--muted)",
              }}>
                Live project{" "}
                <span style={{ color: "var(--white)" }}>AC Architectural Studio</span>
              </span>
            </div>

            {/* Skill chips */}
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "2rem" }}>
              {["React.js", "Node.js", "Firebase", "Figma", "Claude AI", "Phaser.js"].map((b) => (
                <span key={b} style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  color: "var(--cyan)",
                  background: "rgba(0,212,255,0.07)",
                  border: "1px solid rgba(0,212,255,0.18)",
                  borderRadius: 8,
                  padding: "0.28rem 0.7rem",
                  letterSpacing: "0.03em",
                }}>
                  {b}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div style={{
              display: "flex",
              gap: "1rem",
              paddingTop: "1.75rem",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}>
              {stats.map((s) => (
                <StatCard key={s.label} {...s} triggered={triggered} />
              ))}
            </div>
          </motion.div>

          {/* RIGHT col: Experience timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--cyan)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "1.75rem",
            }}>
              Experience
            </div>

            <div className="tl">
              {experience.map((e) => (
                <div className="tl-item" key={e.role}>
                  <div
                    className="tl-dot"
                    style={{ borderColor: e.dot, boxShadow: `0 0 8px ${e.dot}55` }}
                  />
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                    marginBottom: "0.3rem",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      color: "var(--muted)",
                      letterSpacing: "0.05em",
                    }}>
                      {e.period}
                    </span>
                    {e.active && (
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.57rem",
                        color: "#22c55e",
                        background: "rgba(34,197,94,0.1)",
                        border: "1px solid rgba(34,197,94,0.25)",
                        borderRadius: 100,
                        padding: "0.1rem 0.5rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}>
                        Active
                      </span>
                    )}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--white)",
                    marginBottom: "0.2rem",
                  }}>
                    {e.role}
                  </div>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    color: "var(--cyan)",
                    opacity: 0.75,
                    display: "block",
                    marginBottom: "0.65rem",
                  }}>
                    {e.company}
                  </span>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.75, marginBottom: "0.7rem" }}>
                    {e.desc}
                  </p>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {e.tags.map((t) => (
                      <span key={t} style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        color: "#a78bfa",
                        background: "rgba(108,59,255,0.1)",
                        border: "1px solid rgba(108,59,255,0.22)",
                        borderRadius: 100,
                        padding: "0.14rem 0.55rem",
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {/* Education */}
              <div className="tl-item">
                <div className="tl-dot" style={{ borderColor: "var(--muted)" }} />
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  color: "var(--muted)",
                  display: "block",
                  marginBottom: "0.3rem",
                }}>
                  2018 — 2024
                </span>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--white)",
                  marginBottom: "0.2rem",
                }}>
                  BS Computer Science
                </div>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--cyan)",
                  opacity: 0.75,
                  display: "block",
                  marginBottom: "0.6rem",
                }}>
                  University of Nueva Caceres
                </span>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {["Visual Arts (JHS)", "Computer Programming (SHS)"].map((t) => (
                    <span key={t} style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      color: "#a78bfa",
                      background: "rgba(108,59,255,0.1)",
                      border: "1px solid rgba(108,59,255,0.22)",
                      borderRadius: 100,
                      padding: "0.14rem 0.55rem",
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
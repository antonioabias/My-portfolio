import { motion } from "framer-motion";
import pic from "../assets/pic.jpg";

const stats = [
  { num: "6+", label: "Years Coding" },
  { num: "2+", label: "Years Professional" },
  { num: "11", label: "Certifications" },
];

export default function About({ setIsHovering }) {
  const badges = [
    { name: "React.js", logo: "https://cdn.simpleicons.org/react/00D4FF" },
    { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
    { name: "Claude", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Claude_AI_symbol.svg/1280px-Claude_AI_symbol.svg.png" },
  ];

  return (
    <section id="about" style={{ padding: "7rem 0", position: "relative", zIndex: 1 }}>
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
          align-items: center;
        }
        .about-photo-col {
          position: relative;
        }
        .about-badge {
          position: absolute;
          right: -20%;
        }
        @media (max-width: 768px) {
          .about-wrapper {
            width: 92%;
          }
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .about-photo-col {
            max-width: 320px;
            margin: 0 auto;
            width: 100%;
          }
          .about-badge {
            right: -8%;
          }
        }
      `}</style>

      <div className="about-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}
        >
          About
        </motion.div>

        <div className="about-grid">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
              A developer with an <span style={{ color: "var(--cyan)" }}>artist's eye.</span>
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.8 }}>
              CS graduate from the University of Nueva Caceres with 6 years of coding experience and 2 years in professional roles spanning data management, advertising operations, and digital systems.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.8 }}>
              My background in Visual Arts and Computer Programming taught me that great software is not just functional, it is <em>felt</em>. I build things that work beautifully.
            </p>
            <div style={{ display: "flex", gap: "2.5rem", marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {stats.map(({ num, label }, i) => (
                <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, color: "var(--cyan)", lineHeight: 1 }}>{num}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="about-photo-col"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{ aspectRatio: "3/4", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,212,255,0.2)", position: "relative" }}
            >
              <img
                src={pic}
                alt="Antonio Abias Jr."
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "grayscale(20%)" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,15,30,0.6) 0%, transparent 50%)" }} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
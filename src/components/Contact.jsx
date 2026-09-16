import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AboutMeButton from "./AboutMeButton";

const links = [
  { icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1280px-Gmail_icon_%282020%29.svg.png", label: "antonioabias23.aa@gmail.com", href: "https://mail.google.com/mail/?view=cm&to=antonioabias23.aa@gmail.com" },
  { icon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-white-icon.png", label: "github.com/antonioabias", href: "https://github.com/antonioabias" },
  { icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/linkedin.webp", label: "linkedin.com/in/antonio-abias", href: "https://www.linkedin.com/in/antonio-abias-501a912b8/" },
];

export default function Contact() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="contact" className="contact-section">                                              
      <style>{`
       .together-shine {
        position: relative;
        display: inline-block;
        background: linear-gradient(115deg, rgba(200,200,200,0.5) 25%, #F5F5F5 45%, rgba(200,200,200,0.5) 65%);
        background-size: 220% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: together-shine-sweep 3s ease-in-out infinite;
      }
      @keyframes together-shine-sweep {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .together-shine { animation: none; }
      }
        .contact-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 6rem 4rem;
          border-bottom: 1px solid #2f3336;
          background: #000000;
        }
        .contact-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: start;
        }
        .contact-heading {
          font-size: clamp(2.5rem, 4vw, 4.5rem);
        }
        .contact-link-label {
          font-size: 0.82rem;
        }
        @media (max-width: 768px) {
          .contact-section {
            padding: 5rem 1.5rem;
          }
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .contact-heading {
            font-size: 2.5rem;
          }
          .contact-link-label {
            font-size: 0.72rem;
          }
        }
      `}</style>


      <div className="contact-grid">
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          <h2
            className="contact-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900, lineHeight: 1.05,
              letterSpacing: "-0.03em", color: "var(--ink)",
              marginBottom: "1.5rem",
            }}
          >
            Let's build something<br />
            <em className="together-shine" style={{ fontStyle: "italic" }}>together.</em>
          </h2>
          <p style={{ fontSize: "1rem", maxWidth: 400 }}>
            Open to freelance, full-time, or collaboration. Drop me a message anytime.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ paddingTop: "1rem" }}
        >
          {links.map(({ icon, label, href }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 6 }}
              style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "1.25rem 0",
                borderBottom: "2px solid rgba(255,255,255,0.07)",
                color: "var(--ink)", transition: "color 0.2s", minWidth: 0,
              }}
            >
              <img src={icon} alt={label} style={{ width: 20, height: 20, objectFit: "contain", flexShrink: 0 }} />
              <span
                className="contact-link-label"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--muted)",
                  overflow: "hidden", textOverflow: "ellipsis",
                  whiteSpace: "nowrap", minWidth: 0,
                }}
              >
                {label}
              </span>
              <span style={{ marginLeft: "auto", fontSize: "0.8rem", color: "var(--accent)", flexShrink: 0 }}>→</span>
            </motion.a>
          ))}
        </motion.div>
            </div>

      <AnimatePresence>
        {showTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              zIndex: 50,
            }}
          >
            <AboutMeButton
              shape="circle"
              size={48}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
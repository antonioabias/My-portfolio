import { motion } from "framer-motion";

const links = [
  { icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1280px-Gmail_icon_%282020%29.svg.png", label: "antonioabias23.aa@gmail.com", href: "https://mail.google.com/mail/?view=cm&to=antonioabias23.aa@gmail.com" },
  { icon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-white-icon.png", label: "github.com/antonioabias", href: "https://github.com/antonioabias" },
  { icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/linkedin.webp", label: "linkedin.com/in/antonio-abias", href: "https://www.linkedin.com/in/antonio-abias-501a912b8/" },
];

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <style>{`
        .contact-section {
          padding: 8rem 4rem;
          border-bottom: 1px solid var(--border);
          background: var(--cream);
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

      <motion.p
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          fontFamily: "var(--font-mono)", fontSize: "0.75rem",
          color: "var(--cyan)", letterSpacing: "0.2em",
          textTransform: "uppercase", marginBottom: "1.5rem",
          maxWidth: 1200, margin: "0 auto 1.5rem",
        }}
      >
        Contact
      </motion.p>

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
            <em style={{ fontStyle: "italic", color: "var(--cyan)" }}>together.</em>
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
    </section>
  );
}
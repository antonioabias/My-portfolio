import { motion } from "framer-motion";
import { useState } from "react";

const contactLinks = [
  { icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1280px-Gmail_icon_%282020%29.svg.png", label: "antonioabias23.aa@gmail.com", href: "https://mail.google.com/mail/?view=cm&to=antonioabias23.aa@gmail.com" },
  { icon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-white-icon.png", label: "github.com/antonioabias", href: "https://github.com/antonioabias" },
  { icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/linkedin.webp", label: "linkedin.com/in/antonio-abias", href: "https://www.linkedin.com/in/antonio-abias-501a912b8/" },
];

export default function ProjectDetail({ project, onBack, onNext, onPrev, setIsHovering }) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ minHeight: "100vh", paddingTop: "5rem", paddingBottom: "0" }}
    >
      <style>{`
        .detail-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          width: 96%;
          padding-bottom: 4rem;
        }
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--muted);
          margin-bottom: 2.5rem;
        }
        .breadcrumb-link {
          color: var(--cyan);
          background: none;
          border: none;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          cursor: none;
          padding: 0;
          transition: opacity 0.2s;
        }
        .breadcrumb-link:hover { opacity: 0.7; }
        .detail-desc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          margin-bottom: 2.5rem;
        }
        .thumb-strip {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 0.25rem;
        }
        .thumb-strip::-webkit-scrollbar { display: none; }
        .thumb-item {
          flex-shrink: 0;
          width: 100px;
          aspect-ratio: 16/9;
          border-radius: 6px;
          overflow: hidden;
          cursor: none;
          padding: 0;
          transition: border-color 0.2s;
          background: #0A0F1E;
        }
        .detail-contact {
          background: rgba(0, 0, 0, 0.75);
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 5rem 2rem;
        }
        .detail-contact-inner {
          max-width: 1200px;
          margin: 0 auto;
          width: 92%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        .contact-link-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.1rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          color: var(--white);
          text-decoration: none;
          transition: all 0.2s;
        }
        .contact-link-row:hover { padding-left: 6px; }
        @media (max-width: 768px) {
          .detail-desc-grid {
            grid-template-columns: 1fr;
          }
          .thumb-item { width: 72px; }
          .detail-contact-inner {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>

      <div className="detail-wrapper">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <button
            className="breadcrumb-link"
            onClick={onBack}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Projects
          </button>
          <span style={{ opacity: 0.4 }}>/</span>
          <span>{project.title}</span>
        </div>    

        {/* Accent line */}
        <div style={{ height: 3, background: project.statusColor, borderRadius: 2, marginBottom: "2rem", opacity: 0.8 }} />

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: "2rem" }}
        >
          <motion.div
            key={activeImg}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            style={{
              width: "100%", aspectRatio: "16/9",
              borderRadius: 14, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.07)",
              marginBottom: "0.75rem", background: "#0A0F1E"
            }}
          >
            <img
              src={project.gallery[activeImg]}
              alt={`${project.title} screenshot ${activeImg + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </motion.div>

          <div className="thumb-strip">
            {project.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="thumb-item"
                style={{
                  border: i === activeImg
                    ? "2px solid var(--cyan)"
                    : "2px solid rgba(255,255,255,0.06)",
                }}
              >
                <img
                  src={img}
                  alt={`thumb ${i + 1}`}
                  style={{
                    width: "100%", height: "100%", objectFit: "contain",
                    opacity: i === activeImg ? 1 : 0.4,
                    transition: "opacity 0.2s"
                  }}
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Overview + features */}
        <motion.div
          className="detail-desc-grid"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem", opacity: 0.7 }}>Overview</div>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(232,237,245,0.8)", margin: 0 }}>{project.fullDesc}</p>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem", opacity: 0.7 }}>Key Features</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {project.highlights.map((h, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.9rem", color: "rgba(232,237,245,0.75)", marginBottom: "0.65rem", lineHeight: 1.6 }}>
                  <span style={{ color: "var(--cyan)", flexShrink: 0, marginTop: 3 }}>▸</span>{h}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Tags + Visit Site */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            marginBottom: "3rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{
                  background: "rgba(108,59,255,0.12)",
                  border: "1px solid rgba(108,59,255,0.25)",
                  borderRadius: 100, padding: "0.2rem 0.65rem",
                  fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#a78bfa"
                }}>{tag}</span>
              ))}
            </div>
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.65rem 1.3rem", borderRadius: 8,
                  fontFamily: "var(--font-mono)", fontSize: "0.78rem",
                  fontWeight: 700, letterSpacing: "0.05em",
                  background: "var(--cyan)", color: "var(--navy)",
                  border: "1px solid var(--cyan)", cursor: "none"
                }}
              >
                Visit Site
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </motion.a>
            )}
          </div>
        </motion.div>

        {/* Prev / All / Next */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "5rem",
        }}>
          <motion.button
            onClick={onPrev}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileHover={onPrev ? { x: -4 } : {}}
            disabled={!onPrev}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 44, height: 44, borderRadius: "50%",
              background: "none",
              border: "1px solid rgba(255,255,255,0.12)",
              color: onPrev ? "var(--muted)" : "rgba(255,255,255,0.15)",
              opacity: onPrev ? 1 : 0.3,
              cursor: onPrev ? "none" : "default",
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </motion.button>

          <motion.button
            onClick={onBack}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileHover={{ y: -2 }}
            style={{
              background: "none",
              border: "1px solid rgba(0,212,255,0.25)",
              borderRadius: 8,
              padding: "0.6rem 1.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--cyan)",
              cursor: "none",
            }}
          >
            All Projects
          </motion.button>

          <motion.button
            onClick={onNext}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileHover={onNext ? { x: 4 } : {}}
            disabled={!onNext}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 44, height: 44, borderRadius: "50%",
              background: "none",
              border: "1px solid rgba(255,255,255,0.12)",
              color: onNext ? "var(--muted)" : "rgba(255,255,255,0.15)",
              opacity: onNext ? 1 : 0.3,
              cursor: onNext ? "none" : "default",
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.button>
        </div>

      </div>

      {/* Contact CTA */}
      <div className="detail-contact">
        <div className="detail-contact-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--cyan)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Like what you see?
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 900, lineHeight: 1.05,
              letterSpacing: "-0.03em", color: "var(--white)",
              marginBottom: "1rem"
            }}>
              Let's build something<br />
              <em style={{ fontStyle: "italic", color: "var(--cyan)" }}>together.</em>
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--muted)", maxWidth: 360 }}>
              Open to freelance, full-time, or collaboration. Drop me a message anytime.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
            style={{ paddingTop: "0.5rem" }}
          >
            {contactLinks.map(({ icon, label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="contact-link-row"
                style={{ paddingTop: i === 0 ? "3rem" : undefined }}
              >
                <img src={icon} alt={label} style={{ width: 20, height: 20, objectFit: "contain", flexShrink: 0 }} />
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.8rem",
                  color: "var(--muted)",
                  overflow: "hidden", textOverflow: "ellipsis",
                  whiteSpace: "nowrap", minWidth: 0, flex: 1
                }}>{label}</span>
                <span style={{ color: "var(--cyan)", flexShrink: 0, fontSize: "0.85rem" }}>→</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

    </motion.div>
  );
}
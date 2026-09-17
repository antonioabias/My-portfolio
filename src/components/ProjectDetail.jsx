import { motion } from "framer-motion";
import { useState } from "react";
import AboutMeButton from "./AboutMeButton";
import { contactLinks } from "./contactLinks";

export default function ProjectDetail({ project, onBack, onNext, onPrev, setIsHovering }) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ minHeight: "100vh" }}
    >
      <style>{`
        .pd-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 1500px;
          margin: 0 auto;
          width: 92%;
          padding: 6rem 0 2rem;
        }
        .pd-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--muted);
          margin-bottom: 1.2rem;
        }
        .pd-breadcrumb-link {
          color: var(--muted);
          background: none;
          border: none;
          font-family: var(--font-body);
          font-size: 0.9rem;
          cursor: none;
          padding: 0;
        }
        .pd-breadcrumb-link:hover { color: var(--white); }
        .pd-breadcrumb-current {
          font-family: var(--font-body);
          font-weight: 700;
          color: var(--white);
        }

        .pd-main {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          align-items: center;
          flex: 1;
        }

        .pd-gallery-main {
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: #0A0F1E;
          margin-bottom: 0.75rem;
        }
        .pd-gallery-main img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .pd-thumbs {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .pd-thumbs::-webkit-scrollbar { display: none; }
        .pd-thumb {
          flex-shrink: 0;
          width: 76px;
          aspect-ratio: 16/9;
          border-radius: 6px;
          overflow: hidden;
          cursor: none;
          padding: 0;
          background: #0A0F1E;
        }
        .pd-thumb img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .pd-title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.2vw, 2.8rem);
          font-weight: 800;
          color: var(--white);
          line-height: 1.1;
          margin-bottom: 0.3rem;
        }
        .pd-subtitle {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          color: var(--cyan);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1.2rem;
          opacity: 0.8;
        }
        .pd-desc {
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(232,237,245,0.78);
          margin-bottom: 1.3rem;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .pd-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.3rem;
        }
        .pd-chip {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: rgba(232,237,245,0.85);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px;
          padding: 0.35rem 0.8rem;
        }

        .pd-tags {
          display: flex;
          gap: 0.45rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }
        .pd-tag {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 100px;
          padding: 0.2rem 0.65rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--white);
        }

        .pd-visit-row {
          margin-bottom: 1.5rem;
        }

        .pd-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1.2rem;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .pd-nav-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        @media (max-width: 900px) {
          .pd-main {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .pd-shell {
            padding: 6rem 0 1.5rem;
            justify-content: flex-start;
          }
        }
      `}</style>

      <div className="pd-shell">
        <div className="pd-breadcrumb">
          <button
            className="pd-breadcrumb-link"
            onClick={onBack}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Projects
          </button>
          <span style={{ opacity: 0.4 }}>/</span>
          <span className="pd-breadcrumb-current">{project.title}</span>
        </div>

        <div style={{ height: 2, background: project.statusColor, borderRadius: 2, marginBottom: "1.5rem", opacity: 0.8, maxWidth: 70 }} />

        <div className="pd-main">
          <div>
            <motion.div
              key={activeImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="pd-gallery-main"
            >
              <img src={project.gallery[activeImg]} alt={`${project.title} screenshot ${activeImg + 1}`} />
            </motion.div>

            {project.gallery.length > 1 && (
              <div className="pd-thumbs">
                {project.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="pd-thumb"
                    style={{
                      border: i === activeImg ? "2px solid var(--cyan)" : "2px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <img src={img} alt={`thumb ${i + 1}`} style={{ opacity: i === activeImg ? 1 : 0.4 }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="pd-title">{project.title}</h1>
            <div className="pd-subtitle">{project.subtitle}</div>

            <p className="pd-desc">{project.fullDesc}</p>

            <div className="pd-chips">
              {project.highlights.slice(0, 4).map((h, i) => (
                <span key={i} className="pd-chip">{h}</span>
              ))}
            </div>

            <div className="pd-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="pd-tag">{tag}</span>
              ))}
            </div>

            {project.link && (
              <div className="pd-visit-row">
                <AboutMeButton
                  href={project.link}
                  label="Visit Site"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                />
              </div>
            )}

            <div className="pd-nav-row">
              <AboutMeButton
                shape="circle"
                size={46}
                onClick={onPrev}
                disabled={!onPrev}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                }
              />

              <span className="pd-nav-label">Prev</span>

              <AboutMeButton
                label="All Projects"
                onClick={onBack}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              />

              <span className="pd-nav-label">Next</span>

              <AboutMeButton
                shape="circle"
                size={46}
                onClick={onNext}
                disabled={!onNext}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Full contact CTA, same as before */}
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
              <em className="together-shine" style={{ fontStyle: "italic" }}>together.</em>
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

      <style>{`
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
        @media (max-width: 768px) {
          .detail-contact-inner {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </motion.div>
  );
}
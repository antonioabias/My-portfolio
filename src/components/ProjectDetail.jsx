import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import AboutMeButton from "./AboutMeButton";
import { contactLinks } from "./contactLinks";

function ImageLightbox({ images, index, title, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
    };
  }, [onClose, onPrev, onNext]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "absolute",
          top: "1.1rem",
          right: "1.1rem",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          border: "none",
          color: "#fff",
          fontSize: "1.1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ✕
      </button>

      <motion.img
        key={index}
        src={images[index]}
        alt={`${title} zoomed view`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "92vw",
          maxHeight: "88vh",
          objectFit: "contain",
          borderRadius: 8,
        }}
      />

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
            className="lightbox-arrow lightbox-arrow-left"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            className="lightbox-arrow lightbox-arrow-right"
          >
            ›
          </button>
        </>
      )}

      <style>{`
        .lightbox-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.1);
          color: #fff;
          font-size: 1.6rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lightbox-arrow:hover { background: rgba(255,255,255,0.22); }
        .lightbox-arrow-left { left: 1rem; }
        .lightbox-arrow-right { right: 1rem; }
        @media (max-width: 640px) {
          .lightbox-arrow { width: 38px; height: 38px; font-size: 1.3rem; }
        }
      `}</style>
    </motion.div>,
    document.body,
  );
}

export default function ProjectDetail({
  project,
  onBack,
  onNext,
  onPrev,
  setIsHovering,
}) {
  const [activeImg, setActiveImg] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const total = project.gallery.length;
  const goPrevImg = useCallback(
    () => setActiveImg((i) => (i - 1 + total) % total),
    [total],
  );
  const goNextImg = useCallback(
    () => setActiveImg((i) => (i + 1) % total),
    [total],
  );

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
          grid-template-columns: 0.9fr 1.25fr;
          gap: 3rem;
          align-items: start;
        }

        .pd-title-row {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 0.3rem;
        }
        .pd-title {
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 2.6vw, 2.3rem);
          font-weight: 800;
          color: var(--white);
          line-height: 1.1;
        }
        .pd-title-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: none;
          text-decoration: none;
          border-bottom: 2px solid rgba(255,255,255,0.35);
          padding-bottom: 2px;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .pd-title-link:hover {
          color: var(--cyan);
          border-bottom-color: var(--cyan);
        }
        .pd-title-link svg {
          flex-shrink: 0;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }
        .pd-title-link:hover svg {
          opacity: 1;
        }
        
        .pd-subtitle {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--cyan);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1.2rem;
          opacity: 0.8;
        }
        .pd-desc {
          font-size: 0.95rem;
          line-height: 1.75;
          color: rgba(232,237,245,0.78);
          margin-bottom: 1.2rem;
        }
        .pd-plaintext {
          font-size: 0.95rem;
          line-height: 1.75;
          color: rgba(232,237,245,0.75);
          margin-bottom: 0.75rem;
        }
        .pd-plaintext-label {
          color: var(--white);
          font-weight: 600;
        }
        .pd-bullet-list {
          list-style: none;
          margin: 0.4rem 0 0;
          padding: 0;
          padding-left: 1.2rem;
        }
        .pd-bullet-list li {
          position: relative;
          padding-left: 1rem;
          margin-bottom: 0.3rem;
        }
        .pd-bullet-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: var(--cyan);
        }
        .pd-gallery-main {
          position: relative;
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 14px;
          overflow: hidden;
          border: 0px solid rgba(255,255,255,0.08);
          background: var(--navy);
          margin-bottom: 0.75rem;
        }
        @media (max-width: 640px) {
          .pd-gallery-main {
            aspect-ratio: 4/5;
          }
        }
        .pd-gallery-main img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          cursor: zoom-in;
        }

        .pd-gallery-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: none;
          background: rgba(0,0,0,0.55);
          color: #fff;
          font-size: 1.4rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        .pd-gallery-arrow:hover { background: rgba(0,0,0,0.8); }
        .pd-gallery-arrow-left { left: 0.6rem; }
        .pd-gallery-arrow-right { right: 0.6rem; }

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
          object-position: top;
        }
        .pd-nav-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(1rem, 4vw, 2.5rem);
          padding-top: 2rem;
          margin-top: auto;
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
          .pd-main > div:first-child { order: 2; }
          .pd-main > div:last-child { order: 1; }
        }

        @media (max-width: 560px) {
          .pd-nav-row {
            gap: 0.75rem;
          }
          .pd-nav-label {
            display: none;
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

        <div
          style={{
            height: 2,
            background: project.statusColor,
            borderRadius: 2,
            marginBottom: "1.5rem",
            opacity: 0.8,
            maxWidth: 70,
          }}
        />

        <div className="pd-main">
          <div>
            <div className="pd-title-row">
              <a
                href={project.link || "#"}
                target={project.link ? "_blank" : undefined}
                rel={project.link ? "noreferrer" : undefined}
                onClick={!project.link ? (e) => e.preventDefault() : undefined}
                className="pd-title pd-title-link"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {project.title}
                <svg width="0.6em" height="0.6em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            <div className="pd-subtitle">{project.subtitle}</div>

            <p className="pd-desc">{project.fullDesc}</p>

            <div className="pd-plaintext">
              <span className="pd-plaintext-label">Key features:</span>
              <ul className="pd-bullet-list">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>

            <div className="pd-plaintext">
              <span className="pd-plaintext-label">Built with:</span>
              <ul className="pd-bullet-list">
                {project.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="pd-gallery-main">
              <motion.img
                key={activeImg}
                src={project.gallery[activeImg]}
                alt={`${project.title} screenshot ${activeImg + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                onClick={() => setZoomOpen(true)}
              />

              {project.gallery.length > 1 && (
                <>
                  <button
                    onClick={goPrevImg}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    aria-label="Previous image"
                    className="pd-gallery-arrow pd-gallery-arrow-left"
                  >
                    ‹
                  </button>
                  <button
                    onClick={goNextImg}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    aria-label="Next image"
                    className="pd-gallery-arrow pd-gallery-arrow-right"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

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
                      border:
                        i === activeImg
                          ? "2px solid var(--cyan)"
                          : "2px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <img
                      src={img}
                      alt={`thumb ${i + 1}`}
                      style={{ opacity: i === activeImg ? 1 : 0.4 }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="pd-nav-row">
          <AboutMeButton
            shape="circle"
            size={44}
            onClick={onPrev}
            disabled={!onPrev}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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
            size={44}
            onClick={onNext}
            disabled={!onNext}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            }
          />
        </div>
      </div>

      <AnimatePresence>
        {zoomOpen && (
          <ImageLightbox
            images={project.gallery}
            index={activeImg}
            title={project.title}
            onClose={() => setZoomOpen(false)}
            onPrev={goPrevImg}
            onNext={goNextImg}
          />
        )}
      </AnimatePresence>

      {/* Full contact CTA, same as before */}
      <div className="detail-contact">
        <div className="detail-contact-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--cyan)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Like what you see?
            </div>

            <div className="detail-heading-group">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "var(--white)",
                  marginBottom: "1rem",
                }}
              >
                Let's build something
                <br />
                <em className="together-shine" style={{ fontStyle: "italic" }}>
                  together.
                </em>
              </h2>
              <p className="detail-note">
                Open to freelance, full-time, or collaboration. Drop me a
                message anytime.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
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
                <img
                  src={icon}
                  alt={label}
                  style={{
                    width: 20,
                    height: 20,
                    objectFit: "contain",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    color: "var(--cyan)",
                    flexShrink: 0,
                    fontSize: "0.85rem",
                  }}
                >
                  →
                </span>
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
          gap: 5rem;
          align-items: start;
        }
        .detail-heading-group {
          width: fit-content;
          max-width: 100%;
        }
        .detail-note {
          width: 0;
          min-width: 100%;
          font-size: 1rem;
          color: var(--muted);
        }
        @media (min-width: 769px) {
          .detail-note {
            text-align: justify;
          }
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
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: together-shine-sweep 4s linear infinite;
        }
        @keyframes together-shine-sweep {
          0% { background-position: 200% 0; }
          100% { background-position: 0% 0; }
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

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import aca2022 from "../assets/Certificate/ACA-2022.png";
import claude101 from "../assets/Certificate/claude101.jpg";

const ISSUER_LOGOS = {
  "Cisco": "https://thesvg.org/icons/cisco/default.svg",
  "Google Cloud Skills Boost": "https://images.seeklogo.com/logo-png/33/2/google-cloud-logo-png_seeklogo-336116.png",
  "Amazon Web Services (AWS)": "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/aws-color.png",
  "Amazon": "https://learnsecurity.amazon.com/img/global/logo.svg",
  "Sololearn": "https://blob.sololearn.com/avatars/sololearn.png",
  "Anthropic": "https://thesvg.org/icons/anthropic/default.svg"
};

const certs = [
  { href: "https://www.credly.com/badges/2a9504f4-4647-4427-8b8c-ec729b1670e3/public_url", image: "https://images.credly.com/size/340x340/images/e3541a0c-dd4a-4820-8052-5001006efc85/blob", issuer: "Amazon Web Services (AWS)", title: "Cloud Foundations", alt: "Cloud Foundations" },
  { href: "https://www.credly.com/badges/86272c73-d6fc-45bb-be5c-4775f3d5942c/public_url", image: "https://images.credly.com/size/340x340/images/07e7ba52-aea4-431f-ba2d-a4113efd1d5a/blob", issuer: "Amazon Web Services (AWS)", title: "Cloud Operations", alt: "Cloud Operations" },
  { href: "https://www.credly.com/badges/cb1341ea-775d-489f-8149-da2f35459e15/public_url", image: "https://images.credly.com/size/340x340/images/fcafd0c9-42da-4703-a191-0c397203dc1b/blob", issuer: "Amazon Web Services (AWS)", title: "Cloud Architecting", alt: "Cloud Architecting" },
  { href: "https://www.credly.com/badges/a15d5924-0d8a-4b89-ab2b-e46c6e03c64d/public_url", image: "https://images.credly.com/size/340x340/images/bb3211c0-a562-44ec-a8b5-df54deb0e5e9/blob", issuer: "Amazon Web Services (AWS)", title: "Cloud Developing", alt: "Cloud Developing" },
  { href: "https://drive.google.com/file/d/1yS7EZQEm0ySqfp4tfGDngfhvo8YH2OsM/view?usp=sharing", image: aca2022, issuer: "Amazon", title: "Cybersecurity Awareness", alt: "Cybersecurity Awareness" },
  { href: "https://verify.skilljar.com/c/s3q85r47e7gg", image: claude101, issuer: "Anthropic", title: "Claude 101", alt: "Claude 101" },

  { href: "https://www.credly.com/badges/d276c12b-93ca-432c-93cf-939194450f2e/public_url", image: "https://images.credly.com/size/340x340/images/cef82b2e-970a-4318-8e59-c3e26b7f5c19/image.png", issuer: "Google Cloud Skills Boost", title: "Prompt Design in Vertex AI Skill Badge", alt: "Prompt Design in Vertex AI Skill Badge" },
  { href: "https://www.sololearn.com/certificates/CT-3IAYESW6", image: "https://api2.sololearn.com/v2/certificates/CT-3IAYESW6/image/jpg?t=638455748691031950", issuer: "Sololearn", title: "Python Core", alt: "Python certificate" },
  { href: "https://www.sololearn.com/certificates/CT-EZI6DR5D", image: "https://api2.sololearn.com/v2/certificates/CT-EZI6DR5D/image/jpg?t=638422726540805970", issuer: "Sololearn", title: "C", alt: "C certificate" },
  { href: "https://www.sololearn.com/certificates/CT-LMZMC23U", image: "https://api2.sololearn.com/v2/certificates/CT-LMZMC23U/image/jpg?t=638755188080910400", issuer: "Sololearn", title: "SQL Fundamentals", alt: "SQL certificate" },
  { href: "https://www.credly.com/badges/ff7d733e-0bc4-4eb4-8b24-334cb765520b/public_url", image: "https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/twitter_thumb_201604_I2CS__1_.png", issuer: "Cisco", title: "Introduction to Cybersecurity", alt: "Introduction to Cybersecurity" },
];

const CertRow = ({ cert, i, setIsHovering, onClick }) => (
  <motion.button
    key={cert.title}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.05, duration: 0.4 }}
    whileHover={{ x: 6 }}
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
    onClick={onClick}
    style={{
      display: "flex", alignItems: "center", gap: "1.25rem",
      padding: "1.4rem 0", background: "transparent", border: "none",
      borderBottom: "2px solid rgba(255,255,255,0.07)",
      cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.2s",
    }}
  >
    <img src={ISSUER_LOGOS[cert.issuer]} alt={cert.issuer} loading="lazy"
      style={{ width: 48, height: 48, objectFit: "contain", flexShrink: 0 }} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--cyan)", opacity: 0.75, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "0.3rem" }}>
        {cert.issuer}
      </span>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "var(--white)", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>
        {cert.title}
      </span>
    </div>
    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--cyan)", opacity: 0.5, flexShrink: 0 }}>View →</span>
  </motion.button>
);

export default function Certifications({ setIsHovering }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const left = certs.slice(0, 6);
  const right = certs.slice(6);

  return (
    <section id="certifications" style={{ padding: "7rem 0", background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(17,24,39,0.97) 100%)", position: "relative", zIndex: 1 }}>
      <style>{`
        .certs-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          width: min(92%, 1200px);
          padding: 0 1.5rem;
        }
        .certs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 4rem;
        }
        .certs-single {
          display: none;
        }
        @media (max-width: 768px) {
          .certs-wrapper {
            width: 92%;
          }
          .certs-grid {
            display: none;
          }
          .certs-single {
            display: block;
          }
        }
      `}</style>

      <div className="certs-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}
        >
          Certifications
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 900, marginBottom: "0.5rem", letterSpacing: "-0.03em" }}
        >
          Credentials
        </motion.h2>
        <p style={{ marginBottom: "2.5rem", fontSize: "1rem" }}>
          Planning to earn more in the future. Click any credential to view and verify.
        </p>

        {/* Desktop: two columns */}
        <div className="certs-grid">
          <div>{left.map((cert, i) => <CertRow key={cert.title} cert={cert} i={i} setIsHovering={setIsHovering} onClick={() => setSelected(cert)} />)}</div>
          <div>{right.map((cert, i) => <CertRow key={cert.title} cert={cert} i={i} setIsHovering={setIsHovering} onClick={() => setSelected(cert)} />)}</div>
        </div>

        {/* Mobile: single column */}
        <div className="certs-single">
          {certs.map((cert, i) => <CertRow key={cert.title} cert={cert} i={i} setIsHovering={setIsHovering} onClick={() => setSelected(cert)} />)}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "1rem" }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative", background: "var(--slate)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 16, padding: "1.5rem", maxWidth: 560, width: "100%", boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}
            >
              <button
                onClick={() => setSelected(null)}
                style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "rgba(255,255,255,0.07)", border: "none", color: "var(--white)", width: 32, height: 32, borderRadius: "50%", fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >&#x2715;</button>

              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: "0.4rem" }}>
                {selected.issuer}
              </span>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--white)" }}>
                {selected.title}
              </div>
              <div style={{ width: "100%", background: "rgba(255,255,255,0.04)", borderRadius: 10, overflow: "hidden" }}>
                <img src={selected.image} alt={selected.alt || selected.title} style={{ width: "100%", height: "auto", display: "block", borderRadius: 10 }} />
              </div>
              {selected.href && (
                <a
                  href={selected.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", width: "100%", marginTop: "1.5rem", padding: "0.85rem 1.5rem", background: "rgba(0,212,255,0.1)", border: "1px solid var(--cyan)", borderRadius: 10, color: "var(--cyan)", fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none", transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => { setIsHovering(true); e.currentTarget.style.background = "var(--cyan)"; e.currentTarget.style.color = "var(--navy)"; e.currentTarget.style.boxShadow = "0 0 15px rgba(0,212,255,0.4)"; }}
                  onMouseLeave={(e) => { setIsHovering(false); e.currentTarget.style.background = "rgba(0,212,255,0.1)"; e.currentTarget.style.color = "var(--cyan)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  Verify Credentials
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import aca2022 from "../images/ACA-2022.png";


const certs = [
  {
    href: "https://www.credly.com/badges/ff7d733e-0bc4-4eb4-8b24-334cb765520b/public_url",
    image: "https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/twitter_thumb_201604_I2CS__1_.png",
    issuer: "Cisco",
    title: "Introduction to Cybersecurity",
    alt: "Introduction to Cybersecurity",
  },
  {
    href: "https://www.credly.com/badges/d276c12b-93ca-432c-93cf-939194450f2e/public_url",
    image: "https://images.credly.com/size/340x340/images/cef82b2e-970a-4318-8e59-c3e26b7f5c19/image.png",
    issuer: "Google Cloud Skills Boost",
    title: "Prompt Design in Vertex AI Skill Badge",
    alt: "Prompt Design in Vertex AI Skill Badge",
  },
  {
    href: "https://www.credly.com/badges/2a9504f4-4647-4427-8b8c-ec729b1670e3/public_url",
    image: "https://images.credly.com/size/340x340/images/e3541a0c-dd4a-4820-8052-5001006efc85/blob",
    issuer: "Amazon Web Services (AWS)",
    title: "Cloud Foundations",
    alt: "Cloud Foundations",
  },
  {
    href: "https://www.credly.com/badges/86272c73-d6fc-45bb-be5c-4775f3d5942c/public_url",
    image: "https://images.credly.com/size/340x340/images/07e7ba52-aea4-431f-ba2d-a4113efd1d5a/blob",
    issuer: "Amazon Web Services (AWS)",
    title: "Cloud Operations",
    alt: "Cloud Operations",
  },
  {
    href: "https://www.credly.com/badges/cb1341ea-775d-489f-8149-da2f35459e15/public_url",
    image: "https://images.credly.com/size/340x340/images/fcafd0c9-42da-4703-a191-0c397203dc1b/blob",
    issuer: "Amazon Web Services (AWS)",
    title: "Cloud Architecting",
    alt: "Cloud Architecting",
  },
  {
    href: "https://www.credly.com/badges/a15d5924-0d8a-4b89-ab2b-e46c6e03c64d/public_url",
    image: "https://images.credly.com/size/340x340/images/bb3211c0-a562-44ec-a8b5-df54deb0e5e9/blob",
    issuer: "Amazon Web Services (AWS)",
    title: "Cloud Developing",
    alt: "Cloud Developing",
  },
  {
    href: "https://www.sololearn.com/certificates/CT-3IAYESW6",
    image: "https://api2.sololearn.com/v2/certificates/CT-3IAYESW6/image/jpg?t=638455748691031950",
    issuer: "Sololearn",
    title: "Python Core",
    alt: "Python certificate",
  },
  {
    href: "https://www.sololearn.com/certificates/CT-EZI6DR5D",
    image: "https://api2.sololearn.com/v2/certificates/CT-EZI6DR5D/image/jpg?t=638422726540805970",
    issuer: "Sololearn",
    title: "C",
    alt: "C certificate",
  },
  {
    href: "https://www.sololearn.com/certificates/CT-LMZMC23U",
    image: "https://api2.sololearn.com/v2/certificates/CT-LMZMC23U/image/jpg?t=638755188080910400",
    issuer: "Sololearn",
    title: "SQL Fundamentals",
    alt: "SQL certificate",
  },
  {
    href: "https://drive.google.com/file/d/1yS7EZQEm0ySqfp4tfGDngfhvo8YH2OsM/view?usp=sharing",
    image: aca2022,
    issuer: "Amazon",
    title: "Cybersecurity Awareness",
    alt: "Cybersecurity Awareness",
  },
];

export default function Certifications({ setIsHovering }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [selected]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="certifications" style={{ padding: "7rem 0", background: "var(--navy-mid)", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}
        >
          Certifications
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, marginBottom: "3rem", letterSpacing: "-0.02em" }}
        >
          Credentials
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          {certs.map((cert, i) => (
            <motion.button
              key={cert.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(0,212,255,0.35)", zIndex: 10 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => setSelected(cert)}
              style={{
                display: "flex", alignItems: "center", gap: "1rem",
                background: "var(--slate)", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10, padding: "1rem 1.25rem",
                cursor: "pointer", textAlign: "left", position: "relative",
                transition: "box-shadow 0.3s",
              }}
            >
              <img
                src={cert.image}
                alt={cert.alt || cert.title}
                loading="lazy"
                style={{ width: 72, height: 72, objectFit: "contain", borderRadius: 10, flexShrink: 0 }}
              />
              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--cyan)", opacity: 0.7, display: "block", marginBottom: "0.2rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {cert.issuer}
                </span>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 600, color: "var(--white)" }}>
                  {cert.title}
                </h4>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)",
              backdropFilter: "blur(6px)", display: "flex",
              alignItems: "center", justifyContent: "center", zIndex: 9999,
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative", background: "var(--slate)",
                border: "1px solid rgba(0,212,255,0.2)", borderRadius: 16,
                padding: "1.5rem", maxWidth: 560, width: "90%",
                boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
              }}
            >
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: "absolute", top: "0.75rem", right: "0.75rem",
                  background: "rgba(255,255,255,0.07)", border: "none",
                  color: "var(--white)", width: 32, height: 32, borderRadius: "50%",
                  fontSize: "1rem", cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}
              >
                &#x2715;
              </button>
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
                  href={selected.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    width: "100%",
                    marginTop: "1.5rem",
                    padding: "0.85rem 1.5rem",
                    background: "rgba(0, 212, 255, 0.1)",
                    border: "1px solid var(--cyan)",
                    borderRadius: 10,
                    color: "var(--cyan)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    setIsHovering(true);
                    e.currentTarget.style.background = "var(--cyan)";
                    e.currentTarget.style.color = "var(--navy)";
                    e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 212, 255, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    setIsHovering(false);
                    e.currentTarget.style.background = "rgba(0, 212, 255, 0.1)";
                    e.currentTarget.style.color = "var(--cyan)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
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
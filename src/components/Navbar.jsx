import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ setIsHovering }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Beyond", href: "#hobbies" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: scrolled ? "0.8rem 1.5rem" : "1.2rem 1.5rem",
          background: "rgba(10,15,30,0.75)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,212,255,0.08)",
          transition: "padding 0.3s",
        }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            fontFamily: "var(--font-mono)", fontSize: "1.1rem",
            fontWeight: 700, color: "var(--white)", letterSpacing: "0.05em",
            zIndex: 101,
          }}
        >
          <span style={{ color: "var(--cyan)" }}>&lt;</span>
          AA
          <span style={{ color: "var(--cyan)" }}>/&gt;</span>
        </motion.a>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}>
            {links.map((link) => (
              <li key={link.label}>
                <motion.a
                  href={link.href}
                  whileHover={{ color: "var(--cyan)", y: -2 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.8rem",
                    color: "var(--muted)", letterSpacing: "0.1em",
                    textTransform: "uppercase", transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop status / Mobile hamburger */}
        {!isMobile ? (
          <div style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)",
          }}>
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                display: "inline-block", width: 8, height: 8,
                borderRadius: "50%", background: "#22c55e",
              }}
            />
            Open to work
          </div>
        ) : (
          <button
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              background: "none", border: "none",
              color: "var(--white)", zIndex: 101,
              display: "flex", flexDirection: "column",
              gap: 5, padding: "4px", cursor: "pointer",
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  menuOpen
                    ? i === 0
                      ? { rotate: 45, y: 7 }
                      : i === 1
                      ? { opacity: 0 }
                      : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                transition={{ duration: 0.25 }}
                style={{
                  display: "block", width: 22, height: 2,
                  background: "var(--cyan)", borderRadius: 2,
                }}
              />
            ))}
          </button>
        )}
      </motion.nav>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed", top: 0, left: 0, right: 0,
              zIndex: 99, paddingTop: "5rem", paddingBottom: "2rem",
              background: "rgba(10,15,30,0.97)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(0,212,255,0.1)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem",
            }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: "1rem",
                  color: "var(--muted)", letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {link.link}
                {link.label}
              </motion.a>
            ))}

            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)",
              marginTop: "0.5rem",
            }}>
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  display: "inline-block", width: 8, height: 8,
                  borderRadius: "50%", background: "#22c55e",
                }}
              />
              Open to work
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
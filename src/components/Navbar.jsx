import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar({ setIsHovering }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: scrolled ? "0.8rem 3rem" : "1.2rem 3rem",
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
        }}
      >
        <span style={{ color: "var(--cyan)" }}>&lt;</span>
        AA
        <span style={{ color: "var(--cyan)" }}>/&gt;</span>
      </motion.a>

      {/* Links */}
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

      {/* Status */}
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
    </motion.nav>
  );
}
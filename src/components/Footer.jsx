import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        padding: "2rem 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          width: isMobile ? "90%" : "63%",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? "0.5rem" : "0",
          textAlign: isMobile ? "center" : "left",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--muted)",
        }}
      >
        <span>
          <span style={{ color: "var(--cyan)" }}>&lt;</span>
          AA
          <span style={{ color: "var(--cyan)" }}>/&gt;</span>
        </span>
        <span>Built by Antonio Abias Jr. © 2025</span>
        <span>John 3:16</span>
      </div>
    </motion.footer>
  );
}
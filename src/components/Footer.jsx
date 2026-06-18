import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{ padding: "2rem 0", borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", width: "63%", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)" }}>
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
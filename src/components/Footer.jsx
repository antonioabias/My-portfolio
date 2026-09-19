import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const formatted = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Manila",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        padding: "2rem 0",
        borderTop: "1px solid #2f3336",
        background: "#000000",
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
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem",
          color: "var(--muted)",
        }}
      >
        <span>{time} PHT</span>
        <span>Built by Antonio Abias Jr. © 2025</span>
        <span>John 3:16</span>
      </div>
    </motion.footer>
  );
}

import { motion } from "framer-motion";

const links = [
  {
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1280px-Gmail_icon_%282020%29.svg.png",
    label: "Send an email",
    href: "https://mail.google.com/mail/?view=cm&to=antonioabias23.aa@gmail.com",
  },
  {
    icon: "https://cdn.simpleicons.org/github/FFFFFF",
    label: "View GitHub",
    href: "https://github.com/antonioabias",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/linkedin.webp",
    label: "Let's connect",
    href: "https://www.linkedin.com/in/antonio-abias-501a912b8/",
  },
];

export default function Contact({ setIsHovering }) {
  return (
    <section id="contact" style={{ padding: "7rem 0", position: "relative", zIndex: 1 }}>    
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 4rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}
        >   
          Contact
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(260px, 0.9fr)",
            gap: "2.5rem",
            alignItems: "start",
            maxWidth: 920,
          }}
        >
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
              Let's build something{" "}
              <span style={{ color: "var(--cyan)" }}>together.</span>
            </h2>
            <p style={{ fontSize: "1rem", marginBottom: "2.5rem", maxWidth: 520 }}>
              I'm currently open to new opportunities: freelance, full-time, or collaboration. Drop me a message.
            </p>

          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem", paddingTop: "1.75rem" }}>
            {links.map(({ icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 8, color: "var(--cyan)" }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "1rem", width: "100%", fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--muted)", transition: "color 0.2s" }}
              >
                <span style={{ textAlign: "right" }}>{label}</span>
                <img
                  src={icon}
                  alt={label}
                  style={{ width: 18, height: 18, objectFit: "contain" }}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
  
}
import { motion } from "framer-motion";

const projects = [
  {
    num: "01", title: "E-Buddy",
    tags: ["React.js", "Node.js", "Firebase"],
    desc: "A personalized web-based board exam reviewer built exclusively for criminology students. Uses the C4.5 decision tree algorithm to adapt study sessions and recommend retakes based on performance.",
    badge: "🔒 Private",
    note: "For Crim students only",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
  },
  {
    num: "02", title: "Sales Information System",
    tags: ["PHP", "MySQL", "JavaScript"],
    desc: "A web-based solution that automates sales tracking and inventory management for a local shop. Reduced manual errors through real-time data handling and intuitive UI.",
    badge: "🔒 Private",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  },
  {
    num: "03", title: "Zombie Maze Game",
    tags: ["Java", "Game Dev", "2017"],
    desc: "A 2D maze survival game built for the SHS Software Festival. Players navigate maze levels while avoiding zombies. Designed and developed solo combining gameplay mechanics with custom visuals.",
    badge: "🏆 SHS Software Festival",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
  },
  {
    num: "04", title: "AC Architectural Studio",
    tags: ["React.js", "In progress"],
    desc: "A portfolio website for an architectural design studio showcasing projects, services, and design philosophy with a clean, visual-first approach.",
    badge: "🔜 In progress",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80",
    dashed: true,
  },
];

export default function Projects({ setIsHovering }) {
  return (
    <section id="projects" style={{ padding: "7rem 0", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}
        >
          Projects
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, marginBottom: "3rem", letterSpacing: "-0.02em" }}
        >
          Things I've built.
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem" }}>
          {projects.map(({ num, title, tags, desc, badge, note, img, dashed }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4, borderColor: "rgba(0,212,255,0.25)" }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{
                position: "relative", background: "var(--slate)", overflow: "hidden",
                border: `1px ${dashed ? "dashed" : "solid"} rgba(0,212,255,${dashed ? "0.15" : "0.06"})`,
                borderRadius: 12, transition: "border-color 0.3s",
              }}
            >
              {/* Image */}
              <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
                <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(30%) brightness(0.7)", transition: "transform 0.4s" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--slate) 0%, transparent 60%)" }} />
              </div>

              <div style={{ padding: "1.5rem" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--cyan)", opacity: 0.5, marginBottom: "0.75rem" }}>{num}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  {tags.map((tag) => (
                    <span key={tag} style={{ background: "rgba(108,59,255,0.12)", border: "1px solid rgba(108,59,255,0.25)", borderRadius: 100, padding: "0.2rem 0.65rem", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#a78bfa" }}>{tag}</span>
                  ))}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "var(--white)", marginBottom: "0.6rem" }}>{title}</h3>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1rem" }}>{desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, padding: "0.3rem 0.75rem" }}>{badge}</span>
                  {note && <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--cyan)", opacity: 0.7 }}>{note}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
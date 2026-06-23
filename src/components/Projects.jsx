import { motion } from "framer-motion";
import { useState } from "react";

const PLACEHOLDER = (label) =>
  `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' style='background:%231E2A3A'><text x='50%25' y='50%25' fill='%2300D4FF' font-family='monospace' font-size='18' dominant-baseline='middle' text-anchor='middle'>${encodeURIComponent(label)}</text></svg>`;
  

const ebGallery = Object.values(
  import.meta.glob("../assets/eb*.png", { eager: true })
).map(m => m.default);

export const projects = [
  {
    id: "archi", link: "https://ac-archi-demo.vercel.app/", num: "01", title: "AC Architectural Studio", subtitle: "Portfolio Website",
    status: "IN PROGRESS", statusColor: "#00D4FF", tags: ["React.js", "Framer Motion"],
    shortDesc: "Visual-first portfolio site for an architectural design studio.",
    fullDesc: "A portfolio website for AC Architectural Studio showcasing projects, services, and design philosophy with a clean, visual-first approach. Built with React and Framer Motion for smooth page transitions. Designed to feel as refined as the architecture it represents.",
    highlights: ["Visual-first layout, imagery-led", "Framer Motion page transitions", "CMS-ready project grid", "Mobile-first responsive design"],
    hasCode: true,
    gallery: [PLACEHOLDER("Archi Studio · Screenshot 1 — Replace me"), PLACEHOLDER("Archi Studio · Screenshot 2 — Replace me"), PLACEHOLDER("Archi Studio · Screenshot 3 — Replace me")],
    coverImg: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
  },
  {
    id: "ebuddy", link: "https://e-buddy-8c08f.web.app/", num: "02", title: "E-Buddy", subtitle: "Adaptive Board Exam Reviewer",
    status: "PRIVATE", statusColor: "#6C3BFF", tags: ["React.js", "Node.js", "Firebase"],
    shortDesc: "Web-based board exam reviewer built exclusively for criminology students.",
    fullDesc: "E-Buddy is a personalized web-based board exam reviewer for criminology students. It uses the C4.5 decision tree algorithm to adapt study sessions dynamically, recommending topics to retake based on the student's actual performance data. Built with React on the front-end, Node.js for the API layer, and Firebase for real-time data and auth.",
    highlights: ["C4.5 decision tree algorithm for adaptive sessions", "Real-time performance tracking via Firebase", "Auth system with role-based access", "Mobile-responsive reviewer interface"],
    hasCode: true, 
    gallery: ebGallery,  
    coverImg: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
  },
  {
    id: "sales", link: "https://sales-demo.vercel.app/", num: "03", title: "Sales Information System", subtitle: "Inventory & Sales Automation",
    status: "COMPLETED", statusColor: "#22c55e", tags: ["PHP", "MySQL", "JavaScript"],
    shortDesc: "Automated sales tracking and inventory management for a local shop.",
    fullDesc: "A web-based solution that automates sales tracking and inventory management for a local retail shop. Reduced manual errors through real-time data handling and an intuitive UI. Features include POS-style transaction logging, low-stock alerts, and a reporting dashboard that exports summaries for the owner.",
    highlights: ["Real-time inventory sync with MySQL", "Sales reporting and export", "Low-stock alert system", "Clean POS-style transaction UI"],
    hasCode: false,
    gallery: [PLACEHOLDER("Sales System · Screenshot 1 — Add your photo"), PLACEHOLDER("Sales System · Screenshot 2 — Add your photo"), PLACEHOLDER("Sales System · Screenshot 3 — Add your photo")],
    coverImg: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  },
  {
    id: "zombie", link: "https://zombie-maze-demo.vercel.app/", num: "04", title: "Zombie Maze Game", subtitle: "SHS Software Festival",
    status: "FESTIVAL WIN", statusColor: "#FFBD2E", tags: ["Java", "Game Dev", "2017"],
    shortDesc: "2D maze survival game built for the SHS Software Festival.",
    fullDesc: "A 2D maze survival game designed and developed for the Senior High School Software Festival. Players navigate procedurally-arranged maze levels while avoiding zombies with pathfinding AI. Everything including gameplay mechanics, sprite design, and sound was handled by the team, combining technical execution with Visual Arts training.",
    highlights: ["Custom zombie pathfinding AI", "Multi-level maze progression", "Hand-drawn sprite assets", "Led the team, handled majority of development"],
    hasCode: false,
    gallery: [PLACEHOLDER("Zombie Maze · Screenshot 1 — Add your photo"), PLACEHOLDER("Zombie Maze · Screenshot 2 — Add your photo"), PLACEHOLDER("Zombie Maze · Screenshot 3 — Add your photo")],
    coverImg: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
  },
];

function ProjectCard({ project, onClick, setIsHovering }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5 }}
      onClick={onClick}
      onMouseEnter={() => { setIsHovering(true); setHovered(true); }}
      onMouseLeave={() => { setIsHovering(false); setHovered(false); }}
      style={{
        position: "relative", background: "var(--slate)",
        border: `1px solid ${hovered ? project.statusColor + "44" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 14, overflow: "hidden", cursor: "none",
        transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${project.statusColor}22` : "none",
      }}
    >
      <div style={{ height: 3, background: project.statusColor, opacity: hovered ? 1 : 0.5, transition: "opacity 0.3s" }} />

      <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${project.coverImg})`, backgroundSize: "cover", backgroundPosition: "center", filter: "grayscale(25%) brightness(0.65)", transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 0.5s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--slate) 0%, rgba(30,42,58,0.5) 55%, transparent 100%)" }} />
        <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.2 }}
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.4)", backdropFilter: "blur(6px)", borderRadius: 8, padding: "0.45rem 1rem", fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--cyan)", letterSpacing: "0.08em", whiteSpace: "nowrap" }}
        >Explore Project</motion.div>
      </div>

      <div style={{ padding: "1.4rem 1.5rem 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", opacity: 0.45 }}>{project.num}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: project.statusColor, border: `1px solid ${project.statusColor}44`, borderRadius: 100, padding: "0.15rem 0.55rem", letterSpacing: "0.1em" }}>{project.status}</span>
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--white)", marginBottom: "0.3rem", letterSpacing: "-0.01em" }}>{project.title}</h3>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--muted)", marginBottom: "0.9rem", lineHeight: 1.4 }}>{project.subtitle}</p>
        <p style={{ fontSize: "0.875rem", color: "rgba(232,237,245,0.65)", lineHeight: 1.65, marginBottom: "1.1rem" }}>{project.shortDesc}</p>
        <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{ background: "rgba(108,59,255,0.1)", border: "1px solid rgba(108,59,255,0.2)", borderRadius: 100, padding: "0.18rem 0.6rem", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#a78bfa" }}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ setIsHovering, onSelectProject }) {
  return (
    <section id="projects" style={{ padding: "7rem 0", position: "relative", zIndex: 1 }}>
      <style>{`
        .projects-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          width: min(100%, 63%);
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .projects-wrapper {
            width: 92%;
          }
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="projects-wrapper">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}
        >Projects</motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>Things I've built.</h2>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--muted)" }}>Click any card to see the full story.</p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => onSelectProject(project)} setIsHovering={setIsHovering} />
          ))}
        </div>
      </div>
    </section>
  );
}
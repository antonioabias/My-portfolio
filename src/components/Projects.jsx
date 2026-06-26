import { motion } from "framer-motion";
import { useState } from "react";

import coverZombie from "../assets/Zombie Maze/covers.zombie.jpeg";

const PLACEHOLDER = (label) =>
  `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' style='background:%231E2A3A'><text x='50%25' y='50%25' fill='%2300D4FF' font-family='monospace' font-size='18' dominant-baseline='middle' text-anchor='middle'>${encodeURIComponent(label)}</text></svg>`;


const sisGallery = Object.entries(
  import.meta.glob("../assets/Sales Info/sis*.png", { eager: true })
)
  .sort(([pathA], [pathB]) => 
    pathA.localeCompare(pathB, undefined, { numeric: true })
  )
  .map(([, mod]) => mod.default);

const ebGallery = Object.entries(
  import.meta.glob("../assets/e-Buddy/eb*.png", { eager: true })
)
  .sort(([pathA], [pathB]) => 
    pathA.localeCompare(pathB, undefined, { numeric: true })
  )
  .map(([, mod]) => mod.default);


export const projects = [
  {
    id: "archi", link: "https://ac-archi-demo.vercel.app/", num: "01", title: "AC Architectural Studio", subtitle: "Portfolio Website",
    status: "IN PROGRESS", statusColor: "#00D4FF", tags: ["React.js", "Framer Motion"],
    shortDesc: "Visual-first portfolio site for an architectural design studio.",
    fullDesc: "A portfolio website for AC Architectural Studio showcasing projects, services, and design philosophy with a clean, visual-first approach. Built with React and Framer Motion for smooth page transitions. Designed to feel as refined as the architecture it represents.",
    highlights: ["Visual-first layout, imagery-led", "Framer Motion page transitions", "CMS-ready project grid", "Mobile-first responsive design"],
    gallery: [PLACEHOLDER("Archi Studio · Screenshot 1"), PLACEHOLDER("Archi Studio · Screenshot 2"), PLACEHOLDER("Archi Studio · Screenshot 3")],
    coverImg: "https://i.pinimg.com/1200x/a0/25/81/a025811caddd217f972b2cc88b40f03c.jpg",
  },
  {
    id: "ebuddy", link: "https://e-buddy-8c08f.web.app/", num: "02", title: "e-Buddy", subtitle: "Adaptive Board Exam Reviewer",
    status: "PRIVATE", statusColor: "#6C3BFF", tags: ["React.js", "Node.js", "Firebase"],
    shortDesc: "Web-based board exam reviewer built exclusively for criminology students.",
    fullDesc: "E-Buddy is a personalized web-based board exam reviewer for criminology students. It uses the C4.5 decision tree algorithm to adapt study sessions dynamically, recommending topics to retake based on the student's actual performance data. Built with React on the front-end, Node.js for the API layer, and Firebase for real-time data and auth.",
    highlights: ["C4.5 decision tree algorithm for adaptive sessions", "Real-time performance tracking via Firebase", "Auth system with role-based access", "Mobile-responsive reviewer interface"],
    gallery: ebGallery,
    coverImg: "https://i.pinimg.com/736x/2a/86/27/2a86276bd2decac2301941f90d6780d8.jpg",
  },
  {
    id: "sales", link: null, num: "03", title: "Sales Information System", subtitle: "Inventory & Sales Management",
    status: "COMPLETED", statusColor: "#22c55e", tags: ["PHP", "MySQL", "JavaScript", "XAMPP"],
    shortDesc: "Web-based sales and inventory system built for a local shop with loyalty card tracking.",
    fullDesc: "A web-based sales and inventory management system built for a local shop. Features customer records, product inventory, loyalty card tracking, and a sales dashboard to reduce manual errors and streamline daily operations. Built with PHP and MySQL on XAMPP, with a clean frontend and full CRUD across all modules.",
    highlights: ["Special card loyalty module with full CRUD", "Product inventory management and tracking", "Customer records with database-linked profiles","Sales monitoring dashboard with transaction history","Role-based auth with login and signup",],
    hasCode: false,
    gallery: sisGallery,
    coverImg: "https://i.pinimg.com/736x/5d/2d/18/5d2d18d7d5c48a781f2c2e8bcd4115d4.jpg",
  },
  {
    id: "zombie", link: "https://zombie-maze-demo.vercel.app/", num: "04", title: "Zombie Maze", subtitle: "SHS Software Festival",
    status: "FESTIVAL WIN", statusColor: "#FFBD2E", tags: ["Java", "Game Dev", "2017"],
    shortDesc: "2D maze survival game built for the SHS Software Festival.",
    fullDesc: "A 2D maze survival game designed and developed for the Senior High School Software Festival. Players navigate procedurally-arranged maze levels while avoiding zombies with pathfinding AI. Everything including gameplay mechanics, sprite design, and sound was handled by the team, combining technical execution with Visual Arts training.",
    highlights: ["Custom zombie pathfinding AI", "Multi-level maze progression", "Hand-drawn sprite assets", "Led the team, handled majority of development"],
    gallery: [PLACEHOLDER("Zombie Maze · Screenshot 1 — Add your photo"), PLACEHOLDER("Zombie Maze · Screenshot 2 — Add your photo"), PLACEHOLDER("Zombie Maze · Screenshot 3 — Add your photo")],
    coverImg: coverZombie,
  },
];

const PROJECT_FONTS = {
  archi: "'Cormorant Garamond', 'Times New Roman', serif",
  ebuddy: "'Space Grotesk', sans-serif",
  sales: "'Roboto Condensed', sans-serif",
  zombie: "'Creepster', cursive",
};

function ProjectCard({ project, onClick, setIsHovering }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      onMouseEnter={() => { setIsHovering(true); setHovered(true); }}
      onMouseLeave={() => { setIsHovering(false); setHovered(false); }}
      style={{
        position: "relative",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "none",
        aspectRatio: "4/3",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "transform 0.3s, box-shadow 0.3s",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 64px rgba(0,0,0,0.6)" : "none",
      }}
    >
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${project.coverImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: hovered ? "blur(3px) brightness(0.55)" : "brightness(1)",
        transform: hovered ? "scale(1.12)" : "scale(1)",
        transition: "filter 0.5s ease, transform 0.6s ease",
      }} />

      {/* Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.3)",
      }} />

      {/* Title */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        textAlign: "center",
        isolation: "isolate",
        zIndex: 2,
      }}>
        <motion.h3
          animate={{
            fontSize: hovered ? "1.50rem" : "1.75rem",
          }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: PROJECT_FONTS[project.id] || "var(--font-display)",
            fontWeight: 700,
            color: "var(--white)",
            letterSpacing: project.id === "zombie" ? "0.15em" : "-0.01em",
            lineHeight: 1.2,
            textShadow: "0 2px 20px rgba(0,0,0,0.95)",
            willChange: "transform",
            position: "relative",
            zIndex: 2,
          }}
        >
          {project.title}
        </motion.h3>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}
        >
          Projects
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginBottom: "3rem" }}
        >
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
            Things I've built.
          </h2>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--muted)" }}>
            Click any card to see the full story.
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => onSelectProject(project)}
              setIsHovering={setIsHovering}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// ─── PROJECT DATA ────────────────────────────────────────────────
// For E-Buddy and Archi: replace the placeholder strings below with your real imports.
// e.g.  import ebuddy1 from "../images/ebuddy-1.png";
// Then swap "EBUDDY_1" → ebuddy1, etc.

const PLACEHOLDER = (label) =>
  `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' style='background:%231E2A3A'><text x='50%25' y='50%25' fill='%2300D4FF' font-family='monospace' font-size='18' dominant-baseline='middle' text-anchor='middle'>${encodeURIComponent(label)}</text></svg>`;

const projects = [
  {
    id: "ebuddy",
    num: "01",
    title: "E-Buddy",
    subtitle: "Adaptive Board Exam Reviewer",
    status: "PRIVATE",
    statusColor: "#6C3BFF",
    tags: ["React.js", "Node.js", "Firebase"],
    shortDesc:
      "Web-based board exam reviewer built exclusively for criminology students.",
    fullDesc:
      "E-Buddy is a personalized web-based board exam reviewer for criminology students. It uses the C4.5 decision tree algorithm to adapt study sessions dynamically — recommending topics to retake based on the student's actual performance data. Built with React on the front-end, Node.js for the API layer, and Firebase for real-time data and auth.",
    highlights: [
      "C4.5 decision tree algorithm for adaptive sessions",
      "Real-time performance tracking via Firebase",
      "Auth system with role-based access",
      "Mobile-responsive reviewer interface",
    ],
    hasCode: true,
    // Replace these with your real screenshot imports
    gallery: [
      PLACEHOLDER("E-Buddy · Screenshot 1 — Replace me"),
      PLACEHOLDER("E-Buddy · Screenshot 2 — Replace me"),
      PLACEHOLDER("E-Buddy · Screenshot 3 — Replace me"),
    ],
    coverImg:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
  },
  {
    id: "sales",
    num: "02",
    title: "Sales Information System",
    subtitle: "Inventory & Sales Automation",
    status: "COMPLETED",
    statusColor: "#22c55e",
    tags: ["PHP", "MySQL", "JavaScript"],
    shortDesc:
      "Automated sales tracking and inventory management for a local shop.",
    fullDesc:
      "A web-based solution that automates sales tracking and inventory management for a local retail shop. Reduced manual errors through real-time data handling and an intuitive UI. Features include POS-style transaction logging, low-stock alerts, and a reporting dashboard that exports summaries for the owner.",
    highlights: [
      "Real-time inventory sync with MySQL",
      "Sales reporting and export",
      "Low-stock alert system",
      "Clean POS-style transaction UI",
    ],
    hasCode: false,
    // Add your own photos below — same format as above
    gallery: [
      PLACEHOLDER("Sales System · Screenshot 1 — Add your photo"),
      PLACEHOLDER("Sales System · Screenshot 2 — Add your photo"),
      PLACEHOLDER("Sales System · Screenshot 3 — Add your photo"),
    ],
    coverImg:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  },
  {
    id: "zombie",
    num: "03",
    title: "Zombie Maze Game",
    subtitle: "SHS Software Festival Winner",
    status: "🏆 FESTIVAL WIN",
    statusColor: "#FFBD2E",
    tags: ["Java", "Game Dev", "2017"],
    shortDesc:
      "2D maze survival game built solo for the SHS Software Festival.",
    fullDesc:
      "A 2D maze survival game designed and developed solo for the Senior High School Software Festival. Players navigate procedurally-arranged maze levels while avoiding zombies with pathfinding AI. Everything — gameplay mechanics, sprite design, and sound — was handled solo, combining technical execution with Visual Arts training.",
    highlights: [
      "Custom zombie pathfinding AI",
      "Multi-level maze progression",
      "Hand-drawn sprite assets",
      "Solo dev: design + code + audio",
    ],
    hasCode: false,
    gallery: [
      PLACEHOLDER("Zombie Maze · Screenshot 1 — Add your photo"),
      PLACEHOLDER("Zombie Maze · Screenshot 2 — Add your photo"),
      PLACEHOLDER("Zombie Maze · Screenshot 3 — Add your photo"),
    ],
    coverImg:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
  },
  {
    id: "archi",
    num: "04",
    title: "AC Architectural Studio",
    subtitle: "Portfolio Website",
    status: "IN PROGRESS",
    statusColor: "#00D4FF",
    tags: ["React.js", "Framer Motion"],
    shortDesc:
      "Visual-first portfolio site for an architectural design studio.",
    fullDesc:
      "A portfolio website for AC Architectural Studio — showcasing projects, services, and design philosophy with a clean, visual-first approach. Built with React and Framer Motion for smooth page transitions. Designed to feel as refined as the architecture it represents.",
    highlights: [
      "Visual-first layout, imagery-led",
      "Framer Motion page transitions",
      "CMS-ready project grid",
      "Mobile-first responsive design",
    ],
    hasCode: true,
    gallery: [
      PLACEHOLDER("Archi Studio · Screenshot 1 — Replace me"),
      PLACEHOLDER("Archi Studio · Screenshot 2 — Replace me"),
      PLACEHOLDER("Archi Studio · Screenshot 3 — Replace me"),
    ],
    coverImg:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
  },
];

// ─── MODAL ───────────────────────────────────────────────────────
function ProjectModal({ project, onClose, setIsHovering }) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "1.5rem",
      }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--slate)",
          border: "1px solid rgba(0,212,255,0.15)",
          borderRadius: 18,
          width: "100%",
          maxWidth: 860,
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Status bar at very top */}
        <div
          style={{
            height: 4,
            background: project.statusColor,
            borderRadius: "18px 18px 0 0",
            opacity: 0.85,
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "var(--white)",
            width: 34,
            height: 34,
            borderRadius: "50%",
            fontSize: "0.9rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          ✕
        </button>

        <div style={{ padding: "2rem 2.25rem 2.5rem" }}>
          {/* Header */}
          <div style={{ marginBottom: "1.75rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--cyan)",
                  opacity: 0.55,
                }}
              >
                {project.num}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: project.statusColor,
                  border: `1px solid ${project.statusColor}44`,
                  borderRadius: 100,
                  padding: "0.2rem 0.65rem",
                  letterSpacing: "0.08em",
                }}
              >
                {project.status}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--white)",
                lineHeight: 1.1,
                marginBottom: "0.3rem",
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--muted)",
              }}
            >
              {project.subtitle}
            </p>
          </div>

          {/* Gallery */}
          <div style={{ marginBottom: "1.75rem" }}>
            {/* Main image */}
            <motion.div
              key={activeImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              style={{
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.07)",
                marginBottom: "0.75rem",
                background: "#0A0F1E",
              }}
            >
              <img
                src={project.gallery[activeImg]}
                alt={`${project.title} screenshot ${activeImg + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>

            {/* Thumbnail strip */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {project.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  style={{
                    flex: 1,
                    aspectRatio: "16/9",
                    borderRadius: 6,
                    overflow: "hidden",
                    border:
                      i === activeImg
                        ? "2px solid var(--cyan)"
                        : "2px solid rgba(255,255,255,0.06)",
                    cursor: "pointer",
                    padding: 0,
                    transition: "border-color 0.2s",
                    background: "#0A0F1E",
                  }}
                >
                  <img
                    src={img}
                    alt={`thumb ${i + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: i === activeImg ? 1 : 0.45,
                      transition: "opacity 0.2s",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Description + highlights grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              marginBottom: "1.75rem",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--cyan)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "0.6rem",
                  opacity: 0.7,
                }}
              >
                Overview
              </div>
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                  color: "rgba(232,237,245,0.8)",
                  margin: 0,
                }}
              >
                {project.fullDesc}
              </p>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--cyan)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "0.6rem",
                  opacity: 0.7,
                }}
              >
                Key Features
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.6rem",
                      fontSize: "0.88rem",
                      color: "rgba(232,237,245,0.75)",
                      marginBottom: "0.55rem",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        color: "var(--cyan)",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      ▸
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer row: tags + action */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(108,59,255,0.12)",
                    border: "1px solid rgba(108,59,255,0.25)",
                    borderRadius: 100,
                    padding: "0.2rem 0.65rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "#a78bfa",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.hasCode && (
              <a
                href="#contact"
                onClick={onClose}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.6rem 1.25rem",
                  borderRadius: 8,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  background: "var(--cyan)",
                  color: "var(--navy)",
                  border: "1px solid var(--cyan)",
                  cursor: "none",
                  transition: "opacity 0.2s",
                }}
              >
                Request Code Access
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────
function ProjectCard({ project, onClick, setIsHovering }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovering(true);
        setHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        setHovered(false);
      }}
      style={{
        position: "relative",
        background: "var(--slate)",
        border: `1px solid ${hovered ? project.statusColor + "44" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 14,
        overflow: "hidden",
        cursor: "none",
        transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${project.statusColor}22`
          : "none",
      }}
    >
      {/* Top status stripe */}
      <div
        style={{
          height: 3,
          background: project.statusColor,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s",
        }}
      />

      {/* Cover image */}
      <div
        style={{
          height: 200,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${project.coverImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(25%) brightness(0.65)",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, var(--slate) 0%, rgba(30,42,58,0.5) 55%, transparent 100%)",
          }}
        />

        {/* Hover "Click to explore" hint */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0,212,255,0.12)",
            border: "1px solid rgba(0,212,255,0.4)",
            backdropFilter: "blur(6px)",
            borderRadius: 8,
            padding: "0.45rem 1rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--cyan)",
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
          }}
        >
          Explore Project →
        </motion.div>
      </div>

      {/* Card body */}
      <div style={{ padding: "1.4rem 1.5rem 1.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.6rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--cyan)",
              opacity: 0.45,
            }}
          >
            {project.num}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: project.statusColor,
              border: `1px solid ${project.statusColor}44`,
              borderRadius: 100,
              padding: "0.15rem 0.55rem",
              letterSpacing: "0.1em",
            }}
          >
            {project.status}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--white)",
            marginBottom: "0.3rem",
            letterSpacing: "-0.01em",
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--muted)",
            marginBottom: "0.9rem",
            lineHeight: 1.4,
          }}
        >
          {project.subtitle}
        </p>

        <p
          style={{
            fontSize: "0.875rem",
            color: "rgba(232,237,245,0.65)",
            lineHeight: 1.65,
            marginBottom: "1.1rem",
          }}
        >
          {project.shortDesc}
        </p>

        <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "rgba(108,59,255,0.1)",
                border: "1px solid rgba(108,59,255,0.2)",
                borderRadius: 100,
                padding: "0.18rem 0.6rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "#a78bfa",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── SECTION ──────────────────────────────────────────────────────
export default function Projects({ setIsHovering }) {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" style={{ padding: "7rem 0", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 4rem" }}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--cyan)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          Projects
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: "3rem" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            Things I've built.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--muted)",
            }}
          >
            Click any card to see the full story.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
              setIsHovering={setIsHovering}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
            setIsHovering={setIsHovering}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

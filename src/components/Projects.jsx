import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
    status: "Private", statusColor: "#00D4FF", tags: ["React.js", "Framer Motion"],
    shortDesc: "Visual-first portfolio site for an architectural design studio.",
    fullDesc: "A portfolio website for AC Architectural Studio showcasing projects, services, and design philosophy with a clean, visual-first approach. Built with React and Framer Motion for smooth page transitions. Designed to feel as refined as the architecture it represents.",
    highlights: ["Visual-first layout, imagery-led", "Framer Motion page transitions", "CMS-ready project grid", "Mobile-first responsive design"],
    gallery: [PLACEHOLDER("Archi Studio · Coming Soon")],
    coverImg: "https://i.pinimg.com/1200x/a0/25/81/a025811caddd217f972b2cc88b40f03c.jpg",
  },
  {
    id: "autona", link: null, num: "05", title: "Autona", subtitle: "Car Rental Scheduler",
    status: "PLANNED", statusColor: "#7A8BA0", tags: ["React.js", "Booking System"],
    shortDesc: "Booking and reservation scheduler for a small car rental business.",
    fullDesc: "A scheduling and reservation system for a car rental business running a small fleet of 2 cars. Handles booking requests, availability tracking, and reservation management so the fleet stays organized without double bookings.",
    highlights: ["Real time availability tracking", "Booking and reservation flow", "Built for a 3 car fleet"],
    gallery: [PLACEHOLDER("Autona · Coming Soon")],
    coverImg: "https://kenh14cdn.com/203336854389633024/2024/11/6/fpperformance-14561046-1730870958640-1730870959348632333986.jpeg",
  },
  {
    id: "wedding", link: null, num: "07", title: "Wedding", subtitle: "Invitation & Gallery",
    status: "PLANNED", statusColor: "#7A8BA0", tags: ["React.js", "Invitation", "Gallery"],
    shortDesc: "Wedding website with a digital invitation and a photo gallery.",
    fullDesc: "A wedding website that combines a digital invitation with RSVP and a photo and video gallery for the couple. Guests can view event details, confirm attendance, and browse memories in one place.",
    highlights: ["Digital invitation with RSVP form", "Photo and video gallery", "Event details and schedule", "Not yet developed"],
    gallery: [PLACEHOLDER("Wedding Site · Coming Soon")],
    coverImg: "https://i.pinimg.com/736x/aa/96/8e/aa968e2215b48f72279e80a49f4e1175.jpg",
  },
  {
    id: "kicksfits", link: null, num: "07", title: "Kicks & Fits", subtitle: "Streetwear Shopify Store",
    status: "PLANNED", statusColor: "#7A8BA0", tags: ["Shopify", "E-commerce", "Liquid"],
    shortDesc: "Bold streetwear and sneaker store built on Shopify.",
    fullDesc: "A full Shopify store for a streetwear and sneaker brand. Dark, high contrast homepage design with a drop countdown feature for hype marketing. Product pages support size and colorway variants with a size chart. Built to show real store setup skills, not just a themed demo.",
    highlights: ["Product variants for size and colorway", "Drop countdown timer for hype marketing", "Sticky add to cart bar on mobile", "Bold high contrast homepage design", "Not yet developed"],
    gallery: [PLACEHOLDER("Kicks & Fits · Coming Soon")],
    coverImg: "https://i.pinimg.com/1200x/fa/a6/08/faa608fa243ea96d4db679a6fbbe4f2d.jpg",
  },
  {
    id: "arvsdentist", link: null, num: "06", title: "Doc Arvs", subtitle: "Appointment Scheduler",
    status: "PLANNED", statusColor: "#7A8BA0", tags: ["React.js", "Scheduling"],
    shortDesc: "Appointment scheduling tool for a dental clinic.",
    fullDesc: "An appointment scheduling system for a dental clinic. Lets patients book and reschedule appointments while giving the clinic a clear view of the daily schedule.",
    highlights: ["Patient appointment booking", "Schedule management for the clinic", "Reminder ready structure", "Not yet developed"],
    gallery: [PLACEHOLDER("Doc Arvs · Coming Soon")],
    coverImg: "https://c1.wallpaperflare.com/preview/289/347/808/zahnreinigung-dental-repairs-treat-teeth-brushing-teeth.jpg",
  },
  {
    id: "nookco", link: null, num: "08", title: "Nook & Co.", subtitle: "Home Decor WooCommerce Store",
    status: "PLANNED", statusColor: "#7A8BA0", tags: ["WooCommerce", "WordPress", "E-commerce"],
    shortDesc: "Warm home decor store built on WooCommerce.",
    fullDesc: "A full WooCommerce store for a home decor brand. Soft, warm homepage design with a filterable shop page for wall art, vases, furniture, and rugs. Product pages support size and material variants. Built with a custom checkout style, not the default WooCommerce look.",
    highlights: ["Product variants for size and material", "Custom WooCommerce checkout styling", "Category filters on the shop page", "Soft warm homepage design", "Not yet developed"],
    gallery: [PLACEHOLDER("Nook & Co. · Coming Soon")],
    coverImg: "https://i.pinimg.com/736x/47/01/c4/4701c44b8edc7ba67a0de0562aebf2c1.jpg",
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
    gallery: [PLACEHOLDER("Zombie Maze · Coming Soon")],
    coverImg: coverZombie,
  },
];

const PROJECT_FONTS = {
  archi: "'Cormorant Garamond', 'Times New Roman', serif",
  autona: "'Oswald', sans-serif",
  wedding: "'Dancing Script', cursive",
  kicksfits: "'Anton', sans-serif",
  arvsdentist: "'Quicksand', sans-serif",
  nookco: "'Fraunces', serif",
  ebuddy: "'Space Grotesk', sans-serif",
  sales: "'Roboto Condensed', sans-serif",
  zombie: "'Creepster', cursive",
};

function ProjectCard({ project, onClick, setIsHovering, index }) {
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
        overflow: "hidden",
        cursor: "none",
        aspectRatio: "4/3",
        border: "1px solid rgba(255,255,255,0.06)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered ? "0 24px 64px rgba(0,0,0,0.6)" : "none",
      }}
    >
      <img
        src={project.coverImg}
        alt={project.title}
        loading="eager"
        fetchpriority={index < 3 ? "high" : "low"}
        decoding="async"
        width={800}
        height={500}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.12)" : "scale(1)",
          transition: "transform 0.5s ease",
        }}
      />
      <img
        src={project.coverImg}
        alt=""
        aria-hidden="true"
        loading="eager"
        fetchpriority="low"
        decoding="async"
        width={800}
        height={500}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(3px) brightness(0.55)",
          transform: hovered ? "scale(1.12)" : "scale(1)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease, transform 0.5s ease",
          willChange: "opacity",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.3)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <h3
          style={{
            fontFamily: PROJECT_FONTS[project.id] || "var(--font-display)",
            fontWeight: 700,
            fontSize: hovered ? "1.50rem" : "1.75rem",
            color: "var(--white)",
            letterSpacing: project.id === "zombie" ? "0.15em" : "-0.01em",
            lineHeight: 1.2,
            textShadow: "0 2px 20px rgba(0,0,0,0.95)",
            transition: "font-size 0.3s ease",
          }}
        >
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
}

export default function Projects({ setIsHovering, onSelectProject }) {
  useEffect(() => {
    projects.forEach((project) => {
      const cover = new Image();
      cover.src = project.coverImg;
      project.gallery.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []);

  return (
    <section id="projects" style={{ padding: "1.5rem 0 1.5rem", position: "relative", zIndex: 1 }}>
      <style>{`
        .projects-wrapper {
          width: 100%;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="projects-wrapper">
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
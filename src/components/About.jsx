import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import pic from "../assets/pic.jpg";
import aca2022 from "../assets/Certificate/ACA-2022.png";
import claude101 from "../assets/Certificate/claude101.jpg";
import { projects } from "./Projects";

const STORY_DURATION = 4500;
const CERT_COUNT = 11;

const highlights = [
  {
    key: "esports",
    label: "Esports",
    items: [
      { name: "Warcraft III", caption: "Where it all started. The game that got me into gaming.", image: "https://i.pinimg.com/736x/81/e3/4c/81e34c6c9894c19f9748b65cc7816d3e.jpg" },
      { name: "Dota 2", caption: "Still can't uninstall. 6000+ hours and counting.", image: "https://i.pinimg.com/736x/86/c9/58/86c958db7a90145f4ff566e819a4b284.jpg" },
      { name: "PUBG Mobile", caption: "Mobile survival tactics at its best.", image: "https://i.pinimg.com/736x/35/61/cc/3561ccebadac5b4a1db3bbe731a2f8a3.jpg" },
      { name: "Mobile Legends", caption: "Rapid MOBA action. Classic Friday nights.", image: "https://i.pinimg.com/736x/29/1c/42/291c42e91ca95d339c832e05b74b8e3f.jpg" },
      { name: "PUBG PC", caption: "Tactical battle royale. Way harder than mobile.", image: "https://i.pinimg.com/1200x/d4/3f/26/d43f26c0feb995992405ce05cb248309.jpg" },
      { name: "GTA Series", caption: "San Andreas to GTA V. Never gets old.", image: "https://i.pinimg.com/1200x/00/a7/bf/00a7bf0ec1548105dee8314de81a0a1e.jpg" },
      { name: "State of Decay", caption: "Zombie survival management done right.", image: "https://wallpapers.com/images/high/giant-zombie-state-of-decay-2-vwd7vpgxw5hwhxhw.webp" },
      { name: "Assassin's Creed", caption: "Every era, every blade. Best open worlds ever.", image: "https://images.hdqwalls.com/wallpapers/assassins-creed-odyssey-fight-4k-tb.jpg" },
    ],
  },
  {
    key: "sports",
    label: "Sports",
    items: [
      { name: "Billiards", caption: "I see the angles.", image: "https://i.pinimg.com/736x/d7/2e/ca/d72eca7a5fb02773f1ab436040578360.jpg" },
      { name: "Badminton", caption: "Speed and reflexes. Best played with my gf.", image: "https://i.pinimg.com/736x/30/0b/83/300b83676693906ceea86a960b3425c8.jpg" },
      { name: "Basketball", caption: "Shooting only!", image: "https://i.pinimg.com/1200x/df/25/26/df2526fe4b20a4e8ae39923e8444645a.jpg" },
      { name: "Archery", caption: "Breathe, aim, release. Requires a lot of focus.", image: "https://i.pinimg.com/736x/dd/dc/b4/dddcb4f4b02a899077658d6bbba7ba79.jpg" },
    ],
  },
  {
    key: "passions",
    label: "Passions",
    items: [
      { name: "UI/UX Design", caption: "If it feels obvious, I did it right.", image: "https://miro.medium.com/v2/resize:fit:2000/1*FgUVo0m0AwnNRPICeKS7KA.jpeg" },
      { name: "Visual Arts", caption: "Started with pencil, now it's all pixels.", image: "https://i.pinimg.com/736x/de/3b/86/de3b86bb28e29933c7f77ea4bdafc24b.jpg" },
      { name: "Web Dev", caption: "Building things for the modern web.", image: "https://i.pinimg.com/736x/03/17/16/031716e4bfd0ffbc554b76740f5075a1.jpg" },
      { name: "Content Creation", caption: "Still building the brand. One post at a time.", image: "https://i.pinimg.com/736x/cb/25/63/cb2563c1afdc4a836765b00bbe2fed01.jpg" },
    ],
  },
  {
    key: "cinema",
    label: "Cinema",
    items: [
      { name: "Marvel", caption: "Epic cinematic storytelling. Phase 1 to now.", image: "https://i.pinimg.com/736x/71/d0/8c/71d08caf066e888827ab1b888415f320.jpg" },
      { name: "The Walking Dead", caption: "Gritty apocalypse survival. Best character arcs ever.", image: "https://i.pinimg.com/736x/f4/67/9c/f4679cb7ec47e9f135eb356804637604.jpg" },
      { name: "The Chosen", caption: "Groundbreaking historical drama. Highly recommend.", image: "https://i.pinimg.com/736x/ef/b1/c9/efb1c948e7bd484dbc6784f41e146021.jpg" },
      { name: "Monsterverse", caption: "Godzilla x Kong. Pure spectacle every time.", image: "https://i.pinimg.com/736x/16/68/08/1668080cf4dd4776a65e9a0a4966402f.jpg" },
    ],
  },
  {
    key: "pets",
    label: "Pets",
    items: [
      { name: "Combi", caption: "Baby combs", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
      { name: "Mochi", caption: "My babyba", image: "https://i.pinimg.com/736x/14/f3/9d/14f39d4473009970549c659366a4cf92.jpg" },
      { name: "Koki", caption: "Koking pasaway", image: "https://i.pinimg.com/736x/e6/9b/90/e69b90326c604901611cf13665649785.jpg" },
      { name: "Kobe", caption: "Kobeng bait", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
      { name: "Rococo", caption: "Big boy", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
      { name: "Oli", caption: "Oliko", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
      { name: "Bulldog", caption: "Qt bulldog", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
      { name: "Eli", caption: "Eli ganda", image: "https://i.pinimg.com/736x/59/1b/93/591b93314e3290cc7b34d74f6f4ae829.jpg" },
      { name: "Yuri", caption: "Yuripotpot", image: "https://i.pinimg.com/736x/db/40/21/db40219179199a90cf0b77110479aa97.jpg" },
      { name: "Puri", caption: "Puriiii", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
      { name: "Charm", caption: "Charrrm", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
      { name: "Bruce", caption: "Banner", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
      { name: "Tyrone", caption: "Banner", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
      { name: "Sweet sweet", caption: "Banner", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
    ],
  },
];

const posts = [
  {
    id: "ac-archi",
    period: "2024 to Present",
    role: "Freelance Web Developer",
    company: "AC Architectural Studio",
    desc: "Building a full company website from scratch. Project gallery, services, client inquiry system, and a Gemini AI chatbot for international client acquisition.",
    tags: ["ReactJS", "GeminiAPI", "FramerMotion"],
  },
  {
    id: "working-student",
    period: "2022 to 2024",
    role: "Working Student",
    company: "University of Nueva Caceres",
    desc: "Balanced coursework with real work at the same time. Graduated with a Computer Science degree.",
    tags: ["ComputerScience", "Graduated"],
  },
  {
    id: "broadlume",
    period: "2021 to 2023",
    role: "Data and Advertising Operations",
    company: "Wide-out Workforces Inc. (Broadlume)",
    desc: "Paused college to work full time. Managed product datasets across hundreds of client websites, data audits, catalog accuracy, and cross team marketing alignment.",
    tags: ["Salesforce", "Excel", "Floorforce"],
  },
  {
    id: "college",
    period: "2018 to 2020",
    role: "BS Computer Science",
    company: "University of Nueva Caceres",
    desc: "Started the Computer Science program. This is where the real foundation got built.",
    tags: ["ComputerScience"],
  },
  {
    id: "shs",
    period: "2016 to 2018",
    role: "Computer Programming",
    company: "Camarines Sur National High School",
    desc: "Developed Zombie Maze and a Sales Information System. First real taste of shipping software.",
    tags: ["Java", "PHP", "MySQL"],
  },
  {
    id: "jhs",
    period: "2012 to 2016",
    role: "Visual Arts",
    company: "Camarines Sur National High School",
    desc: "Trained in painting, drawing, and sculpture. Still shapes every design decision I make now.",
    tags: ["Painting", "Drawing", "Sculpture"],
  },
];

const tabs = [
  { key: "timeline", label: "Timeline", icon: "grid" },
  { key: "projects", label: "Projects", icon: "bookmark" },
  { key: "skills", label: "Skills", icon: "repeat" },
  { key: "certifications", label: "Certifications", icon: "tag" },
];

const TAB_ICONS = {
  grid: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  bookmark: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  repeat: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  tag: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  ),
};

const skillGridItems = [
  { name: "React", icon: "react" },
  { name: "Node.js", icon: "nodejs" },
  { name: "JavaScript", icon: "javascript" },
  { name: "Firebase", icon: "firebase" },
  { name: "TypeScript", icon: "typescript" },
  { name: "GitHub", icon: "github" },
].map((s) => ({ name: s.name, image: `https://skillicons.dev/icons?i=${s.icon}` }));

const certGridItems = [
  { name: "Cloud Architecting", image: "https://images.credly.com/size/340x340/images/fcafd0c9-42da-4703-a191-0c397203dc1b/blob" },
  { name: "Cloud Developing", image: "https://images.credly.com/size/340x340/images/bb3211c0-a562-44ec-a8b5-df54deb0e5e9/blob" },
  { name: "Cybersecurity Awareness", image: aca2022 },
  { name: "Claude 101", image: claude101 },
  { name: "Prompt Design", image: "https://images.credly.com/size/340x340/images/cef82b2e-970a-4318-8e59-c3e26b7f5c19/image.png" },
  { name: "Intro to Cybersecurity", image: "https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/twitter_thumb_201604_I2CS__1_.png" },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function HighlightCircle({ group, onOpen, setIsHovering }) {
  return (
    <button
      onClick={() => onOpen(group)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", flexShrink: 0, width: "clamp(88px, 8vw, 104px)" }}
    >
      <div style={{ width: "clamp(78px, 7vw, 92px)", height: "clamp(78px, 7vw, 92px)", borderRadius: "50%", padding: 3, background: "conic-gradient(from 180deg, var(--cyan), #ffffff, var(--cyan))" }}>
        <div style={{ width: "100%", height: "100%", borderRadius: "50%", padding: 3, background: "var(--paper)" }}>
          <img src={group.items[0].image} alt={group.label} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", display: "block" }} />
        </div>
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--ink-soft)", letterSpacing: "0.02em" }}>
        {group.label}
      </span>
    </button>
  );
}

function StoryModal({ group, onClose, setIsHovering }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const elapsedRef = useRef(0);

  const total = group.items.length;
  const current = group.items[index];

  const goNext = useCallback(() => {
    setIndex((i) => {
      if (i >= total - 1) { onClose(); return i; }
      return i + 1;
    });
  }, [total, onClose]);

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  useEffect(() => {
    setProgress(0);
    elapsedRef.current = 0;
    startRef.current = null;
  }, [index]);

  useEffect(() => {
    if (paused) { cancelAnimationFrame(rafRef.current); return; }
    const tick = (t) => {
      if (startRef.current === null) startRef.current = t - elapsedRef.current;
      elapsedRef.current = t - startRef.current;
      const pct = Math.min(100, (elapsedRef.current / STORY_DURATION) * 100);
      setProgress(pct);
      if (pct >= 100) goNext();
      else rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, index, goNext]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
    };
  }, [onClose, goNext, goPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.94)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        style={{ position: "relative", width: "min(420px, 100%)", aspectRatio: "9/16", maxHeight: "88vh", borderRadius: 16, overflow: "hidden", background: "#000" }}
      >
        <div style={{ position: "absolute", top: 10, left: 10, right: 10, display: "flex", gap: 4, zIndex: 3 }}>
          {group.items.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.3)", overflow: "hidden" }}>
              <div style={{ height: "100%", background: "#fff", width: i < index ? "100%" : i === index ? `${progress}%` : "0%" }} />
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", top: 22, left: 14, right: 14, display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 3 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#fff", letterSpacing: "0.05em" }}>{group.label}</span>
          <button
            onClick={onClose}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", fontSize: "0.9rem" }}
          >&#x2715;</button>
        </div>

        <AnimatePresence mode="wait">
          <motion.img
            key={index} src={current.image} alt={current.name}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </AnimatePresence>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "3rem 1.25rem 1.5rem", background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 600, color: "#fff", marginBottom: "0.3rem" }}>{current.name}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "rgba(255,255,255,0.75)" }}>{current.caption}</div>
        </div>

        <div onPointerDown={() => setPaused(true)} onPointerUp={() => setPaused(false)} onClick={goPrev} style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "40%", zIndex: 2, cursor: "pointer" }} />
        <div onPointerDown={() => setPaused(true)} onPointerUp={() => setPaused(false)} onClick={goNext} style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "60%", zIndex: 2, cursor: "pointer" }} />
      </motion.div>
    </motion.div>
  );
}

function TimelineEntry({ post }) {
  return (
    <div style={{ padding: "1.75rem 0", borderBottom: "1px solid var(--line)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.9rem" }}>
        <img src={pic} alt="Antonio Abias Jr." style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.88rem", fontWeight: 700, color: "var(--ink)" }}>antonioabias_</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--ink-faint)", marginLeft: "auto" }}>{post.period}</span>
      </div>

      <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 1.8vw, 1.55rem)", fontWeight: 600, color: "var(--ink)", marginBottom: "0.2rem" }}>
        {post.role}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--accent)", marginBottom: "0.85rem" }}>
        {post.company}
      </div>
      <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--ink-soft)", marginBottom: "0.9rem" }}>
        {post.desc}
      </p>
      <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap" }}>
        {post.tags.map((t) => (
          <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--accent)" }}>
            #{t}
          </span>
        ))}
      </div>
    </div>
  );
}

function IGGrid({ items, setIsHovering }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem" }}>
      {items.map((item) => (
        <button
          key={item.name}
          onClick={item.onClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            position: "relative",
            aspectRatio: "1/1",
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid var(--line)",
            background: "var(--paper-elevated)",
            cursor: "pointer",
            padding: item.contain ? "16%" : 0,
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{
              position: "absolute",
              inset: item.contain ? "16%" : 0,
              width: item.contain ? "68%" : "100%",
              height: item.contain ? "68%" : "100%",
              objectFit: item.contain ? "contain" : "cover",
              display: "block",
            }}
          />
          <div style={{
            position: "absolute", left: 0, right: 0, bottom: 0,
            padding: "0.5rem 0.6rem",
            background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.66rem", color: "#fff", letterSpacing: "0.02em" }}>
              {item.name}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function About({ setIsHovering, onSelectProject }) {
  const [openGroup, setOpenGroup] = useState(null);
  const [activeTab, setActiveTab] = useState("timeline");
  const ref = useRef(null);

  const projectGridItems = projects.slice(0, 6).map((p) => ({
    name: p.title,
    image: p.coverImg,
    onClick: () => onSelectProject && onSelectProject(p),
  }));

  const skillGrid = skillGridItems.map((s) => ({
    ...s,
    contain: true,
    onClick: () => scrollToSection("skills"),
  }));

  const certGrid = certGridItems.map((c) => ({
    ...c,
    contain: true,
    onClick: () => scrollToSection("certifications"),
  }));

  return (
    <section id="about" ref={ref} style={{
      minHeight: "100vh",
      padding: "7.5rem 0 4rem",
      position: "relative",
      isolation: "isolate",
      background: "var(--paper)",
      color: "var(--ink)",
    }}>
      <style>{`
        .about-wrapper { max-width: 1300px; margin: 0 auto; width: min(94%, 1300px); }
        .ig-header { display: flex; gap: 2.5rem; align-items: stretch; margin-bottom: 3rem; }
        .ig-avatar { aspect-ratio: 1/1; height: 100%; max-width: 220px; border-radius: 24px; flex-shrink: 0; border: 1px solid var(--line); padding: 4px; }
        .ig-buttons-row { display: flex; gap: 0.75rem; margin-top: 1.25rem; max-width: 420px; }
        .ig-btn {
          flex: 1; text-align: center; font-family: var(--font-mono); font-size: 0.88rem;
          font-weight: 700; padding: 0.75rem 1.1rem; border-radius: 8px; cursor: pointer;
          border: 1px solid var(--line); background: var(--paper-elevated); color: var(--ink);
          transition: background 0.2s;
        }
        .highlights-row { display: flex; gap: clamp(1.25rem, 2vw, 2rem); overflow-x: auto; scrollbar-width: none; padding: 0.25rem 0.25rem 0.5rem; margin-bottom: 3rem; }
        .highlights-row::-webkit-scrollbar { display: none; }
        .tab-bar { display: flex; border-top: 1px solid var(--line); }
        .tab-btn {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.4rem;
          padding: 1.1rem 0; background: none; border: none; cursor: pointer;
          font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.05em; text-transform: uppercase;
        }
        .ig-fullname { font-family: var(--font-serif); font-size: clamp(1.6rem, 2.6vw, 2.2rem); font-weight: 600; color: var(--ink); }
        .ig-handle { font-family: var(--font-mono); font-size: 0.85rem; color: var(--ink-faint); margin-top: 0.25rem; }
        .ig-stats-line { font-family: var(--font-mono); font-size: 0.85rem; color: var(--ink-soft); margin: 1.1rem 0; }
        .ig-bio-strong { font-family: var(--font-serif); font-size: clamp(1.1rem, 1.6vw, 1.4rem); color: var(--ink); font-weight: 600; margin: 0 0 0.4rem; max-width: 700px; }
        .ig-bio { font-size: clamp(0.95rem, 1.1vw, 1.05rem); line-height: 1.75; color: var(--ink-soft); margin: 0; max-width: 700px; }
        @media (max-width: 640px) {
          .ig-header { flex-direction: column; text-align: center; gap: 1.25rem; align-items: center; }
          .ig-avatar { width: 140px; height: 140px; max-width: none; }
          .ig-bio, .ig-bio-strong { max-width: 100%; }
        }
      `}</style>

      <div className="about-wrapper">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="ig-header"
        >
          <div className="ig-avatar">
            <img src={pic} alt="Antonio Abias Jr." style={{ width: "100%", height: "100%", borderRadius: 20, objectFit: "cover", display: "block" }} />
          </div>

          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="ig-fullname">Antonio V. Abias Jr.</div>
            <div className="ig-handle">@antonioabias_</div>

            <div className="ig-stats-line">
              10+ Years Coding &middot; 2+ Years Professional &middot; {CERT_COUNT} Certifications
            </div>

            <p className="ig-bio-strong">I build software that feels like art.</p>
            <p className="ig-bio">
              CS graduate with a Visual Arts background, working with React, Node.js, and Firebase, currently freelancing while bringing AI tools into real client work.
            </p>

            <div className="ig-buttons-row">
              <a
                href="https://mail.google.com/mail/?view=cm&to=antonioabias23.aa@gmail.com"
                target="_blank" rel="noreferrer"
                className="ig-btn"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{ textDecoration: "none" }}
              >
                Message
              </a>
              <a
                href="/resume.pdf"
                target="_blank" rel="noreferrer"
                className="ig-btn"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{ textDecoration: "none" }}
              >
                Resume
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="highlights-row"
        >
          {highlights.map((group) => (
            <HighlightCircle key={group.key} group={group} onOpen={setOpenGroup} setIsHovering={setIsHovering} />
          ))}
        </motion.div>

        <div className="tab-bar">
          {tabs.map((t) => {
            const active = activeTab === t.key;
            return (
              <button
                key={t.key}
                className="tab-btn"
                onClick={() => setActiveTab(t.key)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{
                  color: active ? "var(--ink)" : "var(--ink-faint)",
                  borderTop: active ? "2px solid var(--ink)" : "2px solid transparent",
                  marginTop: -1,
                  cursor: "pointer",
                }}
              >
                {TAB_ICONS[t.icon]}
              </button>
            );
          })}
        </div>

        <div style={{ paddingTop: "1.5rem" }}>
          {activeTab === "timeline" && posts.map((post) => <TimelineEntry key={post.id} post={post} />)}
          {activeTab === "projects" && <IGGrid items={projectGridItems} setIsHovering={setIsHovering} />}
          {activeTab === "skills" && <IGGrid items={skillGrid} setIsHovering={setIsHovering} />}
          {activeTab === "certifications" && <IGGrid items={certGrid} setIsHovering={setIsHovering} />}
        </div>
      </div>

      <AnimatePresence>
        {openGroup && (
          <StoryModal group={openGroup} onClose={() => setOpenGroup(null)} setIsHovering={setIsHovering} />
        )}
      </AnimatePresence>
    </section>
  );
}
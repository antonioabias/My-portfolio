import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import pic from "../assets/pic.jpg";
import Projects from "./Projects";
import Certifications from "./Certifications";
import Skills from "./Skills";

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
      { name: "Mobile Legends", caption: "Rapid MOBA action. Classic Friday nights.", image: "https://www.youtube.com/shorts/DT0_bn7djOk?feature=share" },
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
      { name: "Billiards", caption: "I see the angles.", image: "https://i.pinimg.com/736x/10/3b/76/103b76913b8ab538c82ea76d31fef1c0.jpg" },
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
    role: "Bacherlor of Science in Computer Science",
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
  { key: "projects", label: "Projects", icon: "folder" },
  { key: "skills", label: "Skills", icon: "chart" },
  { key: "timeline", label: "Timeline", icon: "clock" },
  { key: "certifications", label: "Certifications", icon: "award" },
];

const TAB_ICONS = {
  folder: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  ),
  chart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <line x1="6" y1="20" x2="6" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="18" y1="20" x2="18" y2="14" />
    </svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  award: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="5" />
      <path d="M8.5 13l-2 8 5.5-3 5.5 3-2-8" />
    </svg>
  ),
};

function HighlightCircle({ group, onOpen, setIsHovering }) {
  return (
    <button
      onClick={() => onOpen(group)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", flexShrink: 0, width: "clamp(88px, 8vw, 104px)" }}
    >
      <div style={{ width: "clamp(78px, 7vw, 92px)", height: "clamp(78px, 7vw, 92px)", borderRadius: "50%", padding: 3, background: "linear-gradient(135deg, #1877F2, #42A5F5, #1877F2)" }}>
        <div style={{ width: "100%", height: "100%", borderRadius: "50%", padding: 3, background: "var(--paper)" }}>
          <img src={group.items[0].image} alt={group.label} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", display: "block" }} />
        </div>
      </div>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--ink-soft)", letterSpacing: "0.02em" }}>
        {group.label}
      </span>
    </button>
  );
}

function StoryModal({ group, onClose, setIsHovering }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
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
      if (e.key === " ") setPaused((p) => !p);
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
    };
  }, [onClose, goNext, goPrev]);

  const iconBtn = {
    background: "rgba(0,0,0,0.35)", border: "none", color: "#fff",
    width: 40, height: 40, borderRadius: "50%", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.94)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", height: "88vh", aspectRatio: "9/16", maxWidth: "95vw", minHeight: "480px", borderRadius: 16, overflow: "hidden", background: "#000" }}
      >
        {/* Progress bars */}
        <div style={{ position: "absolute", top: 10, left: 10, right: 10, display: "flex", gap: 4, zIndex: 3 }}>
          {group.items.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.3)", overflow: "hidden" }}>
              <div style={{ height: "100%", background: "#fff", width: i < index ? "100%" : i === index ? `${progress}%` : "0%", transition: paused ? "none" : undefined }} />
            </div>
          ))}
        </div>

        {/* Top bar: label + controls */}
        <div style={{ position: "absolute", top: 22, left: 14, right: 14, display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 3, gap: "0.5rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#fff", letterSpacing: "0.05em", flex: 1 }}>{group.label}</span>
          <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
            {/* Pause / Play */}
            <button
              onClick={() => setPaused((p) => !p)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={iconBtn}
              title={paused ? "Play" : "Pause"}
            >
              {paused ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><polygon points="5,3 19,12 5,21"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>
              )}
            </button>
            {/* Mute / Unmute */}
            <button
              onClick={() => setMuted((m) => !m)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={iconBtn}
              title={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="#fff" stroke="none"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="#fff" stroke="none"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
              )}
            </button>
            {/* Close */}
            <button
              onClick={onClose}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={iconBtn}
              title="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={index} src={current.image} alt={current.name}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </AnimatePresence>

        {/* Caption */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "3rem 1.25rem 1.5rem", background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 600, color: "#fff", marginBottom: "0.3rem" }}>{current.name}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "rgba(255,255,255,0.75)" }}>{current.caption}</div>
        </div>

        {/* Tap zones */}
        <div onClick={goPrev} style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "40%", zIndex: 2, cursor: "pointer" }} />
        <div onClick={goNext} style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "60%", zIndex: 2, cursor: "pointer" }} />
      </motion.div>
    </motion.div>,
    document.body
  );
}

function formatCount(n) {
  if (n >= 1000000) {
    return (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + "M";
  }
  if (n >= 1000) {
    return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "K";
  }
  return String(n);
}

function useLikeCount(seed) {
  const [count, setCount] = useState(seed);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() > 0.6) {
        setCount((c) => c + Math.floor(50 + Math.random() * 400));
      }
    }, 6000 + Math.random() * 6000);
    return () => clearInterval(id);
  }, []);

  const toggleLike = () => {
    setCount((c) => (liked ? c - 1 : c + 1));
    setLiked((l) => !l);
  };

  return { count, liked, toggleLike };
}

function HeartButton({ count, liked, onToggle, setIsHovering }) {
  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setIsHovering && setIsHovering(true)}
      onMouseLeave={() => setIsHovering && setIsHovering(false)}
      style={{
        display: "flex", alignItems: "center", gap: "0.4rem",
        background: "none", border: "none", cursor: "pointer",
        color: liked ? "#ff4d6d" : "var(--ink-faint)",
        fontFamily: "var(--font-body)", fontSize: "0.85rem",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? "#ff4d6d" : "none"} stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s-7.5-4.6-10-9.1C0.3 8.4 2 4.8 5.6 4.2c2-.3 3.9.8 4.9 2.4 1-1.6 2.9-2.7 4.9-2.4 3.6.6 5.3 4.2 3.6 7.7C19.5 16.4 12 21 12 21z" />
      </svg>
      <span>{formatCount(count)}</span>
    </button>
  );
}

function hashSeed(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 900000;
  }
  return 100000 + hash;
}

function TimelineEntry({ post, setIsHovering }) {
  const seed = hashSeed(post.id);
  const { count, liked, toggleLike } = useLikeCount(seed);

  return (
    <div style={{ padding: "1.75rem 0", borderBottom: "1px solid var(--line)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.9rem" }}>
        <img src={pic} alt="Antonio Abias Jr." style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 700, color: "var(--ink)" }}>antonioabias_</span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--ink-faint)", marginLeft: "auto" }}>{post.period}</span>
      </div>

      <div style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)", fontWeight: 700, color: "var(--ink)", marginBottom: "0.2rem" }}>
        {post.role}
      </div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500, color: "var(--white)", marginBottom: "0.85rem" }}>
        {post.company}
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.75, color: "var(--ink-soft)", marginBottom: "0.9rem" }}>
        {post.desc}
      </p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.7rem" }}>
        <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap" }}>
          {post.tags.map((t) => (
            <span key={t} style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--white)" }}>
              #{t}
            </span>
          ))}
        </div>
        <HeartButton count={count} liked={liked} onToggle={toggleLike} setIsHovering={setIsHovering} />
      </div>
    </div>
  );
}

export default function About({ setIsHovering, onSelectProject }) {
  const [openGroup, setOpenGroup] = useState(null);
  const [activeTab, setActiveTab] = useState("projects");
  const ref = useRef(null);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        minHeight: "100vh",
        padding: "7.5rem 0 4rem",
        position: "relative",
        isolation: "isolate",
        background: "var(--paper)",
        color: "var(--ink)",
      }}
    >
      <style>{`
        .about-wrapper { max-width: 1300px; margin: 0 auto; width: min(94%, 1300px); }
        .ig-header {
          display: flex;
          gap: 2.5rem;
          align-items: center;
          width: 100%;
          max-width: min(860px, 94vw);
          margin: 0 auto 3rem;
        }
        @media (max-width: 640px) {
          .ig-header {
            flex-direction: column;
            text-align: center;
            gap: 1.25rem;
          }
        }
        .ig-header > div:last-child {
          min-width: 0;
        }
        .ig-avatar {
          aspect-ratio: 1/1;
          width: clamp(90px, 22vw, 220px);
          height: auto;
          max-width: 220px;
          border-radius: 50%;
          flex-shrink: 0;
          border: 1px solid var(--line);
          padding: 4px;
        }
        @media (max-width: 640px) {
          .ig-avatar {
            width: 96px;
          }
        }
        .ig-buttons-row { display: flex; gap: 0.75rem; margin-top: 1.25rem; max-width: 420px; }
        @media (max-width: 640px) {
          .ig-buttons-row {
            margin-left: auto;
            margin-right: auto;
          }
        }
        .ig-btn {
          flex: 1; text-align: center; font-family: var(--font-display); font-size: 0.88rem;
          font-weight: 700; padding: 0.75rem 1.1rem; border-radius: 8px; cursor: pointer;
          border: 1px solid var(--line); background: var(--paper-elevated); color: var(--ink);
          transition: background 0.2s;
        }
        .ig-btn:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.4);
          transform: translateY(-2px);
        }
        .highlights-row {
          display: flex;
          gap: clamp(1.25rem, 2vw, 2rem);
          overflow-x: auto;
          scrollbar-width: none;
          padding: 0.25rem 0.25rem 0.5rem;
          width: 100%;
          max-width: min(640px, 92vw);
          margin: 0 auto 3rem;
          justify-content: center;
        }
        @media (max-width: 640px) {
          .highlights-row {
            justify-content: flex-start;
          }
        }
        .highlights-row::-webkit-scrollbar { display: none; }
        .tab-bar { display: flex; border-top: 1px solid var(--line); }
        .tab-btn {
          position: relative;
          flex: 1; display: flex; align-items: center; justify-content: center;
          padding: 1.1rem 0; background: none; border: none; cursor: pointer;
          font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.05em; text-transform: uppercase;
        }
        .tab-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-6px);
          background: var(--paper-elevated);
          border: 1px solid var(--line);
          color: var(--ink);
          padding: 0.35rem 0.7rem;
          border-radius: 6px;
          font-size: 0.62rem;
          letter-spacing: 0.04em;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }
        .tab-btn:hover .tab-tooltip {
          opacity: 1;
        }
        .ig-fullname {
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 2vw, 1.7rem);
          font-weight: 600;
          color: #ffffff;
        }
        .ig-handle { font-family: var(--font-body); font-size: 0.95rem; color: var(--ink-faint); margin-top: 0.05rem; }
        .ig-stats-line { display: flex; gap: 1.5rem; font-family: var(--font-body); font-size: 0.85rem; color: var(--ink-soft); margin: 1.1rem 0; }
        .ig-stats-line strong { color: var(--ink); font-weight: 700; }
        .ig-bio { font-size: clamp(0.95rem, 1.1vw, 1.05rem); line-height: 1.75; color: var(--ink-soft); margin: 0; max-width: 700px; }
        @media (max-width: 640px) {
          .ig-stats-line { justify-content: center; gap: 1.2rem; }
          .ig-fullname { justify-content: center; width: 100%; }
        }
      `}</style>

      <div className="about-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="ig-header"
        >
          <div className="ig-avatar">
            <img
              src={pic}
              alt="Antonio Abias Jr."
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "100%",
              minWidth: 0,
            }}
          >
            <div
              className="ig-fullname"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              Antonio V. Abias Jr.
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-label="Verified"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M12 2l2.4 1.4 2.75-.3 1.4 2.4 2.4 1.4-.3 2.75 1.4 2.4-1.4 2.4.3 2.75-2.4 1.4-1.4 2.4-2.75-.3L12 22l-2.4-1.4-2.75.3-1.4-2.4-2.4-1.4.3-2.75L2 12l1.4-2.4-.3-2.75 2.4-1.4 1.4-2.4 2.75.3z"
                  fill="#3B82F6"
                />
                <path
                  d="M8.5 12.5l2.2 2.2 4.3-4.9"
                  stroke="var(--paper)"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            <div className="ig-handle">@antonioabias_</div>

            <div className="ig-stats-line">
              <span>
                <strong>10</strong> Years Coding
              </span>
              <span>
                <strong>2</strong> Years Professional
              </span>
              <span>
                <strong>{CERT_COUNT}</strong> Certifications
              </span>
            </div>

            <p className="ig-bio">
              I'm a web developer with a Computer Science background. I code
              with AI tools like Claude and Cursor to move faster and ship
              cleaner work. I love turning rough ideas into real things people
              can use.
            </p>

            <div className="ig-buttons-row">
              <a
                href="#contact"
                className="ig-btn"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{ textDecoration: "none" }}
              >
                Message
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="highlights-row"
        >
          {highlights.map((group) => (
            <HighlightCircle
              key={group.key}
              group={group}
              onOpen={setOpenGroup}
              setIsHovering={setIsHovering}
            />
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
                  borderTop: active
                    ? "2px solid var(--ink)"
                    : "2px solid transparent",
                  marginTop: -1,
                  cursor: "pointer",
                }}
              >
                {TAB_ICONS[t.icon]}
                <span className="tab-tooltip">{t.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ paddingTop: "1.5rem" }}>
          {activeTab === "timeline" &&
            posts.map((post) => (
              <TimelineEntry
                key={post.id}
                post={post}
                setIsHovering={setIsHovering}
              />
            ))}
          {activeTab === "projects" && (
            <Projects
              setIsHovering={setIsHovering}
              onSelectProject={onSelectProject}
            />
          )}
          {activeTab === "skills" && <Skills />}
          {activeTab === "certifications" && (
            <Certifications setIsHovering={setIsHovering} />
          )}
        </div>
      </div>

      <AnimatePresence>
        {openGroup && (
          <StoryModal
            group={openGroup}
            onClose={() => setOpenGroup(null)}
            setIsHovering={setIsHovering}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
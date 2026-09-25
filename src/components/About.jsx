import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import pic from "../assets/pic.jpg";
import Projects from "./Projects";
import Certifications from "./Certifications";
import Skills from "./Skills";

const STORY_DURATION = 5000;
const CERT_COUNT = 11;

const highlights = [
  {
    key: "esports",
    label: "Esports",
    items: [
      { name: "Warcraft III", caption: "Where it all started. The game that got me into gaming", image: "https://i.pinimg.com/736x/81/e3/4c/81e34c6c9894c19f9748b65cc7816d3e.jpg" },
      { name: "Dota 2", caption: "Still can't uninstall. 6000+ hours and counting", image: "https://i.pinimg.com/736x/86/c9/58/86c958db7a90145f4ff566e819a4b284.jpg" },
      { name: "PUBG Mobile", caption: "Chicken dinners with friends and cousins", image: "https://wallpaperaccess.com/full/1311512.jpg" },
      { name: "Mobile Legends", caption: "Playing with my girl, spamming TP, laughing nonstop, and still winning", image: "https://i.pinimg.com/736x/7b/6e/33/7b6e333f23ee41ed249a8737207060f9.jpg" },
      { name: "PUBG: Battlegrounds", caption: "Late nights with the boys, just newbies having fun, still trying to figure out where the enemies were", image: "https://wallpaperaccess.com/full/840167.jpg" },
      { name: "GTA Series", caption: "San Andreas to GTA V. It never gets old", image: "https://i.pinimg.com/1200x/00/a7/bf/00a7bf0ec1548105dee8314de81a0a1e.jpg" },
      { name: "State of Decay 2", caption: "JJust me against the apocalypse, surviving on my own terms", image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/495420/page_bg_raw.jpg?t=1741378867" },
      { name: "Assassin's Creed", caption: "Every era, every blade. Best open worlds ever", image: "https://i.pinimg.com/736x/4e/1e/43/4e1e4352dda5bb6a52a7a35f35882c9a.jpg" },
    ],
  },
  {
    key: "sports",
    label: "Sports",
    items: [
      { name: "Billiards", caption: "I see the angles", image: "https://i.pinimg.com/736x/10/3b/76/103b76913b8ab538c82ea76d31fef1c0.jpg" },
      { name: "Badminton", caption: "Speed and reflexes. Best played with my gf", image: "https://i.pinimg.com/736x/30/0b/83/300b83676693906ceea86a960b3425c8.jpg" },
      { name: "Basketball", caption: "Shooting only!", image: "https://i.pinimg.com/736x/a4/52/96/a4529608dee54df24321e4badb4efcea.jpg" },
      { name: "Archery", caption: "No pressure, just for fun. Aim, breathe, release", image: "https://i.pinimg.com/1200x/72/06/0d/72060de3458e8bc3eb368ce175a3901d.jpg" },
    ],
  },
  {
    key: "passions",
    label: "Passions",
    items: [
      { name: "Web Dev", caption: "Building things for the modern web", image: "https://i.pinimg.com/736x/f0/ec/cd/f0eccdfe8f9bcafa3022b5d792b4d542.jpg" },
      { name: "UI/UX Design", caption: "Designing flows so smooth you never notice them", image: "https://i.pinimg.com/736x/26/82/37/2682378ad7c57a65995e78d58f527329.jpg" },
      { name: "Visual Arts", caption: "Started with pencil, now it's all pixels", image: "https://i.pinimg.com/736x/de/3b/86/de3b86bb28e29933c7f77ea4bdafc24b.jpg" },
      { name: "Content Creation", caption: "Still building the brand. One post at a time", image: "https://i.pinimg.com/736x/01/cc/ec/01ccec952586d124ebb44fe6217acd9b.jpg" },
    ],
  },
  {
    key: "cinema",
    label: "Cinema",
    items: [
      { name: "Marvel", caption: "Epic cinematic storytelling. Phase 1 to now", image: "https://i.pinimg.com/736x/6b/ff/90/6bff90d97cfa128acb006300609e444e.jpg" },
      { name: "The Walking Dead", caption: "From the original to the spinoffs, the best survival stories out there", image: "https://i.pinimg.com/736x/f4/67/9c/f4679cb7ec47e9f135eb356804637604.jpg" },
      { name: "The Chosen", caption: "A story that strengthens my faith every time I watch it", image: "https://i.pinimg.com/736x/ef/b1/c9/efb1c948e7bd484dbc6784f41e146021.jpg" },
      { name: "Monsterverse", caption: "Godzilla x Kong. The fight scenes hit different on the big screen", image: "https://i.pinimg.com/736x/16/68/08/1668080cf4dd4776a65e9a0a4966402f.jpg" },
    ],
  },
  {
    key: "pets",
    label: "Pets",
    items: [
      { name: "Combi", caption: "Baby combs", image: "https://i.pinimg.com/736x/c2/cc/19/c2cc191c67cbb4c949ab88dbf4b5d9b6.jpg" },
      { name: "Mochi", caption: "My babyba", image: "https://i.pinimg.com/736x/70/d9/f3/70d9f3b44afe76b167d73a7c9363ed2c.jpg" },
      { name: "Koki", caption: "Koking pasaway", image: "https://i.pinimg.com/736x/26/21/6a/26216ae015d001a5485962891316453b.jpg" },
      { name: "Kobe", caption: "Kobeng bait", image: "https://i.pinimg.com/736x/11/72/50/11725029c0c8d419a48d48357a38b8e9.jpg" },
      { name: "Rococo", caption: "Big boy", image: "https://i.pinimg.com/736x/e9/6d/fb/e96dfb95ce14003939aaa9cc5cf6579f.jpg" },
      { name: "Oli", caption: "Oliko", image: "https://i.pinimg.com/736x/9f/ba/be/9fbabe7b9331a111d051490b8f2ead4f.jpg" },
      { name: "Bulldog", caption: "Qt bulldog", image: "https://i.pinimg.com/736x/42/44/81/424481164efbcdcd4cfa2938511ec503.jpg" },
      { name: "Eli", caption: "Eli ganda", image: "https://i.pinimg.com/736x/59/1b/93/591b93314e3290cc7b34d74f6f4ae829.jpg" },
      { name: "Yuri", caption: "Yuripotpot", image: "https://i.pinimg.com/736x/db/40/21/db40219179199a90cf0b77110479aa97.jpg" },
      /* No photos :<
      { name: "Puri", caption: "Puriiii", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
      { name: "Charm", caption: "Charrrm", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
      { name: "Bruce", caption: "Banner", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
      { name: "Tyrone", caption: "Banner", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
      { name: "Sweet sweet", caption: "Banner", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
       */
    ],
  },
];

const profileStory = {
  key: "profile",
  label: "Antonio",
  items: [
    {
      name: " ",
      caption: "Looking for full time job WFH setup.",
      image: "https://thumbs.dreamstime.com/b/jobless-man-sign-hire-me-searching-job-male-character-unemployed-showing-table-candidate-work-looking-vacancy-189585050.jpg",
    },
  ],
};

const posts = [
  {
    id: "ac-archi",
    period: "2024 to Present",
    role: "Freelance Web Developer",
    company: "Multiple Clients",
    desc: "Working freelance on a mix of projects, company websites, booking tools, online stores, and AI integrations for clients.",
    tags: ["ReactJS", "GeminiAPI", "FramerMotion"],
  },
  {
    id: "working-student",
    period: "2022 to 2024",
    role: "Getting the Degree",
    company: "University of Nueva Caceres",
    desc: "Came back as a working student to finish what I started. Graduated with a Computer Science degree.",
    tags: ["ComputerScience", "Graduated"],
  },
  {
    id: "broadlume",
    period: "2021 to 2023",
    role: "Data and Advertising Operations Specialist",
    company: "Wide-out Workforces Inc. (Broadlume)",
    desc: "Paused college to work full-time during the pandemic. Handled product data across hundreds of client websites, ran data audits, kept catalogs accurate, and worked closely with the marketing team.",
    tags: ["Salesforce", "Excel", "Floorforce"],
  },
  {
    id: "college",
    period: "2018 to 2020",
    role: "Bachelor of Science in Computer Science",
    company: "University of Nueva Caceres",
    desc: "Started college for Computer Science, building on the foundation from senior high school.",
    tags: ["ComputerScience"],
  },
  {
    id: "shs",
    period: "2016 to 2018",
    role: "Computer Programming",
    company: "Camarines Sur National High School",
    desc: "Built Zombie Maze and a Sales Information System as school projects. This is where the real foundation started.",
    tags: ["Java", "PHP", "MySQL"],
  },
  {
    id: "jhs",
    period: "2012 to 2016",
    role: "Visual Arts",
    company: "Camarines Sur National High School",
    desc: "Trained in painting, drawing, and sculpture. It still shapes every design decision I make today.",
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

function HighlightCircle({ group, onOpen, setIsHovering, viewed }) {
  return (
    <button
      onClick={() => onOpen(group)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", flexShrink: 0, width: "clamp(88px, 8vw, 104px)" }}
    >
      <div
        style={{
          width: "clamp(78px, 7vw, 92px)",
          height: "clamp(78px, 7vw, 92px)",
          borderRadius: "50%",
          padding: 3,
          background: viewed
            ? "rgba(242,242,242,0.28)"
            : "linear-gradient(135deg, #1877F2, #42A5F5, #1877F2)",
        }}
      >
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

const HEART_COLORS = ["#ff4d6d", "#ff758f", "#ff2e63", "#ff8fa3", "#ffb3c1"];
const MAX_HEARTS = 40;
const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
  
function HeartReact({ setIsHovering }) {
  const [hearts, setHearts] = useState([]);
  const idRef = useRef(0);
  const reduceMotion = useReducedMotion();

  const burst = () => {
    const count = 1 + Math.floor(Math.random() * 3);
    const fresh = Array.from({ length: count }, () => ({
      id: idRef.current++,
      size: 16 + Math.random() * 16,
      x: -60 + Math.random() * 75,
      rise: 160 + Math.random() * 140,
      rotate: -30 + Math.random() * 60,
      duration: 1.3 + Math.random() * 0.9,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
    }));
    setHearts((current) => [...current, ...fresh].slice(-MAX_HEARTS));
  };

  const removeHeart = (id) =>
    setHearts((current) => current.filter((h) => h.id !== id));

  return (
    <div
      style={{
        position: "absolute",
        right: 14,
        bottom: 18,
        width: 48,
        height: 48,
        zIndex: 5,
      }}
    >
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {hearts.map((h) => (
          <motion.svg
            key={h.id}
            viewBox="0 0 24 24"
            width={h.size}
            height={h.size}
            fill={h.color}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.4, rotate: 0 }}
            animate={
              reduceMotion
                ? { opacity: 0, scale: 1 }
                : {
                    opacity: [1, 1, 0],
                    x: h.x,
                    y: -h.rise,
                    scale: [0.4, 1.1, 1],
                    rotate: h.rotate,
                  }
            }
            transition={{ duration: h.duration, ease: "easeOut" }}
            onAnimationComplete={() => removeHeart(h.id)}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              marginLeft: -h.size / 2,
              marginTop: -h.size / 2,
              filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.35))",
            }}
          >
            <path d={HEART_PATH} />
          </motion.svg>
        ))}
      </div>

      <motion.button
        onClick={burst}
        whileTap={{ scale: 0.82 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        aria-label="Send a heart"
        title="Send a heart"
        style={{
          position: "relative",
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "none",
          background: "rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          touchAction: "manipulation",
          zIndex: 1,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff4d6d">
          <path d={HEART_PATH} />
        </svg>
      </motion.button>
    </div>
  );
}

function StoryModal({ group, onClose, onFinish, setIsHovering }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const elapsedRef = useRef(0);

  const total = group.items.length;
  const current = group.items[index];
  const duration = Math.min(
    12000,
    Math.max(STORY_DURATION, current.caption.length * 90)
  );

  const goNext = useCallback(() => {
    if (index >= total - 1) {
      onFinish?.(group.key);
      onClose();
    } else {
      setIndex(index + 1);
    }
  }, [index, total, onClose, onFinish, group.key]);

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  useEffect(() => {
    setProgress(0);
    elapsedRef.current = 0;
    startRef.current = null;
    setPaused(false);
  }, [index]);

  useEffect(() => {
    if (paused) {
      cancelAnimationFrame(rafRef.current);
      startRef.current = null;
      return;
    }
    const tick = (t) => {
      if (startRef.current === null) startRef.current = t - elapsedRef.current;
      elapsedRef.current = t - startRef.current;
      const pct = Math.min(100, (elapsedRef.current / duration) * 100);
      setProgress(pct);
      if (pct >= 100) goNext();
      else rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, index, goNext, duration]);

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
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 500, color: "#fff", letterSpacing: "0.02em", flex: 1 }}>{group.label}</span>
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
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "3rem 5rem 1.5rem 1.25rem",
            background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.3rem",
              fontWeight: 600,
              color: "#fff",
              marginBottom: "0.3rem",
              overflowWrap: "anywhere",
            }}
          >
            {current.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.8)",
              overflowWrap: "anywhere",
              display: "-webkit-box",
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {current.caption}
          </div>
        </div>

        {/* Tap zones */}
        <div onClick={goPrev} style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "40%", zIndex: 2, cursor: "pointer" }} />
        <div onClick={goNext} style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "60%", zIndex: 2, cursor: "pointer" }} />

        {/* Heart react */}
        <HeartReact setIsHovering={setIsHovering} />
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
      aria-label={liked ? "Unlike" : "Like"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: liked ? "#ff4d6d" : "var(--ink-faint)",
        fontFamily: "var(--font-body)",
        fontSize: "0.85rem",
        minHeight: 44,
        padding: "0 0.25rem",
        touchAction: "manipulation",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={liked ? "#ff4d6d" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{ flexShrink: 0, overflow: "visible" }}
      >
        <path d={HEART_PATH} />
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

const VIEWED_KEY = "highlightsViewed";

const readViewed = () => {
  try {
    const raw = sessionStorage.getItem(VIEWED_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
};

export default function About({ setIsHovering, onSelectProject }) {
  const [openGroup, setOpenGroup] = useState(null);
  const [activeTab, setActiveTab] = useState("projects");
  const [viewed, setViewed] = useState(readViewed);
  const ref = useRef(null);

  const markViewed = useCallback((key) => {
    setViewed((prev) => (prev.has(key) ? prev : new Set(prev).add(key)));
  }, []);

  const closeGroup = useCallback(() => setOpenGroup(null), []);

  useEffect(() => {
    try {
      sessionStorage.setItem(VIEWED_KEY, JSON.stringify([...viewed]));
    } catch {
      // storage blocked, ignore
    }
  }, [viewed]);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        minHeight: "80vh",
        padding: "7.5rem 0",
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
        .ig-avatar-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          flex-shrink: 0;
        }
        .ig-avatar {
          aspect-ratio: 1/1;
          width: clamp(90px, 22vw, 220px);
          height: auto;
          max-width: 220px;
          border-radius: 50%;
          padding: 3px;
          transition: background 0.3s ease;
        }
        .ig-avatar-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          padding: 3px;
          background: var(--paper);
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
        .ig-bio { font-size: clamp(0.95rem, 1.1vw, 1.05rem); line-height: 1.75; color: var(--ink-soft); margin: 0; max-width: 700px; text-align: justify; text-justify: inter-word; }
        @media (max-width: 640px) {
          .ig-stats-line { justify-content: center; gap: 1.2rem; }
          .ig-fullname { justify-content: center; width: 100%; }
          .ig-bio { text-align: center; }
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
          <button
            className="ig-avatar-btn"
            onClick={() => setOpenGroup(profileStory)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            aria-label="View my story"
          >
            <div
              className="ig-avatar"
              style={{
                background: viewed.has("profile")
                  ? "rgba(242,242,242,0.28)"
                  : "linear-gradient(135deg, #1877F2, #42A5F5, #1877F2)",
              }}
            >
              <div className="ig-avatar-inner">
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
            </div>
          </button>

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

            <p className="ig-bio" style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem"}}>
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
          viewed={viewed.has(group.key)}
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
            onClose={closeGroup}
            onFinish={markViewed}
            setIsHovering={setIsHovering}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
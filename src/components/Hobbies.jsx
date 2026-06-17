import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const categories = [
  { key: "gaming", label: "Gaming" },
  { key: "sports", label: "Sports" },
  { key: "passions", label: "Passions" },
  { key: "universes", label: "Universes" },
  { key: "companions", label: "Companions" },
];

const hobbies = {
  gaming: [
    {
      name: "Dota 2",
      description: "Competitive 5v5 strategy",
      image: "https://i.pinimg.com/736x/86/c9/58/86c958db7a90145f4ff566e819a4b284.jpg",
    },
    {
      name: "PUBG PC",
      description: "Tactical battle royale",
      image: "https://i.pinimg.com/1200x/d4/3f/26/d43f26c0feb995992405ce05cb248309.jpg",
    },
    {
      name: "PUBG Mobile",
      description: "Mobile survival tactics",
      image: "https://i.pinimg.com/736x/35/61/cc/3561ccebadac5b4a1db3bbe731a2f8a3.jpg",
    },
    {
      name: "Mobile Legends",
      description: "Rapid MOBA action",
      image: "https://i.pinimg.com/736x/29/1c/42/291c42e91ca95d339c832e05b74b8e3f.jpg",
    },
    {
      name: "GTA Series",
      description: "Expansive sandbox chaos",
      image: "https://i.pinimg.com/1200x/00/a7/bf/00a7bf0ec1548105dee8314de81a0a1e.jpg",
    },
    {
      name: "State of Decay",
      description: "Zombie survival management",
      image: "https://wallpapers.com/images/high/giant-zombie-state-of-decay-2-vwd7vpgxw5hwhxhw.webp",
    },
    {
      name: "Assassin's Creed Series",
      description: "Historical stealth and exploration",
      image: "https://images.hdqwalls.com/wallpapers/assassins-creed-odyssey-fight-4k-tb.jpg",
    },
    {
      name: "Warcraft III",
      description: "Classic fantasy RTS",
      image: "https://i.pinimg.com/736x/81/e3/4c/81e34c6c9894c19f9748b65cc7816d3e.jpg",
    },
  ],
  sports: [
    {
      name: "Billiards",
      description: "Precision and angles",
      image: "https://images.unsplash.com/photo-1723073249932-b89fe9cdc762?q=80&w=626&auto=format&fit=crop",
    },
    {
      name: "Badminton",
      description: "Speed and reflexes",
      image: "https://images.unsplash.com/photo-1721760886982-3c643f05813d?q=80&w=1170&auto=format&fit=crop",
    },
    {
      name: "Basketball",
      description: "Teamwork and hustle",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop",
    },
    {
      name: "Archery",
      description: "Focus and discipline",
      image: "https://images.unsplash.com/photo-1646186147988-873987270189?q=80&w=1170&auto=format&fit=crop",
    },
  ],
  passions: [
    {
      name: "UI/UX Design",
      description: "Crafting intuitive journeys",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    },
    {
      name: "Visual Arts",
      description: "Digital illustration and aesthetics",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop",
    },
    {
      name: "Web Dev",
      description: "Building for the modern web",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    },
    {
      name: "Photography",
      description: "Capturing the perfect frame",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop",
    },
  ],
  universes: [
    {
      name: "Marvel",
      description: "Epic cinematic storytelling",
      image: "https://i.pinimg.com/736x/71/d0/8c/71d08caf066e888827ab1b888415f320.jpg",
    },
    {
      name: "The Walking Dead",
      description: "Gritty apocalypse survival",
      image: "https://i.pinimg.com/736x/f4/67/9c/f4679cb7ec47e9f135eb356804637604.jpg",
    },
    {
      name: "The Chosen",
      description: "Groundbreaking historical drama",
      image: "https://i.pinimg.com/736x/ef/b1/c9/efb1c948e7bd484dbc6784f41e146021.jpg",
    },
    {
      name: "Monsterverse",
      description: "Godzilla x Kong",
      image: "https://i.pinimg.com/736x/16/68/08/1668080cf4dd4776a65e9a0a4966402f.jpg",
    },
  ],
  companions: [
    {
      name: "Mochi",
      description: "My babyba",
      image: "https://i.pinimg.com/736x/14/f3/9d/14f39d4473009970549c659366a4cf92.jpg",
    },
    {
      name: "Koki",
      description: "Kokiruoki? Koking pasaway",
      image: "https://i.pinimg.com/736x/d1/8e/1e/d18e1ecd303ac535702d641cad08bb7e.jpg",
    },
    {
      name: "Combi",
      description: "Baby combs",
      image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg",
    },
  ],
};

function HobbyCard({ item, index, setIsHovering }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      whileHover={{ y: -8, scale: 1.03 }}
      onMouseEnter={() => { setIsHovering(true); setHovered(true); }}
      onMouseLeave={() => { setIsHovering(false); setHovered(false); }}
      style={{
        position: "relative",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: "3 / 4",
        border: hovered
          ? "1px solid rgba(0,212,255,0.4)"
          : "1px solid rgba(255,255,255,0.06)",
        boxShadow: hovered
          ? "0 8px 32px rgba(0,212,255,0.15)"
          : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Background image */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${item.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        transition: "transform 0.5s ease",
      }} />

      {/* Gradient overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(10,15,30,0.95) 0%, rgba(10,15,30,0.4) 40%, rgba(10,15,30,0.1) 100%)",
      }} />

      {/* Top glow accent */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "linear-gradient(90deg, transparent, var(--cyan), transparent)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s",
      }} />

      {/* Content at bottom */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
      }}>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "1rem",
          fontWeight: 700,
          color: "var(--white)",
          lineHeight: 1.3,
        }}>
          {item.name}
        </span>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--cyan)",
          opacity: 0.8,
          letterSpacing: "0.04em",
        }}>
          {item.description}
        </span>
      </div>
    </motion.div>
  );
}

export default function Hobbies({ setIsHovering }) {
  const [activeCategory, setActiveCategory] = useState("gaming");

  const items = hobbies[activeCategory];

  return (
    <section id="hobbies" style={{ padding: "7rem 0", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3rem" }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-mono)", fontSize: "0.75rem",
            color: "var(--cyan)", letterSpacing: "0.2em",
            textTransform: "uppercase", marginBottom: "1.5rem",
          }}
        >
          Beyond the Code
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem,4vw,3rem)",
            fontWeight: 700, marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          What I do when I'm not coding
        </motion.h2>

        <p style={{ marginBottom: "2.5rem", fontSize: "1rem" }}>
          I game hard, move fast, and create when I can.
        </p>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: "flex", gap: "0.5rem", marginBottom: "2.5rem",
            background: "rgba(30,42,58,0.5)", borderRadius: 12,
            padding: "0.35rem", width: "fit-content",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                position: "relative",
                padding: "0.6rem 1.5rem",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: activeCategory === cat.key ? "var(--navy)" : "var(--muted)",
                background: activeCategory === cat.key ? "var(--cyan)" : "transparent",
                transition: "all 0.3s ease",
                zIndex: 1,
              }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
            }}
          >
            {items.map((item, i) => (
              <HobbyCard
                key={item.name}
                item={item}
                index={i}
                setIsHovering={setIsHovering}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
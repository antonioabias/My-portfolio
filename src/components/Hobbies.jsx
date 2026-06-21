import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const categories = [
  { key: "gaming", label: "Gaming" },
  { key: "sports", label: "Sports" },
  { key: "passions", label: "Passions" },
  { key: "cinema", label: "Cinema" },
  { key: "companions", label: "Companions" },
];

const captions = {
  gaming: "Games I keep coming back to no matter what.",
  sports: "Physical stuff I actually enjoy doing.",
  passions: "Things I'd do even if nobody paid me.",
  cinema: "Shows and universes I keep rewatching.",
  companions: "My pets. The real ones.",
};

const hobbies = {
  gaming: [
    { name: "Warcraft III", description: "Where it all started. The game that got me into gaming.", image: "https://i.pinimg.com/736x/81/e3/4c/81e34c6c9894c19f9748b65cc7816d3e.jpg" },
    { name: "Dota 2", description: "Still can't uninstall. 6000+ hours and counting.", image: "https://i.pinimg.com/736x/86/c9/58/86c958db7a90145f4ff566e819a4b284.jpg" },
    { name: "PUBG Mobile", description: "Mobile survival tactics at its best.", image: "https://i.pinimg.com/736x/35/61/cc/3561ccebadac5b4a1db3bbe731a2f8a3.jpg" },
    { name: "Mobile Legends", description: "Rapid MOBA action. Classic Friday nights.", image: "https://i.pinimg.com/736x/29/1c/42/291c42e91ca95d339c832e05b74b8e3f.jpg" },
    { name: "PUBG PC", description: "Tactical battle royale. Way harder than mobile.", image: "https://i.pinimg.com/1200x/d4/3f/26/d43f26c0feb995992405ce05cb248309.jpg" },
    { name: "GTA Series", description: "San Andreas to GTA V. Never gets old.", image: "https://i.pinimg.com/1200x/00/a7/bf/00a7bf0ec1548105dee8314de81a0a1e.jpg" },
    { name: "State of Decay", description: "Zombie survival management done right.", image: "https://wallpapers.com/images/high/giant-zombie-state-of-decay-2-vwd7vpgxw5hwhxhw.webp" },
    { name: "Assassin's Creed", description: "Every era, every blade. Best open worlds ever.", image: "https://images.hdqwalls.com/wallpapers/assassins-creed-odyssey-fight-4k-tb.jpg" },
  ],
  sports: [
    { name: "Billiards", description: "I see the angles.", image: "https://i.pinimg.com/736x/d7/2e/ca/d72eca7a5fb02773f1ab436040578360.jpg" },
    { name: "Badminton", description: "Speed and reflexes. Best played with gf.", image: "https://i.pinimg.com/736x/30/0b/83/300b83676693906ceea86a960b3425c8.jpg" },
    { name: "Basketball", description: "Teamwork and hustle. Classic Sundays with the boys.", image: "https://i.pinimg.com/1200x/df/25/26/df2526fe4b20a4e8ae39923e8444645a.jpg" },
    { name: "Archery", description: "Breathe, aim, release. Requires a lot of focus.", image: "https://i.pinimg.com/736x/dd/dc/b4/dddcb4f4b02a899077658d6bbba7ba79.jpg" },
  ],
  passions: [
    { name: "UI/UX Design", description: "If it feels obvious, I did it right.", image: "https://miro.medium.com/v2/resize:fit:2000/1*FgUVo0m0AwnNRPICeKS7KA.jpeg" },
    { name: "Visual Arts", description: "Started with pencil, now it's all pixels.", image: "https://i.pinimg.com/736x/de/3b/86/de3b86bb28e29933c7f77ea4bdafc24b.jpg" },
    { name: "Web Dev", description: "Building things for the modern web.", image: "https://i.pinimg.com/736x/03/17/16/031716e4bfd0ffbc554b76740f5075a1.jpg" },
    { name: "Content Creation", description: "Still building the brand. One post at a time.", image: "https://i.pinimg.com/736x/cb/25/63/cb2563c1afdc4a836765b00bbe2fed01.jpg" },
  ],
  cinema: [
    { name: "Marvel", description: "Epic cinematic storytelling. Phase 1 to now.", image: "https://i.pinimg.com/736x/71/d0/8c/71d08caf066e888827ab1b888415f320.jpg" },
    { name: "The Walking Dead", description: "Gritty apocalypse survival. Best character arcs ever.", image: "https://i.pinimg.com/736x/f4/67/9c/f4679cb7ec47e9f135eb356804637604.jpg" },
    { name: "The Chosen", description: "Groundbreaking historical drama. Highly recommend.", image: "https://i.pinimg.com/736x/ef/b1/c9/efb1c948e7bd484dbc6784f41e146021.jpg" },
    { name: "Monsterverse", description: "Godzilla x Kong. Pure spectacle every time.", image: "https://i.pinimg.com/736x/16/68/08/1668080cf4dd4776a65e9a0a4966402f.jpg" },
  ],
  companions: [
    { name: "Combi", description: "Baby combs", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
    { name: "Mochi", description: "My babyba", image: "https://i.pinimg.com/736x/14/f3/9d/14f39d4473009970549c659366a4cf92.jpg" },
    { name: "Koki", description: "Koking pasaway", image: "https://i.pinimg.com/736x/d1/8e/1e/d18e1ecd303ac535702d641cad08bb7e.jpg" },
    { name: "Kobe", description: "Kobeng bait", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
    { name: "Rococo", description: "Big boy", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
    { name: "Oli", description: "Oliko", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
    { name: "Bulldog", description: "Qt bulldog", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
    { name: "Eli", description: "Eli ganda", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
    { name: "Yuri", description: "Yuripotpot", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
    { name: "Puri", description: "Puriiii", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
    { name: "Charm", description: "Charrrm", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
    { name: "Bruce", description: "Banner", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
    { name: "Tyrone", description: "Banner", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
    { name: "Sweet sweet", description: "Banner", image: "https://i.pinimg.com/736x/7e/8c/94/7e8c94fd5b1ede675e97297091253fe9.jpg" },
  ],
};

function HobbyCard({ item, index, setIsHovering }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onMouseEnter={() => { setIsHovering(true); setFlipped(true); }}
      onMouseLeave={() => { setIsHovering(false); setFlipped(false); }}
      onClick={() => setFlipped((f) => !f)}
      style={{
        aspectRatio: "3 / 4",
        perspective: 1000,
        cursor: "pointer",
      }}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: 14, overflow: "hidden",
          backfaceVisibility: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover", backgroundPosition: "center",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 35%, transparent 65%)",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "1rem",
          }}>
            <span style={{
              fontFamily: "var(--font-display)", fontSize: "0.9rem",
              fontWeight: 700, color: "var(--white)", lineHeight: 1.3,
              display: "block",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {item.name}
            </span>
          </div>
        </div>

        {/* BACK */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 14,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: "rgba(0,0,0,0.5) 40%", border: "1px solid rgba(0,212,255,0.3)",
          display: "flex", flexDirection: "column", justifyContent: "center",
          alignItems: "center", padding: "1.25rem", gap: "0.75rem", textAlign: "center",
          }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--white)", lineHeight: 1.3 }}>
            {item.description}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hobbies({ setIsHovering }) {
  const [activeCategory, setActiveCategory] = useState("gaming");
  const items = hobbies[activeCategory];

  return (
    <section id="hobbies" style={{ padding: "clamp(4rem, 8vw, 7rem) 0", position: "relative", zIndex: 0 }}>
      <style>{`.tab-scroll::-webkit-scrollbar { display: none; }`}</style>

      <div style={{ maxWidth: 1400, margin: "0 auto", width: "min(92%, 1200px)" }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-mono)", fontSize: "0.75rem",
            color: "var(--cyan)", letterSpacing: "0.2em",
            textTransform: "uppercase", marginBottom: "1rem",
          }}
        >
          Beyond the Code
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 700, marginBottom: "2.5rem",
            letterSpacing: "-0.02em",
          }}
        >
          Things I'll never <em style={{ fontStyle: "italic" }}>get tired of.</em>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="tab-scroll"
          style={{
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            padding: "0.35rem",
            background: "rgba(30,42,58,0.5)",
            borderRadius: 12,
            marginBottom: "1rem",
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
                flex: "1 0 auto",
                minWidth: "max-content",
                padding: "0.6rem 1.2rem",
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
              }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={activeCategory + "-caption"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              fontSize: "0.95rem",
              color: "var(--muted)",
              marginBottom: "2rem",
              marginTop: "0.5rem",
            }}
          >
            {captions[activeCategory]}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: "1rem",
            }}
          >
            {items.map((item, i) => (
              <HobbyCard key={item.name} item={item} index={i} setIsHovering={setIsHovering} />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
import { motion } from "framer-motion";

const stats = [
  { num: "6+", label: "Years Coding" },
  { num: "2+", label: "Years Professional" },
  { num: "10", label: "Certifications" },
];

const MY_PHOTO = "https://scontent.fmnl9-3.fna.fbcdn.net/v/t39.30808-6/461184622_3974187352819243_3622181858532250600_n.jpg?stp=dst-jpg_tt6&cstp=mx960x954&ctp=s960x954&_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFCPa8UyUK6NZbioeOjcIsPJBr4TTs24K8kGvhNOzbgr38lJyVDJ_w4mKtQEctsRxMuwUOA-7W6aPiFvhPQ6Mbd&_nc_ohc=0uRmrJ2OE-gQ7kNvwH1sQNI&_nc_oc=AdqCvUV2NorLTzEqbuHeoPRn7pB3KwvbMgiR42erkB9Dydsh0iuzik_s6hKWXk--OTI&_nc_zt=23&_nc_ht=scontent.fmnl9-3.fna&_nc_gid=suIOkWPMzDScJPQp8v-ZNQ&_nc_ss=7b2a8&oh=00_Af-CmduombFFmEULtCLfKDNu6vkvUUdaaF5nlMI_qy9Scw&oe=6A35E7B9";

export default function About({ setIsHovering }) {
  const badges = [
    {
      name: "React.js",
      logo: "https://cdn.simpleicons.org/react/00D4FF",
    },
    {
      name: "Node.js",
      logo: "https://cdn.simpleicons.org/nodedotjs/339933",
    },
    {
      name: "Claude",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Claude_AI_symbol.svg/1280px-Claude_AI_symbol.svg.png",
    },
  ];

  return (
    <section id="about" style={{ padding: "7rem 0", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", width: "63%" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}
        >
          About
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
              A developer with an <span style={{ color: "var(--cyan)" }}>artist's eye.</span>
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.8 }}>
              CS graduate from the University of Nueva Caceres with 6 years of coding experience and 2 years in professional roles spanning data management, advertising operations, and digital systems.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.8 }}>
              My background in Visual Arts and Computer Programming taught me that great software is not just functional, it is <em>felt</em>. I build things that work beautifully.
            </p>
            <div style={{ display: "flex", gap: "2.5rem", marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {stats.map(({ num, label }, i) => (
                <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, color: "var(--cyan)", lineHeight: 1 }}>{num}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ position: "relative" }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{ aspectRatio: "3/4", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,212,255,0.2)", position: "relative" }}
            >
              <img
                src={MY_PHOTO}
                alt="Antonio Abias Jr."
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "grayscale(20%)" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,15,30,0.6) 0%, transparent 50%)" }} />
            </motion.div>

            {badges.map((badge, i) => (
              <motion.div
                key={badge.name}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                aria-label={badge.name}
                style={{
                  position: "absolute",
                  top: i === 0 ? "10%" : i === 1 ? "45%" : "75%",
                  right: "-20%",
                  width: 68,
                  height: 68,
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(30,42,58,0.9)", backdropFilter: "blur(8px)",
                  border: "1px solid rgba(0,212,255,0.3)",
                  borderRadius: 999,
                  padding: 0,
                }}
              >
                <img
                  src={badge.logo}
                  alt={badge.name}
                  style={{ width: 34, height: 34, objectFit: "contain" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
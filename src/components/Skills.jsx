const TOTAL = 10;

const levelInfo = (n) => {
  if (n <= 3) return { label: "Novice", color: "#6b7280" };
  if (n <= 5) return { label: "Learning", color: "#eab308" };
  if (n <= 7) return { label: "Skilled", color: "#4ade80" };
  if (n <= 9) return { label: "Expert", color: "#22d3ee" };
  return { label: "Maxed", color: "#f0fdf4" };
};

const SKILL_ICONS = new Set([
  "react", "javascript", "typescript", "html", "css", "bootstrap", "tailwind", "jquery",
  "nodejs", "php", "python", "java", "cpp", "mysql", "mongodb", "firebase", "github",
  "vscode", "figma", "aws", "gcp", "angular", "vue", "nextjs",
]);

const LOGO_URLS = {
  framer: "https://thesvg.org/icons/framer/default.svg", webflow: "https://thesvg.org/icons/webflow/default.svg",
  wordpress: "https://thesvg.org/icons/wordpress/default.svg", wix: "https://thesvg.org/icons/wix/default.svg",
  canva: "https://thesvg.org/icons/canva/default.svg", claude: "https://thesvg.org/icons/claude/default.svg",
  openai: "https://thesvg.org/icons/openai/default.svg", cursor: "https://thesvg.org/icons/cursor/default.svg",
  zapier: "https://thesvg.org/icons/zapier/default.svg", make: "https://thesvg.org/icons/make/default.svg",
  n8n: "https://thesvg.org/icons/n8n/default.svg", gemini: "https://thesvg.org/icons/gemini/default.svg",
  copilot: "https://thesvg.org/icons/microsoft-copilot/default.svg", perplexity: "https://thesvg.org/icons/perplexity/default.svg",
  salesforce: "https://thesvg.org/icons/salesforce/default.svg", excel: "https://thesvg.org/icons/microsoft-excel/default.svg",
  hubspot: "https://thesvg.org/icons/hubspot/default.svg", notion: "https://thesvg.org/icons/notion/default.svg",
  gsheets: "https://thesvg.org/icons/google-sheets-2026/default.svg", trello: "https://thesvg.org/icons/trello/default.svg",
  clickup: "https://thesvg.org/icons/clickup/default.svg", monday: "https://thesvg.org/icons/monday/mono.svg",
  slack: "https://thesvg.org/icons/slack/default.svg", netlify: "https://thesvg.org/icons/netlify/default.svg",
  antigravity: "https://thesvg.org/icons/google-antigravity/default.svg",
};

const IconBadge = ({ icon }) => {
  const src = SKILL_ICONS.has(icon)
    ? `https://skillicons.dev/icons?i=${icon}`
    : LOGO_URLS[icon] || null;
  if (!src) return <div style={{ width: 22, height: 22, flexShrink: 0 }} />;
  return <img src={src} alt={icon} style={{ width: 22, height: 22, flexShrink: 0, objectFit: "contain" }} />;
};

const StatBar = ({ name, icon, level }) => {
  const { label, color } = levelInfo(level);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "0.75rem",
      padding: "0.45rem 0",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
    }}>
      <IconBadge icon={icon} />
      <span style={{
        fontFamily: "var(--font-mono)", fontSize: "0.7rem",
        color: "rgba(255,255,255,0.8)", width: 90, flexShrink: 0,
        letterSpacing: "0.02em",
      }}>
        {name}
      </span>
      <div style={{ display: "flex", gap: 3, flex: 1 }}>
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 8, borderRadius: 2,
            background: i < level ? "#f0fdf4" : "rgba(255,255,255,0.06)",
          }} />
        ))}
      </div>
      <span style={{
        fontFamily: "var(--font-mono)", fontSize: "0.58rem",
        color, letterSpacing: "0.1em",
        width: 60, textAlign: "right", flexShrink: 0,
        textTransform: "uppercase",
      }}>
        {label}
      </span>
    </div>
  );
};

const CategoryBlock = ({ category, items }) => (
  <div style={{
    marginBottom: "1.25rem",
    background: "var(--navy)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 16,
    padding: "1.25rem 1.5rem",
  }}>
    <div style={{
      fontFamily: "var(--font-display)", fontSize: "0.85rem",
      color: "#ffffff", letterSpacing: "0.25em",
      textTransform: "uppercase", fontWeight: 600,
      marginBottom: "0.85rem", paddingBottom: "0.5rem",
      borderBottom: "1px solid rgba(74,222,128,0.15)",
    }}>
      {category}
    </div>
    {items.map((item) => (
      <StatBar key={item.name} {...item} />
    ))}
  </div>
);

const leftGroups = [
  {
    category: "No-Code and Prototyping",
    items: [
      { name: "Framer", icon: "framer", level: 8 },
      { name: "Figma", icon: "figma", level: 8 },
      { name: "Webflow", icon: "webflow", level: 5 },
      { name: "WordPress", icon: "wordpress", level: 5 },
      { name: "Canva", icon: "canva", level: 10 },
      { name: "Wix", icon: "wix", level: 5 },
    ],
  },
  {
    category: "Front-end",
    items: [
      { name: "HTML", icon: "html", level: 9 },
      { name: "CSS", icon: "css", level: 9 },
      { name: "JavaScript", icon: "javascript", level: 9 },
      { name: "React", icon: "react", level: 7 },
      { name: "Next.js", icon: "nextjs", level: 5 },
      { name: "TypeScript", icon: "typescript", level: 5 },
      { name: "Tailwind", icon: "tailwind", level: 6 },
      { name: "Bootstrap", icon: "bootstrap", level: 7 },
      { name: "Angular", icon: "angular", level: 5 },
      { name: "Vue", icon: "vue", level: 5 },
      { name: "jQuery", icon: "jquery", level: 5 },
    ],
  },
  {
    category: "Back-end and Database",
    items: [
      { name: "Node.js", icon: "nodejs", level: 7 },
      { name: "Firebase", icon: "firebase", level: 8 },
      { name: "MySQL", icon: "mysql", level: 7 },
      { name: "Python", icon: "python", level: 6 },
      { name: "PHP", icon: "php", level: 6 },
      { name: "Java", icon: "java", level: 5 },
      { name: "C++", icon: "cpp", level: 4 },
    ],
  },
];

const rightGroups = [
  {
    category: "AI and Automation",
    items: [
      { name: "Claude", icon: "claude", level: 8 },
      { name: "ChatGPT", icon: "openai", level: 8 },
      { name: "Cursor", icon: "cursor", level: 6 },
      { name: "Gemini", icon: "gemini", level: 8 },
      { name: "Copilot", icon: "copilot", level: 7 },
      { name: "Perplexity", icon: "perplexity", level: 7 },
      { name: "Zapier", icon: "zapier", level: 5 },
      { name: "Make", icon: "make", level: 5 },
      { name: "n8n", icon: "n8n", level: 5 },
    ],
  },
  {
    category: "Data and Operations",
    items: [
      { name: "Salesforce", icon: "salesforce", level: 8 },
      { name: "Excel", icon: "excel", level: 8 },
      { name: "Notion", icon: "notion", level: 5 },
      { name: "Google Sheets", icon: "gsheets", level: 8 },
      { name: "Slack", icon: "slack", level: 10 },
      { name: "ClickUp", icon: "clickup", level: 9 },
      { name: "Trello", icon: "trello", level: 9 },
      { name: "HubSpot", icon: "hubspot", level: 6 },
      { name: "Monday", icon: "monday", level: 10 },
    ],
  },
  {
    category: "Dev Tools and Cloud",
    items: [
      { name: "VS Code", icon: "vscode", level: 10 },
      { name: "GitHub", icon: "github", level: 9 },
      { name: "Antigravity", icon: "antigravity", level: 8 },
      { name: "AWS", icon: "aws", level: 5 },
      { name: "GCP", icon: "gcp", level: 4 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "7rem 0", position: "relative", zIndex: 1 }}>
      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 1100, margin: "0 auto", padding: "0 3rem",
      }}>

        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "0.75rem",
          color: "var(--cyan)", letterSpacing: "0.2em",
          textTransform: "uppercase", marginBottom: "1.5rem",
        }}>
          Skills
        </div>

        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "2.5rem",
          flexWrap: "wrap", gap: "1rem",
        }}>
          <div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 700, letterSpacing: "-0.02em", margin: 0,
            }}>
              Stats
            </h2>
            <p style={{
              fontFamily: "var(--font-display)", fontSize: "1rem",
              lineHeight: 1.8, marginTop: "0.4rem",
              marginBottom: 0,
            }}>
              These bars aren't full yet. Got a project for me?
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 2rem" }}>
          <div>{leftGroups.map((g) => <CategoryBlock key={g.category} {...g} />)}</div>
          <div>{rightGroups.map((g) => <CategoryBlock key={g.category} {...g} />)}</div>
        </div>

      </div>
    </section>
  );
}
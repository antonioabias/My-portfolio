import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Hobbies from "./components/Hobbies";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import fluidCursor from "./assets/use-FluidCursor";
import "./index.css";

export default function App() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [, setIsHovering] = useState(false);

  useEffect(() => {
    fluidCursor();
  }, []);

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <canvas id="fluid" className="fluid-cursor" aria-hidden="true" />

      {/* React logo cursor on top of fluid effect */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: mousePos.x,
          top: mousePos.y,
          transform: "translate(-50%, -50%)",
          width: 28,
          height: 28,
          pointerEvents: "none",
          zIndex: 10000,
          display: "grid",
          placeItems: "center",
        }}
      >
        <div className="react-cursor-spin">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" role="presentation">
            <ellipse cx="12" cy="12" rx="4" ry="1.7" fill="var(--cyan)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="var(--cyan)" strokeWidth="1.4" />
            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="var(--cyan)" strokeWidth="1.4" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="var(--cyan)" strokeWidth="1.4" transform="rotate(120 12 12)" />
          </svg>
        </div>
      </div>

      <main className="app-shell">
        <Navbar setIsHovering={setIsHovering} />
        <Hero setIsHovering={setIsHovering} />
        <About setIsHovering={setIsHovering} />
        <Skills setIsHovering={setIsHovering} />
        <Projects setIsHovering={setIsHovering} />
        <Certifications setIsHovering={setIsHovering} />
        <Hobbies setIsHovering={setIsHovering} />
        <Contact setIsHovering={setIsHovering} />
        <Footer />
      </main>
    </>
  );
}
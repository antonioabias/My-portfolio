import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Hobbies from "./components/Hobbies";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectDetail from "./components/ProjectDetail";
import { projects } from "./components/Projects";
import fluidCursor from "./assets/use-FluidCursor";
import "./index.css";

export default function App() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [, setIsHovering] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollRef = useRef(0);

  const currentIndex = projects.findIndex(p => p.id === selectedProject?.id);

  const handleNext = currentIndex < projects.length - 1
    ? () => { setSelectedProject(projects[currentIndex + 1]); window.scrollTo({ top: 0, behavior: "instant" }); }
    : null;

  const handlePrev = currentIndex > 0
    ? () => { setSelectedProject(projects[currentIndex - 1]); window.scrollTo({ top: 0, behavior: "instant" }); }
    : null;

  const handleSelectProject = (project) => {
    scrollRef.current = window.scrollY;
    setSelectedProject(project);
  };

  const handleBack = () => {
    setSelectedProject(null);
    setTimeout(() => {
      window.scrollTo({ top: scrollRef.current, behavior: "instant" });
    }, 0);
  };

  useEffect(() => {
    fluidCursor();
  }, []);

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProject]);

  return (
    <>
      <canvas id="fluid" className="fluid-cursor" aria-hidden="true" />

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
        {!selectedProject && <Navbar setIsHovering={setIsHovering} />}

        {selectedProject ? (
          <ProjectDetail
            project={selectedProject}
            onBack={handleBack}
            onNext={handleNext}
            onPrev={handlePrev}
            setIsHovering={setIsHovering}
          />
        ) : (
          <>
            <Hero setIsHovering={setIsHovering} />
            <About setIsHovering={setIsHovering} />
            <Skills setIsHovering={setIsHovering} />
            <Projects setIsHovering={setIsHovering} onSelectProject={handleSelectProject} />
            <Certifications setIsHovering={setIsHovering} />
            <Hobbies setIsHovering={setIsHovering} />
            <Contact setIsHovering={setIsHovering} />
          </>
        )}

        {!selectedProject && <Footer />}
      </main>
    </>
  );
}
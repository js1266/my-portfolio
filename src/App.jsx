import { lazy } from "react";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LazySection from "./components/LazySection";
import Navbar from "./components/Navbar";

// Everything below the fold is split into its own chunk and loaded as it nears the viewport.
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Expertise = lazy(() => import("./components/Expertise"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Contact = lazy(() => import("./components/Contact"));

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <LazySection id="about" minHeight="36rem">
          <About />
        </LazySection>
        <LazySection id="projects" minHeight="48rem">
          <Projects />
          <Expertise />
        </LazySection>
        <LazySection id="skills" minHeight="40rem">
          <Skills />
        </LazySection>
        <LazySection id="experience" minHeight="60rem">
          <Experience />
        </LazySection>
        <LazySection id="contact" minHeight="40rem">
          <Contact />
        </LazySection>
      </main>
      <Footer />
    </>
  );
}

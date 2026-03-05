import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import ProblemSection from "./sections/ProblemSection";
import FeaturesGrid from "./sections/Features";
import TechnologySection from "./sections/TechnologySection";
import Dashboard from "./sections/Dashboard";
import Workstation from "./sections/Workstation";
import Notes from "./sections/Notes";
import Analytics from "./sections/Analytics";
import Footer from "./sections/Footer";

export default function App() {
  useEffect(() => {
    const handleReveal = () => {
      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) el.classList.add("active");
      });
    };
    window.addEventListener("scroll", handleReveal);
    handleReveal();
    return () => window.removeEventListener("scroll", handleReveal);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white via-orange-50/20 to-white">
      <Navbar />
      <Hero />
      <ProblemSection />
      <FeaturesGrid />
      <TechnologySection />
      <main>
        <Dashboard />
        <Workstation />
        <Notes />
        <Analytics />
      </main>
      <Footer />
    </div>
  );
}

import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Dashboard from "./sections/Dashboard";
import Workstation from "./sections/Workstation";
import Notes from "./sections/Notes";
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
    <div className="bg-[#FAF6F0]">
      <Navbar />
      <Hero />
      <main>
        <Dashboard />
        <Workstation />
        <Notes />
      </main>
      <Footer />
    </div>
  );
}

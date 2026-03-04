import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import ProblemSection from "./sections/ProblemSection";
import FeaturesGrid from "./sections/Features";
import TechnologySection from "./sections/TechnologySection";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-200 selection:text-indigo-900">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <FeaturesGrid />
        <TechnologySection />
      </main>
      <Footer />
    </div>
  );
}

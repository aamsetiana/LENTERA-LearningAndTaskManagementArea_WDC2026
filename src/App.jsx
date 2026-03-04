import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import ProblemSection from "./sections/ProblemSection";
import FeaturesGrid from "./sections/Features";
import TechnologySection from "./sections/TechnologySection";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/20 to-white font-sans text-slate-900 selection:bg-orange-200 selection:text-orange-900">
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

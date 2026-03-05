import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Dashboard from "./sections/Dashboard";
import Analytics from "./sections/Analytics";
import Workstation from "./sections/Workstation";
import Notes from "./sections/Notes";
import Footer from "./sections/Footer";
import {
  useNotification,
  NotificationContainer,
} from "./components/Notification";

export default function App() {
  const {
    notifications,
    notify,
    remove: removeNotification,
  } = useNotification();

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
      <NotificationContainer
        notifications={notifications}
        onRemove={removeNotification}
      />
      <Navbar />
      <Hero />
      <main>
        <Dashboard />
        <Analytics />
        <Workstation notify={notify} />
        <Notes notify={notify} />
      </main>
      <Footer />
    </div>
  );
}

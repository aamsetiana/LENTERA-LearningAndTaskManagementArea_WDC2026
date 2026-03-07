import { useState, useEffect } from "react";
import { BookOpen, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Beranda");

  const menu = [
    { nama: "Beranda", link: "#" },
    { nama: "Ringkasan", link: "#dashboard" },
    { nama: "Meja Kerja", link: "#workstation" },
    { nama: "Jurnal", link: "#catatan" },
  ];

  // LOGIKA AUTO-DETECT SCROLL (Intersection Observer)
  useEffect(() => {
    const sections = ["dashboard", "workstation", "catatan"];

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Deteksi saat section di tengah layar
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === "dashboard") setActiveSection("Ringkasan");
          if (id === "workstation") setActiveSection("Meja Kerja");
          if (id === "catatan") setActiveSection("Jurnal");
        }
      });
    };

    // Deteksi scroll balik ke atas (Beranda)
    const handleScroll = () => {
      if (window.scrollY < 300) setActiveSection("Beranda");
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-3 py-3 sm:px-4 sm:py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/70 backdrop-blur-2xl border border-white/50 px-4 sm:px-6 py-3 rounded-[1.5rem] sm:rounded-[2rem] shadow-xl">
        {/* Logo */}
        <div
          className="flex items-center gap-2 group cursor-pointer flex-shrink-0"
          onClick={() => window.scrollTo(0, 0)}
        >
          <BookOpen
            size={28}
            strokeWidth={2.5}
            className="text-[#F9A826] group-hover:rotate-6 group-hover:scale-110 transition-all duration-500"
          />
          <span className="text-[20px] sm:text-[30px] font-black text-[#362A1F] tracking-tighter">
            Lentera.
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {menu.map((item) => (
            <a
              key={item.nama}
              href={item.link}
              onClick={() => setActiveSection(item.nama)}
              className={`text-[10px] font-bold uppercase tracking-[0.25em] transition-all relative group ${
                activeSection === item.nama
                  ? "text-[#F9A826]"
                  : "text-[#8C7A6B] hover:text-[#F9A826]"
              }`}
            >
              {item.nama}
              {/* Garis Bawah Aktif */}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#F9A826] transition-all duration-300 ${
                  activeSection === item.nama
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </a>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <a
          href="#workstation"
          className="hidden lg:block px-6 py-3 bg-[#F9A826] text-[#362A1F] rounded-2xl font-bold text-[10px] tracking-widest shadow-md active:scale-95 uppercase hover:bg-[#F9A826]/90 transition-all"
        >
          Fokus Sekarang
        </a>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-[#362A1F] hover:bg-[#F9A826]/20 rounded-lg transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} strokeWidth={2.5} />
            ) : (
              <Menu size={24} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3 px-3 py-3 bg-white/70 backdrop-blur-2xl border border-white/50 rounded-2xl shadow-xl max-w-7xl mx-auto animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-3 py-2">
            {menu.map((item) => (
              <a
                key={item.nama}
                href={item.link}
                onClick={closeMobileMenu}
                className={`px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] rounded-lg transition-all ${
                  activeSection === item.nama
                    ? "bg-[#F9A826]/20 text-[#F9A826]"
                    : "text-[#8C7A6B] hover:bg-[#F9A826]/10"
                }`}
              >
                {item.nama}
              </a>
            ))}
            <a
              href="#workstation"
              onClick={closeMobileMenu}
              className="px-4 py-2.5 bg-[#F9A826] text-[#362A1F] hover:bg-[#F9A826]/90 rounded-lg font-bold text-[11px] uppercase text-center transition-all"
            >
              Fokus Sekarang
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

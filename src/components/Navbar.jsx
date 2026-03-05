import { useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menu = [
    { nama: "Beranda", link: "#" },
    { nama: "Ringkasan", link: "#dashboard" },
    { nama: "Meja Kerja", link: "#workstation" },
    { nama: "Jurnal", link: "#catatan" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/70 backdrop-blur-2xl border border-white/50 px-6 py-3 rounded-[2rem] shadow-xl">
        <div className="flex items-center gap-2 group cursor-pointer">
          <span className="text-2xl group-hover:scale-125 transition-transform duration-500">
            🏮
          </span>
          <span className="text-xl font-black text-[#2D1810] tracking-tighter">
            Lentera.
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {menu.map((item) => (
            <a
              key={item.nama}
              href={item.link}
              className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-[0.25em] hover:text-[#D97757] transition-all relative group"
            >
              {item.nama}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D97757] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <a
          href="#workstation"
          className="px-6 py-2.5 bg-[#D97757] text-white rounded-2xl font-bold text-[10px] tracking-widest shadow-md active:scale-95 uppercase hover:bg-[#2D1810] transition-colors"
        >
          Fokus Sekarang
        </a>

        {/* Mobile Menu Button & CTA */}
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
                className="px-4 py-2.5 text-[11px] font-bold text-[#8C7A6B] uppercase tracking-[0.15em] hover:bg-[#F9A826]/20 hover:text-[#F9A826] rounded-lg transition-all"
              >
                {item.nama}
              </a>
            ))}

            <a
              href="#masuk"
              onClick={closeMobileMenu}
              className="px-4 py-2.5 bg-[#F9A826] text-[#362A1F] hover:bg-[#F9A826]/90   rounded-lg font-bold text-[11px] uppercase text-center transition-all"
            >
              Fokus Sekarang
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// src/sections/Footer.jsx
export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-[#EAE0D5] bg-white mt-20 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🏮</span>
            <span className="text-2xl font-black text-[#362A1F] tracking-tighter uppercase">
              Lentera.
            </span>
          </div>
          <p className="text-xs text-[#8C7A6B] font-bold tracking-[0.3em] uppercase">
            Digital Productivity Space
          </p>
        </div>

        <div className="text-center md:text-right">
          <p className="text-xs font-black text-[#362A1F] uppercase tracking-widest">
            WDC Competition Project
          </p>
          <p className="text-[10px] text-[#8C7A6B] mt-1 font-bold tracking-widest">
            © 2026 UNIVERSITAS KUNINGAN
          </p>
        </div>
      </div>
    </footer>
  );
}

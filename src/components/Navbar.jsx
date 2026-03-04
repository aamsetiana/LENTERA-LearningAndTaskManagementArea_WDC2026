export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-10 h-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-black rounded-xl flex items-center justify-center shadow-2xl">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="text-lg font-black tracking-tight uppercase">
            Lentera
          </span>
        </div>

        <div className="hidden md:flex gap-12 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
          {["Beranda", "Tugas", "Fokus", "Catatan"].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-black transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <button className="bg-black text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
          Mulai Sekarang
        </button>
      </div>
    </nav>
  );
}

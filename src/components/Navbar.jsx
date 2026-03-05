import { BookOpen } from 'lucide-react';

export default function Navbar() {
  const menu = [
    { nama: "Beranda", link: "#" },
    { nama: "Ringkasan", link: "#dashboard" },
    { nama: "Meja Kerja", link: "#workstation" },
    { nama: "Jurnal", link: "#catatan" },
  ];

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
        <div className="hidden md:flex items-center gap-10">
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
        <a
          href="#workstation"
          className="px-6 py-2.5 bg-[#D97757] text-white rounded-2xl font-bold text-[10px] tracking-widest shadow-md active:scale-95 uppercase hover:bg-[#2D1810] transition-colors"
        >
          Fokus Sekarang
        </a>
      </div>
    </nav>
  );
}

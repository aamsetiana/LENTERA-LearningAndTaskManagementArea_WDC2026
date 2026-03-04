import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen pb-32">
      <Navbar />

      <main className="max-w-7xl mx-auto px-10 pt-48">
        {/* HERO SECTION - GAYA APPLE */}
        <header className="mb-32 reveal">
          <h1 className="text-[12vw] md:text-[9vw] font-black leading-[0.8] tracking-tighter mb-12 italic">
            KERJA <br />{" "}
            <span className="text-blue-600 not-italic">PRESISI.</span>
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <p className="max-w-xl text-2xl text-slate-500 font-medium leading-tight">
              Lentera memberdayakan mahasiswa melalui alat produktivitas
              inovatif yang dirancang untuk fokus mutlak[cite: 16, 29].
            </p>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] pb-2">
              WDC 2026 // IFEST 14 [cite: 14, 16]
            </div>
          </div>
        </header>

        {/* BENTO GRID - PROFESIONAL & ELEGAN */}
        <div
          className="grid grid-cols-12 gap-8 reveal"
          style={{ animationDelay: "0.2s" }}
        >
          {/* Main: Papan Tugas */}
          <div className="col-span-12 lg:col-span-8 bento-card flex flex-col justify-between min-h-[500px] group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-4xl font-black tracking-tight mb-2">
                  PAPAN TUGAS
                </h3>
                <p className="text-slate-400 font-bold text-xs tracking-widest uppercase">
                  Manajemen Visual Kanban [cite: 171, 174]
                </p>
              </div>
              <div className="h-14 w-14 bg-slate-50 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                →
              </div>
            </div>
            <div className="mt-20 flex gap-6 opacity-30 group-hover:opacity-100 transition-opacity duration-1000">
              <div className="h-40 w-full bg-slate-50 rounded-3xl border border-dashed border-slate-300"></div>
              <div className="h-40 w-full bg-blue-50 rounded-3xl border border-blue-200 flex items-center justify-center italic text-blue-300">
                Tugas Kuliah...
              </div>
            </div>
          </div>

          {/* Fokus: Ruang Fokus */}
          <div className="col-span-12 lg:col-span-4 bg-[#121212] rounded-[2.5rem] p-12 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
            <div>
              <h3 className="text-3xl font-black mb-1">RUANG FOKUS</h3>
              <p className="text-slate-500 font-bold text-[10px] tracking-widest uppercase">
                Pomodoro Timer [cite: 171, 172]
              </p>
            </div>
            <div className="relative">
              <span className="text-[90px] font-black tracking-tighter text-blue-500 leading-none">
                25:00
              </span>
              <div className="mt-8 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-blue-600 shadow-[0_0_20px_#2563EB]"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

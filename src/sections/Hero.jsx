import { ChevronRight, Check } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-violet-500 blur-[100px] rounded-full mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Copy */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6 backdrop-blur-sm">
              ⚡ Solusi Produktivitas Mahasiswa
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 leading-[1.1]">
              Fokus Belajar, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Tanpa Distraksi.
              </span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              LENTERA adalah ruang kerja digital minimalis yang membantu Anda menyusun prioritas, melacak progres tugas, dan menjaga keseimbangan antara akademik & organisasi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-2xl font-semibold transition-all shadow-xl shadow-indigo-600/20 group">
                Mulai Atur Jadwal <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Hero Visual / Mockup Dashboard */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-3xl blur opacity-20"></div>
            <div className="relative bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-slate-800">Tugas Hari Ini</h3>
                  <p className="text-xs text-slate-500">3 tersisa, Tetap semangat!</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                  R
                </div>
              </div>

              {/* Dummy Data Items */}
              <div className="space-y-3">
                {[
                  { title: "Laporan Proyek IoT Smart Home", time: "14:00 WIB", tag: "Akademik", urgent: true },
                  { title: "Praktikum Sistem Operasi", time: "16:30 WIB", tag: "Akademik", urgent: false },
                  { title: "Rapat Divisi Himpunan", time: "19:00 WIB", tag: "Organisasi", urgent: false },
                ].map((task, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-indigo-200 transition-colors cursor-default">
                    <div className={`w-2 h-10 rounded-full ${task.urgent ? 'bg-rose-500' : 'bg-indigo-400'}`}></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-slate-800">{task.title}</h4>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{task.time}</span>
                        <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{task.tag}</span>
                      </div>
                    </div>
                    <button className="h-6 w-6 rounded-full border border-slate-200 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-500 transition-colors">
                      <Check className="h-3 w-3 opacity-0 hover:opacity-100" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

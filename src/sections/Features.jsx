import { Shield, Clock, BarChart3, Layout } from 'lucide-react';

export default function FeaturesGrid() {
  return (
    <section id="fitur" className="py-24 bg-gradient-to-b from-white to-orange-50 text-slate-900 rounded-[3rem] mx-2 sm:mx-6 lg:mx-8 px-4 sm:px-6 lg:px-8 my-10 overflow-hidden fade-in-up">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 fade-in-up delay-100">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Fitur Dirancang Untuk <br /><span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600">Produktivitas Maksimal.</span></h2>
          <p className="text-slate-500 max-w-xl">Antarmuka sederhana namun menyimpan fitur powerful di dalamnya.</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {/* Feature 1 (Large) */}
          <div className="md:col-span-2 bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 border border-orange-100 hover:shadow-xl transition-all group relative overflow-hidden fade-in-up delay-150">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Layout className="w-40 h-40" />
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-orange-500">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Smart Priority Board</h3>
            <p className="text-slate-600 text-sm max-w-md">Papan tugas kanban yang secara otomatis menyortir tugas berdasarkan tingkat urgensi (Eisenhower Matrix). Anda tahu persis apa yang harus dikerjakan hari ini.</p>
          </div>

          {/* Feature 2 (Small) */}
          <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 border border-orange-100 hover:shadow-xl transition-all fade-in-up delay-200">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-orange-500">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Deep Focus Mode</h3>
            <p className="text-slate-600 text-sm">Timer Pomodoro terintegrasi yang memblokir gangguan UI saat Anda sedang fokus mengerjakan tugas.</p>
          </div>

          {/* Feature 3 (Small) */}
          <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 border border-orange-100 hover:shadow-xl transition-all fade-in-up delay-300">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-orange-500">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Analitik Waktu</h3>
            <p className="text-slate-600 text-sm">Visualisasi grafik untuk melihat seberapa banyak waktu yang Anda habiskan untuk belajar minggu ini.</p>
          </div>

          {/* Feature 4 (Large) */}
          <div className="md:col-span-2 bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl p-8 border border-orange-500/30 flex flex-col justify-end relative overflow-hidden fade-in-up delay-400">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2 text-white">Sinkronisasi Jadwal Seamless</h3>
              <p className="text-orange-50 text-sm max-w-sm">Integrasikan jadwal kuliah reguler dengan kalender LENTERA untuk mencegah bentrok acara.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

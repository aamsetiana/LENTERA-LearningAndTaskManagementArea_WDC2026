// src/sections/Analytics.jsx

export default function Analytics() {
  const hari = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  // Simulasi tinggi bar chart (dalam class Tailwind)
  const tinggiGrafik = ["h-12", "h-24", "h-16", "h-32", "h-20", "h-8", "h-10"];

  return (
    <section id="statistik" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="mb-12 animate-fade-up">
        <h2 className="text-4xl font-bold text-[#4A3F35]">Rekap Minggu Ini</h2>
        <p className="text-[#8C7A6B] mt-2 text-lg">
          Pantau konsistensi belajarmu. Sedikit demi sedikit, lama-lama menjadi
          bukit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up delay-100">
        {/* GRAFIK WAKTU FOKUS (2 Kolom) */}
        <div className="md:col-span-2 cozy-card p-8 flex flex-col justify-between min-h-[320px]">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-bold text-[#4A3F35] text-lg">
              Durasi Fokus (Jam)
            </h3>
            <span className="px-4 py-1.5 bg-[#F3EAD3] text-[#D97757] rounded-lg text-xs font-bold uppercase tracking-wider">
              7 Hari Terakhir
            </span>
          </div>

          {/* Bar Chart Estetik */}
          <div className="flex items-end justify-between flex-1 gap-2 border-b border-[#EAE0D5] pb-2">
            {hari.map((h, i) => (
              <div key={h} className="flex flex-col items-center gap-4 w-full">
                {/* Batang Grafik */}
                <div
                  className={`w-full max-w-[40px] bg-[#EAE0D5] rounded-t-xl relative group transition-all duration-300 hover:bg-[#D97757] ${tinggiGrafik[i]}`}
                >
                  {/* Tooltip Muncul Saat Hover */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#4A3F35] text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {parseInt(tinggiGrafik[i].replace("h-", "")) / 4} Jam
                  </div>
                </div>
                <span className="text-xs font-bold text-[#8C7A6B]">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RINGKASAN PENCAPAIAN (1 Kolom) */}
        <div className="cozy-card p-8 flex flex-col justify-between min-h-[320px] bg-[#FAF6F0]/50 border-dashed border-2">
          <h3 className="font-bold text-[#4A3F35] text-lg mb-6">Pencapaian</h3>

          <div className="space-y-8 flex-1 justify-center flex flex-col">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#F3EAD3] text-[#D97757] flex items-center justify-center text-2xl shadow-sm">
                🔥
              </div>
              <div>
                <p className="text-3xl font-bold text-[#4A3F35]">14 Jam</p>
                <p className="text-xs text-[#8C7A6B] font-bold uppercase tracking-widest mt-1">
                  Total Deep Work
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#EAE0D5] text-[#8C7A6B] flex items-center justify-center text-2xl shadow-sm">
                ✅
              </div>
              <div>
                <p className="text-3xl font-bold text-[#4A3F35]">8 Tugas</p>
                <p className="text-xs text-[#8C7A6B] font-bold uppercase tracking-widest mt-1">
                  Telah Diselesaikan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

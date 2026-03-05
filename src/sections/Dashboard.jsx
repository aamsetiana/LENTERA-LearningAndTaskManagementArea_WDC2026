// src/sections/Dashboard.jsx
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [statistik, setStatistik] = useState({
    totalTugas: 0,
    tugasSelesai: 0,
    totalCatatan: 0,
    totalFokus: 0,
    persentase: 0,
  });

  useEffect(() => {
    // 1. Ambil data asli dari Local Storage yang sudah dibuat di section lain
    const dataTugas = JSON.parse(localStorage.getItem("tugas_lentera")) || [];
    const dataJurnal = JSON.parse(localStorage.getItem("jurnal_lentera")) || [];
    const dataFokus = localStorage.getItem("total_fokus_lentera") || 0;

    // 2. Hitung angka real untuk Dashboard
    const selesai = dataTugas.filter((t) => t.status === "Selesai").length;
    const total = dataTugas.length;
    const persen = total > 0 ? Math.round((selesai / total) * 100) : 0;
    const berjalan = total - selesai;

    // 3. Update state tampilan
    setStatistik({
      totalTugas: total,
      tugasSelesai: selesai,
      tugasBerjalan: berjalan,
      totalCatatan: dataJurnal.length,
      totalFokus: dataFokus,
      persentase: persen,
    });
  }, []);

  // Data dummy untuk grafik visual agar tetap terlihat estetik
  const dataGrafik = [
    { h: "S", p: "40%" },
    { h: "S", p: "70%" },
    { h: "R", p: "50%" },
    { h: "K", p: "90%" },
    { h: "J", p: "30%" },
    { h: "S", p: "60%" },
    { h: "M", p: "45%" },
  ];

  return (
    <section
      id="dashboard"
      className="pt-0 pb-24 md:pt-0 md:pb-48 px-4 sm:px-8 max-w-7xl mx-auto -mt-12 md:-mt-24 relative z-10"
    >
      {/* HEADER: Pusat Kendali */}
      <div className="reveal flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 md:gap-8 bg-white/40 p-6 md:p-8 rounded-[3rem] border border-white/60 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2.5rem] bg-[#2D1810] flex items-center justify-center text-3xl md:text-4xl shadow-2xl border-4 border-white transition-transform duration-500 hover:rotate-6">
            📈
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-[#2D1810] tracking-tighter uppercase">
              Pusat Kendali
            </h2>
            <p className="text-xs md:text-sm font-medium text-[#8C7A6B] mt-1 tracking-widest uppercase opacity-60 italic">
              Statistik Real-time Produktivitas
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        {/* KARTU 1: TUGAS BERJALAN (REAL) */}
        <div className="reveal cozy-card p-8 md:p-10 flex flex-col justify-between min-h-[320px] group border-l-[12px] border-l-[#2D1810]">
          <p className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-[0.4em]">
            Antrean Tugas
          </p>
          <div className="my-4 text-center md:text-left">
            <h4 className="text-8xl md:text-9xl font-black text-[#2D1810] tracking-tighter">
              {statistik.tugasBerjalan < 10
                ? `0${statistik.tugasBerjalan}`
                : statistik.tugasBerjalan}
            </h4>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
                Tugas Aktif
              </span>
            </div>
          </div>
        </div>

        {/* KARTU 2: DURASI FOKUS & PROGRES (REAL DARI POMODORO) */}
        <div
          className="reveal cozy-card p-8 md:p-10 border-b-[12px] border-[#D97757] min-h-[320px] flex flex-col justify-between"
          style={{ transitionDelay: "200ms" }}
        >
          <p className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-[0.4em]">
            Total Fokus
          </p>
          <div className="text-center md:text-left">
            <h4 className="text-7xl md:text-8xl font-black text-[#2D1810] tracking-tighter">
              {statistik.totalFokus}
              <span className="text-2xl font-medium text-[#8C7A6B]">m</span>
            </h4>
            <div className="w-full bg-[#FAF9F6] h-4 rounded-full mt-6 p-1 border border-[#E6D5C3] shadow-inner">
              <div
                style={{ width: `${statistik.persentase}%` }}
                className="bg-gradient-to-r from-[#D97757] to-[#2D1810] h-full rounded-full shadow-lg transition-all duration-1000"
              ></div>
            </div>
            <p className="text-[9px] font-bold text-[#6B5A46] uppercase mt-3 tracking-widest text-center">
              {statistik.persentase}% Target Selesai
            </p>
          </div>
        </div>

        {/* KARTU 3: JURNAL & TREN (REAL DARI NOTES) */}
        <div
          className="reveal cozy-card p-8 md:p-10 bg-[#2D1810] text-white flex flex-col justify-between min-h-[320px] shadow-2xl shadow-[#2D1810]/40"
          style={{ transitionDelay: "400ms" }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">
                Total Jurnal
              </p>
              <h5 className="text-xs font-bold text-[#D97757] mt-1">
                {statistik.totalCatatan} Catatan
              </h5>
            </div>
            <span className="text-[9px] bg-white/10 px-3 py-1.5 rounded-xl border border-white/5 font-bold tracking-widest">
              AKTIVITAS
            </span>
          </div>

          {/* Grafik Visual */}
          <div className="flex items-end justify-between h-32 gap-2 md:gap-3 px-1">
            {dataGrafik.map((item, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-3 h-full justify-end group cursor-pointer"
              >
                <div
                  style={{ height: item.p }}
                  className="w-full bg-[#D97757] rounded-t-xl opacity-80 group-hover:opacity-100 group-hover:scale-x-110 transition-all duration-500 shadow-[0_0_20px_rgba(217,119,87,0.3)]"
                ></div>
                <span className="text-[9px] text-white/30 font-bold group-hover:text-white transition-colors">
                  {item.h}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

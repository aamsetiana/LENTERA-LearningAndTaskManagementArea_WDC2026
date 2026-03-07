// src/sections/Dashboard.jsx
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [statistik, setStatistik] = useState({
    totalTugas: 0,
    tugasSelesai: 0,
    totalCatatan: 0,
    totalFokus: 0,
    persentase: 0,
    grafikDeadline: [],
  });

  useEffect(() => {
    // 1. Ambil data asli dari Local Storage
    const dataTugas = JSON.parse(localStorage.getItem("tugas_lentera")) || [];
    const dataJurnal = JSON.parse(localStorage.getItem("jurnal_lentera")) || [];
    const dataFokus = localStorage.getItem("total_fokus_lentera") || 0;

    // 2. Hitung angka untuk Kartu 1 & 2
    const selesai = dataTugas.filter((t) => t.status === "Selesai").length;
    const total = dataTugas.length;
    const persen = total > 0 ? Math.round((selesai / total) * 100) : 0;
    const berjalan = total - selesai;

    // 3. LOGIKA UNTUK KARTU 3 (Selalu Mulai dari Senin - Minggu)
    const namaHari = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

    // Cari tanggal untuk hari Senin di minggu ini
    const hariIni = new Date();
    const hariKe = hariIni.getDay(); // 0 = Minggu, 1 = Senin, dst.
    // Jika hari ini Minggu (0), mundur 6 hari. Jika bukan, mundur (hariKe - 1) hari.
    const selisihKeSenin = hariIni.getDate() - hariKe + (hariKe === 0 ? -6 : 1);
    const seninMingguIni = new Date(hariIni.setDate(selisihKeSenin));

    const grafikReal = [];
    let maxTugas = 0;

    for (let i = 0; i < 7; i++) {
      const targetDate = new Date(seninMingguIni);
      targetDate.setDate(seninMingguIni.getDate() + i);

      // Bikin format YYYY-MM-DD aman (mengatasi masalah zona waktu)
      const year = targetDate.getFullYear();
      const month = String(targetDate.getMonth() + 1).padStart(2, "0");
      const day = String(targetDate.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;

      const hariSingkat = namaHari[targetDate.getDay()];

      const jumlahTugas = dataTugas.filter(
        (t) => t.deadline === dateString && t.status !== "Selesai",
      ).length;
      if (jumlahTugas > maxTugas) maxTugas = jumlahTugas;

      grafikReal.push({ hari: hariSingkat, jumlah: jumlahTugas });
    }

    const finalGrafik = grafikReal.map((item) => ({
      h: item.hari,
      angka: item.jumlah,
      // Tinggi minimum 10% biar baloknya kelihatan walau kosong
      p:
        maxTugas > 0
          ? `${Math.max((item.jumlah / maxTugas) * 100, 10)}%`
          : "10%",
    }));

    // 4. Update semua state
    setStatistik({
      totalTugas: total,
      tugasSelesai: selesai,
      tugasBerjalan: berjalan,
      totalCatatan: dataJurnal.length,
      totalFokus: dataFokus,
      persentase: persen,
      grafikDeadline: finalGrafik,
    });
  }, []);

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
        {/* KARTU 1: TUGAS BERJALAN */}
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

        {/* KARTU 2: DURASI FOKUS & PROGRES */}
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

        {/* KARTU 3: GRAFIK DEADLINE TUGAS MINGGU INI */}
        <div
          className="reveal cozy-card p-8 md:p-10 flex flex-col justify-between min-h-[320px] border-r-[12px] border-[#D97757]"
          style={{ transitionDelay: "400ms" }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-[0.4em]">
                Beban Mingguan
              </p>
              {/* Judulnya saya ganti biar lebih masuk akal */}
              <h5 className="text-[11px] font-bold text-[#D97757] mt-1 uppercase tracking-widest">
                Deadline Minggu Ini
              </h5>
            </div>
          </div>

          {/* Grafik Visual Real */}
          <div className="flex items-end justify-between h-32 gap-2 md:gap-3 px-1 mt-auto">
            {statistik.grafikDeadline &&
              statistik.grafikDeadline.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                >
                  <span className="text-[10px] font-black text-[#2D1810] opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all">
                    {item.angka > 0 ? item.angka : "-"}
                  </span>

                  <div
                    style={{ height: item.p }}
                    className={`w-full rounded-t-lg transition-all duration-500 group-hover:scale-x-110 ${
                      item.angka > 0
                        ? "bg-[#D97757] shadow-[0_0_15px_rgba(217,119,87,0.3)]"
                        : "bg-[#EAE0D5]"
                    }`}
                  ></div>

                  <span className="text-[9px] text-[#8C7A6B] font-bold mt-1">
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

// src/sections/Workstation.jsx
import { useState, useEffect } from "react";

export default function Workstation() {
  // --- STATE 1: TIMER POMODORO (Bisa Setting) ---
  const [inputMenit, setInputMenit] = useState(25); // Input untuk setting
  const [detik, setDetik] = useState(25 * 60);
  const [jalan, setJalan] = useState(false);
  const [mode, setMode] = useState("Fokus");

  // --- STATE 2: PAPAN TUGAS (LOCAL STORAGE) ---
  const [tugas, setTugas] = useState(() => {
    const saved = localStorage.getItem("tugas_lentera");
    return saved
      ? JSON.parse(saved)
      : [
        { id: 1, teks: "Simulasi Sistem WDC", status: "Rencana" },
        { id: 2, teks: "Finalisasi Presentasi", status: "Dikerjakan" },
      ];
  });

  useEffect(() => {
    localStorage.setItem("tugas_lentera", JSON.stringify(tugas));
  }, [tugas]);

  // --- LOGIKA TIMER (START, PAUSE, FINISH) ---
  useEffect(() => {
    let interval = null;
    if (jalan && detik > 0) {
      interval = setInterval(() => setDetik((d) => d - 1), 1000);
    } else if (detik === 0) {
      clearInterval(interval);
      setJalan(false);

      if (mode === "Fokus") {
        // Simpan statistik menit fokus ke Local Storage
        const menitSelesai = inputMenit;
        const totalFokus =
          Number(localStorage.getItem("total_fokus_lentera") || 0) +
          Number(menitSelesai);
        localStorage.setItem("total_fokus_lentera", totalFokus);

        alert(`Sesi Fokus ${menitSelesai} Menit Selesai!`);
        setMode("Istirahat");
        setDetik(5 * 60); // Default istirahat 5 menit
      } else {
        alert("Waktu istirahat habis! Siap fokus lagi?");
        setMode("Fokus");
        setDetik(inputMenit * 60);
      }
    }
    return () => clearInterval(interval);
  }, [jalan, detik, mode, inputMenit]);

  // Fungsi untuk Update Setting Waktu
  const updateWaktu = (e) => {
    const m = e.target.value;
    setInputMenit(m);
    if (!jalan) setDetik(m * 60); // Update tampilan timer jika tidak sedang jalan
  };

  const format = (s) => {
    const m = Math.floor(s / 60);
    const d = s % 60;
    return `${m}:${d < 10 ? "0" : ""}${d}`;
  };

  // --- LOGIKA KANBAN ---
  const tambahTugas = () => {
    const teks = prompt("Masukkan tugas baru:");
    if (teks) setTugas([...tugas, { id: Date.now(), teks, status: "Rencana" }]);
  };

  const pindahStatus = (id, statusBaru) => {
    setTugas(
      tugas.map((t) => (t.id === id ? { ...t, status: statusBaru } : t)),
    );
  };

  const hapusTugas = (id) => {
    if (confirm("Hapus tugas ini?")) setTugas(tugas.filter((t) => t.id !== id));
  };

  return (
    <section
      id="workstation"
      className="py-20 md:py-32 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* KOLOM KIRI: POMODORO PRO (DENGAN SETTING) */}
        <div className="lg:col-span-4 reveal">
          <div className="cozy-card p-10 flex flex-col items-center border-t-[12px] border-[#F9A826]">
            {/* Setting Waktu Input */}
            <div className="w-full flex flex-col items-center mb-8">
              <label className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-[0.3em] mb-4">
                Atur Menit Fokus
              </label>
              <input
                type="number"
                value={inputMenit}
                onChange={updateWaktu}
                disabled={jalan}
                className="w-20 text-center bg-[#FAF6F0] border-2 border-[#EAE0D5] rounded-xl font-black text-[#362A1F] p-2 outline-none focus:border-[#F9A826] disabled:opacity-50"
              />
            </div>

            <div className="flex gap-3 mb-10">
              <button
                onClick={() => {
                  setMode("Fokus");
                  setDetik(inputMenit * 60);
                  setJalan(false);
                }}
                className={`text-[9px] font-black px-5 py-2 rounded-full tracking-widest transition-all ${mode === "Fokus" ? "bg-[#362A1F] text-white" : "bg-[#FAF6F0] text-[#8C7A6B]"}`}
              >
                FOKUS
              </button>
              <button
                onClick={() => {
                  setMode("Istirahat");
                  setDetik(5 * 60);
                  setJalan(false);
                }}
                className={`text-[9px] font-black px-5 py-2 rounded-full tracking-widest transition-all ${mode === "Istirahat" ? "bg-[#362A1F] text-white" : "bg-[#FAF6F0] text-[#8C7A6B]"}`}
              >
                ISTIRAHAT
              </button>
            </div>

            {/* Display Timer Besar */}
            <div className="relative w-64 h-64 rounded-full border-[12px] border-[#FAF6F0] flex flex-col items-center justify-center bg-white shadow-inner overflow-hidden">
              <div
                className={`absolute inset-0 border-[12px] border-[#F9A826] border-t-transparent rounded-full ${jalan ? "animate-spin" : ""}`}
                style={{ animationDuration: "4s" }}
              ></div>
              <span className="text-7xl font-black text-[#362A1F] tracking-tighter relative z-10">
                {format(detik)}
              </span>
              <span className="text-[10px] font-black text-[#8C7A6B] mt-2 opacity-50 uppercase tracking-widest">
                {mode}
              </span>
            </div>

            {/* Kontrol: Start, Pause, Reset */}
            <div className="grid grid-cols-2 gap-4 w-full mt-12">
              <button
                onClick={() => setJalan(!jalan)}
                className={`py-5 rounded-[2.5rem] font-black text-[11px] tracking-widest transition-all shadow-lg active:scale-95 uppercase ${jalan ? "bg-[#362A1F] text-white" : "bg-[#F9A826] text-[#362A1F]"}`}
              >
                {jalan ? "PAUSE" : "START"}
              </button>
              <button
                onClick={() => {
                  setDetik(mode === "Fokus" ? inputMenit * 60 : 5 * 60);
                  setJalan(false);
                }}
                className="py-5 bg-[#FAF6F0] text-[#8C7A6B] border border-[#EAE0D5] rounded-[2.5rem] font-black text-[11px] tracking-widest hover:bg-white transition-all uppercase"
              >
                RESET
              </button>
            </div>

            {/* Ambient Sounds (Visual Only) */}
            <div className="mt-10 flex gap-4">
              {["🌧️", "☕", "🔥", "🍃"].map((icon) => (
                <button
                  key={icon}
                  className="w-11 h-11 rounded-2xl bg-[#FAF6F0] hover:bg-[#F9A826] flex items-center justify-center transition-all border border-[#EAE0D5] text-lg hover:shadow-md"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: PAPAN TUGAS (KANBAN) */}
        <div
          className="lg:col-span-8 reveal"
          style={{ transitionDelay: "200ms" }}
        >
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-4xl sm:text-5xl font-black text-[#362A1F] tracking-tighter uppercase">
              Meja Kerja
            </h3>
            <button
              onClick={tambahTugas}
              className="px-10 py-4 bg-[#362A1F] text-white rounded-full font-black text-[10px] tracking-widest hover:bg-[#F9A826] hover:text-[#362A1F] transition-all shadow-lg uppercase"
            >
              + Tambah Tugas
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {["Rencana", "Dikerjakan", "Selesai"].map((status) => (
              <div
                key={status}
                className="bg-[#F3EAD3]/30 p-6 rounded-[3rem] border border-[#EAE0D5] min-h-[480px] shadow-sm"
              >
                <p className="text-[10px] font-black text-[#8C7A6B] uppercase text-center mb-8 tracking-[0.4em] opacity-40">
                  {status}
                </p>
                {tugas
                  .filter((t) => t.status === status)
                  .map((t) => (
                    <div
                      key={t.id}
                      className="bg-white p-7 rounded-[2.5rem] shadow-sm mb-5 border border-[#EAE0D5] hover:border-[#F9A826] transition-all group relative overflow-hidden"
                    >
                      <p className="text-sm font-bold text-[#362A1F] mb-5 leading-tight">
                        {t.teks}
                      </p>
                      <div className="flex justify-between items-center pt-4 border-t border-[#FAF6F0]">
                        {status !== "Selesai" ? (
                          <button
                            onClick={() =>
                              pindahStatus(
                                t.id,
                                status === "Rencana" ? "Dikerjakan" : "Selesai",
                              )
                            }
                            className="text-[9px] font-black text-[#F9A826] uppercase hover:tracking-widest transition-all"
                          >
                            Lanjut →
                          </button>
                        ) : (
                          <span className="text-[9px] font-black text-green-500 uppercase">
                            Selesai ✓
                          </span>
                        )}
                        <button
                          onClick={() => hapusTugas(t.id)}
                          className="text-[9px] font-black text-red-300 hover:text-red-500 transition-colors uppercase italic"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

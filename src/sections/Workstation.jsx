// src/sections/Workstation.jsx
import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { daysUntilDeadline, getDeadlineStatus } from "../utils/mockData";
import { ModalInput, useModalInput } from "../components/ModalInput";
import FocusCompleteModal from "../components/FocusCompleteModal";

export default function Workstation({ notify }) {
  // --- STATE & LOGIKA ---
  const [inputMenit, setInputMenit] = useState(25);
  const [detik, setDetik] = useState(25 * 60);
  const [jalan, setJalan] = useState(false);
  const [mode, setMode] = useState("Fokus");

  // Notifikasi modal selesai fokus
  const [showFocusModal, setShowFocusModal] = useState(false);

  const [tugas, setTugas] = useState(() => {
    const saved = localStorage.getItem("tugas_lentera");
    return saved ? JSON.parse(saved) : [];
  });

  const [playing, setPlaying] = useState(null);
  const [audioInstance, setAudioInstance] = useState(null);

  // Modal State
  const modalAddTask = useModalInput();

  // Suara Terapi Belajar - Pilihan yang lebih baik untuk fokus
  const therapySounds = [
    {
      id: "lofi",
      icon: "🎵",
      label: "Lo-fi Music",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: "nature",
      icon: "🌿",
      label: "Natural Ambience",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
      id: "focus",
      icon: "🧠",
      label: "Focus Vibes",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
  ];

  useEffect(() => {
    localStorage.setItem("tugas_lentera", JSON.stringify(tugas));
  }, [tugas]);

  useEffect(() => {
    let interval = null;
    if (jalan && detik > 0) {
      interval = setInterval(() => setDetik((d) => d - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [jalan, detik]);

  // Separate effect for handling timer completion to avoid cascading renders
  useEffect(() => {
    if (detik === 0 && jalan) {
      setJalan(false);
      if (mode === "Fokus") {
        const totalFokus =
          Number(localStorage.getItem("total_fokus_lentera") || 0) +
          Number(inputMenit);
        localStorage.setItem("total_fokus_lentera", totalFokus);
        notify(
          `Sesi Fokus ${inputMenit} menit selesai! Istirahat sekarang.`,
          "success",
        );
        setShowFocusModal(true);
        setMode("Istirahat");
        setDetik(5 * 60);
      } else {
        notify(
          "Waktu istirahat selesai. Siap untuk sesi fokus berikutnya?",
          "info",
        );
        setMode("Fokus");
        setDetik(inputMenit * 60);
      }
    }
  }, [detik, jalan, mode, inputMenit, notify]);

  const radius = 110;
  const keliling = 2 * Math.PI * radius;
  const offset = keliling - (detik / (inputMenit * 60)) * keliling;

  const updateWaktu = (m) => {
    if (jalan) return;
    const baru = Math.max(1, m);
    setInputMenit(baru);
    setDetik(baru * 60);
  };

  const m = Math.floor(detik / 60);
  const d = detik % 60;
  const displayDetik = d < 10 ? `0${d}` : d;

  const toggleAudio = (sound) => {
    if (playing === sound.id) {
      audioInstance.pause();
      setPlaying(null);
      setAudioInstance(null);
      notify(`${sound.label} dimatikan`, "info");
    } else {
      if (audioInstance) audioInstance.pause();
      const newAudio = new Audio(sound.url);
      newAudio.loop = true;
      newAudio.play();
      setAudioInstance(newAudio);
      setPlaying(sound.id);
      notify(`${sound.label} sedang diputar`, "success");
    }
  };

  const handleAddTaskSubmit = (formData) => {
    setTugas([
      ...tugas,
      {
        id: Date.now(),
        teks: formData.teks.trim(),
        status: "Rencana",
        deadline: formData.deadline,
        prioritas: formData.prioritas,
      },
    ]);
    notify("Tugas baru ditambahkan ✓", "success");
  };

  const addTugas = () => {
    modalAddTask.open();
  };

  const moveTugas = (id, newStatus) => {
    setTugas(tugas.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
    const statusLabel =
      newStatus === "Selesai" ? "diselesaikan" : "dipindahkan";
    notify(`Tugas ${statusLabel}`, "success");
  };

  const deleteTugas = (id) => {
    setTugas(tugas.filter((t) => t.id !== id));
    notify("Tugas dihapus", "warning");
  };

  return (
    <section
      id="workstation"
      className="py-20 md:py-32 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      {/* Modal Notifikasi Selesai Fokus */}
      <FocusCompleteModal
        isOpen={showFocusModal}
        onClose={() => setShowFocusModal(false)}
        minutes={inputMenit}
      />
      {/* Modal Add Task */}
      <ModalInput
        isOpen={modalAddTask.isOpen}
        notify={notify}
        title="Tambah Tugas Baru"
        fields={[
          {
            name: "teks",
            label: "Deskripsi Tugas",
            type: "textarea",
            placeholder: "Apa yang ingin kamu kerjakan?",
            required: true,
            autoFocus: true,
          },
          {
            name: "deadline",
            label: "Deadline",
            type: "date",
            required: true,
          },
          {
            name: "prioritas",
            label: "Prioritas",
            type: "select",
            options: ["Rendah", "Sedang", "Tinggi"],
            required: true,
          },
        ]}
        onSubmit={handleAddTaskSubmit}
        onClose={modalAddTask.close}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* KOLOM KIRI: POMODORO PRO */}
        <div className="lg:col-span-4 reveal">
          <div className="cozy-card p-10 flex flex-col items-center border-t-[12px] border-[#F9A826]">
            <div className="w-full flex flex-col items-center mb-6">
              <label className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-[0.4em] mb-4">
                Atur Waktu
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateWaktu(inputMenit - 5)}
                  disabled={jalan}
                  className="w-8 h-8 rounded-full bg-[#FAF6F0] font-black disabled:opacity-30 hover:bg-[#EAE0D5] transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={inputMenit}
                  onChange={(e) => updateWaktu(Number(e.target.value))}
                  disabled={jalan}
                  className="w-16 text-center bg-transparent font-black text-xl outline-none"
                />
                <button
                  onClick={() => updateWaktu(inputMenit + 5)}
                  disabled={jalan}
                  className="w-8 h-8 rounded-full bg-[#FAF6F0] font-black disabled:opacity-30 hover:bg-[#EAE0D5] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-2 mb-8">
              {[15, 25, 45].map((preset) => (
                <button
                  key={preset}
                  onClick={() => updateWaktu(preset)}
                  disabled={jalan}
                  className={`text-[9px] font-bold px-3 py-2 rounded-xl border transition-all ${inputMenit === preset ? "bg-[#362A1F] text-white" : "bg-white"}`}
                >
                  {preset}m
                </button>
              ))}
            </div>

            <div className="relative w-64 h-64 flex items-center justify-center mb-10">
              <svg className="absolute w-full h-full -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r={radius}
                  fill="transparent"
                  stroke="#FAF6F0"
                  strokeWidth="12"
                />
                <circle
                  cx="128"
                  cy="128"
                  r={radius}
                  fill="transparent"
                  stroke="#F9A826"
                  strokeWidth="12"
                  strokeDasharray={keliling}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className={`transition-all duration-1000 ease-linear ${!jalan ? "opacity-50" : "opacity-100"}`}
                />
              </svg>
              <div className="flex flex-col items-center z-10">
                <div className="flex items-baseline overflow-hidden">
                  <span
                    key={`m-${m}`}
                    className="text-6xl font-black text-[#362A1F] tracking-tighter animate-[fadeScale_0.4s_ease-out]"
                  >
                    {m}
                  </span>
                  <span className="text-4xl font-black text-[#F9A826] mx-1">
                    :
                  </span>
                  <span
                    key={`s-${detik}`}
                    className="text-6xl font-black text-[#362A1F] tracking-tighter animate-[fadeScale_0.4s_ease-out]"
                  >
                    {displayDetik}
                  </span>
                </div>
                <span
                  className={`text-[9px] font-black uppercase tracking-widest mt-2 ${jalan ? "text-[#F9A826]" : "text-[#8C7A6B]"}`}
                >
                  {jalan ? `Mode ${mode}` : "Timer Jeda"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <button
                onClick={() => setJalan(!jalan)}
                className={`py-4 rounded-4xl font-black text-[10px] tracking-widest uppercase shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${jalan
                    ? "bg-[#362A1F] text-white border-2 border-[#362A1F]"
                    : "bg-[#F9A826] text-[#362A1F] border-2 border-[#F9A826]"
                  }`}
              >
                {jalan ? (
                  <>
                    <span className="text-sm">⏸</span> PAUSE
                  </>
                ) : (
                  <>
                    <span className="text-sm">▶</span> RESUME
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setDetik(inputMenit * 60);
                  setJalan(false);
                }}
                className="py-4 bg-white text-[#8C7A6B] border-2 border-[#EAE0D5] rounded-4xl font-black text-[10px] tracking-widest uppercase active:scale-95 hover:border-[#F9A826] transition-all"
              >
                RESET
              </button>
            </div>

            {/* Pilihan Terapi Suara */}
            <div className="mt-8 w-full">
              <p className="text-xs font-bold text-[#8C7A6B] uppercase tracking-widest mb-3">
                🎧 Terapi Belajar
              </p>
              <div className="grid grid-cols-3 gap-2">
                {therapySounds.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => toggleAudio(s)}
                    title={s.label}
                    className={`w-full py-3 rounded-xl flex flex-col items-center justify-center transition-all border-2 font-black text-[10px] ${playing === s.id
                        ? "bg-[#362A1F] text-white border-[#362A1F]"
                        : "bg-white border-[#EAE0D5] text-[#8C7A6B] hover:border-[#F9A826]"
                      }`}
                  >
                    <span className="text-lg">{s.icon}</span>
                    <span className="text-[8px] mt-1">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: PAPAN TUGAS (KANBAN) */}
        <div
          className="lg:col-span-8 reveal"
          style={{ transitionDelay: "200ms" }}
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl md:text-4xl font-black text-[#362A1F] tracking-tighter uppercase">
              Meja Kerja
            </h3>
            <button
              onClick={addTugas}
              className="px-6 py-3 bg-[#362A1F] text-white rounded-full font-black text-[10px] tracking-widest uppercase shadow-lg hover:bg-[#F9A826] hover:text-[#362A1F] transition-all"
            >
              + TUGAS BARU
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {["Rencana", "Dikerjakan", "Selesai"].map((st) => {
              const tugasDiKolom = tugas.filter((t) => t.status === st);

              return (
                <div
                  key={st}
                  className="bg-[#FAF6F0]/80 p-5 rounded-3xl border border-[#EAE0D5] flex flex-col min-h-[500px] max-h-[600px]"
                >
                  {/* Header Kolom */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#EAE0D5]/60">
                    <span className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-[0.3em]">
                      {st}
                    </span>
                    <span className="text-[9px] font-black bg-white text-[#8C7A6B] px-3 py-1.5 rounded-full border border-[#EAE0D5] shadow-sm">
                      {tugasDiKolom.length}
                    </span>
                  </div>

                  {/* List Kartu Tugas */}
                  <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
                    {tugasDiKolom.map((t) => {
                      const deadlineStatus = getDeadlineStatus(t.deadline);
                      const isUrgent =
                        deadlineStatus.status === "urgent" ||
                        deadlineStatus.status === "today" ||
                        deadlineStatus.status === "overdue";

                      return (
                        <div
                          key={t.id}
                          className={`bg-white p-4 rounded-3xl shadow-sm border-2 transition-all group flex flex-col ${isUrgent
                              ? "border-red-300 bg-red-50/30 hover:border-red-500"
                              : "border-[#EAE0D5] hover:border-[#F9A826]"
                            }`}
                        >
                          {/* Deadline Warning */}
                          {isUrgent && (
                            <div className="flex items-center gap-2 mb-2 text-red-600 text-xs font-bold">
                              <AlertCircle className="h-4 w-4" />
                              <span>{deadlineStatus.label}</span>
                            </div>
                          )}

                          {/* Teks Tugas */}
                          <p className="text-sm font-bold text-[#362A1F] mb-3 leading-relaxed flex-1">
                            {t.teks}
                          </p>

                          {/* Deadline Info */}
                          <div className="flex items-center gap-2 mb-3 text-[11px] text-[#8C7A6B]">
                            <Clock className="h-3 w-3" />
                            <span>{t.deadline}</span>
                          </div>

                          {/* Tombol Aksi */}
                          <div className="flex justify-between items-center pt-3 border-t border-[#FAF6F0]">
                            {st !== "Selesai" ? (
                              <button
                                onClick={() =>
                                  moveTugas(
                                    t.id,
                                    st === "Rencana" ? "Dikerjakan" : "Selesai",
                                  )
                                }
                                className="px-3 py-1.5 bg-[#F9A826]/10 text-[#F9A826] rounded-full text-[8px] font-black uppercase tracking-widest hover:bg-[#F9A826] hover:text-white transition-colors"
                              >
                                Lanjut →
                              </button>
                            ) : (
                              <span className="px-3 py-1.5 bg-green-50 text-green-600 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> Tuntas
                              </span>
                            )}

                            <button
                              onClick={() => deleteTugas(t.id)}
                              className="px-3 py-1.5 bg-red-50 text-red-400 rounded-full text-[8px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

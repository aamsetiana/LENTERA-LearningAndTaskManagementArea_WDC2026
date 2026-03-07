// src/sections/Workstation.jsx
import { useState, useEffect } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Repeat,
  Hand,
  LayoutDashboard,
} from "lucide-react";
import confetti from "canvas-confetti";
import { daysUntilDeadline, getDeadlineStatus } from "../utils/mockData";
import { ModalInput, useModalInput } from "../components/ModalInput";

export default function Workstation({ notify }) {
  const [inputMenit, setInputMenit] = useState(25);
  const [detik, setDetik] = useState(25 * 60);
  const [jalan, setJalan] = useState(false);
  const [mode, setMode] = useState("Fokus");

  const [fokusDurasi, setFokusDurasi] = useState(25);
  const [istirahatDurasi, setIstirahatDurasi] = useState(5);

  const [isAuto, setIsAuto] = useState(true);

  const [tugas, setTugas] = useState(() => {
    const saved = localStorage.getItem("tugas_lentera");
    return saved ? JSON.parse(saved) : [];
  });

  const [playing, setPlaying] = useState(null);
  const [audioInstance, setAudioInstance] = useState(null);

  const modalAddTask = useModalInput();

  const therapySounds = [
    { id: "lofi", icon: "🎵", label: "Lo-fi", url: "/audio/lofi.mp3" },
    { id: "nature", icon: "🌿", label: "Nature", url: "/audio/nature.mp3" },
    { id: "focus", icon: "🧠", label: "Focus", url: "/audio/focus.mp3" },
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

  // LOGIKA PENCATAT SESI POMODORO
  useEffect(() => {
    if (detik === 0 && jalan) {
      const alarmSound = new Audio(
        "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
      );
      alarmSound.play().catch((e) => console.log("Audio diblokir browser", e));

      if (mode === "Fokus") {
        const totalFokus =
          Number(localStorage.getItem("total_fokus_lentera") || 0) +
          Number(inputMenit);
        localStorage.setItem("total_fokus_lentera", totalFokus);

        // PENCATAT JUMLAH SESI ASLI
        const totalSesi =
          Number(localStorage.getItem("sesi_pomodoro_lentera") || 0) + 1;
        localStorage.setItem("sesi_pomodoro_lentera", totalSesi);

        notify(`Sesi Fokus selesai! Waktunya istirahat.`, "success");

        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.4 },
          colors: ["#F9A826", "#362A1F", "#4ade80", "#FAF6F0"],
          zIndex: 9999,
        });

        if (isAuto) {
          setMode("Istirahat");
          setDetik(istirahatDurasi * 60);
          setInputMenit(istirahatDurasi);
          setJalan(true);
        } else {
          setJalan(false);
        }
      } else {
        notify("Waktu istirahat selesai. Ayo mulai fokus!", "info");

        if (isAuto) {
          setMode("Fokus");
          setDetik(fokusDurasi * 60);
          setInputMenit(fokusDurasi);
          setJalan(true);
        } else {
          setJalan(false);
        }
      }
    }
  }, [
    detik,
    jalan,
    mode,
    inputMenit,
    notify,
    isAuto,
    fokusDurasi,
    istirahatDurasi,
  ]);

  const radius = 90;
  const keliling = 2 * Math.PI * radius;
  const offset = keliling - (detik / (inputMenit * 60)) * keliling;

  const updateWaktu = (m) => {
    if (jalan) return;
    const baru = Math.max(1, m);
    setInputMenit(baru);
    setDetik(baru * 60);

    if (mode === "Fokus") setFokusDurasi(baru);
    else setIstirahatDurasi(baru);
  };

  // FUNGSI GANTI MODE SECARA MANUAL
  const gantiMode = (modeBaru) => {
    if (jalan) {
      notify("Hentikan timer dulu untuk ganti mode!", "warning");
      return;
    }
    setMode(modeBaru);
    if (modeBaru === "Fokus") {
      setDetik(25 * 60);
      setInputMenit(25);
    } else {
      setDetik(5 * 60);
      setInputMenit(5);
    }
  };

  const m = Math.floor(detik / 60);
  const d = detik % 60;
  const displayDetik = d < 10 ? `0${d}` : d;

  const toggleAudio = (sound) => {
    if (playing === sound.id) {
      stopAudio();
    } else {
      if (audioInstance) audioInstance.pause();
      const newAudio = new Audio(sound.url);
      newAudio.loop = true;
      newAudio.play();
      setAudioInstance(newAudio);
      setPlaying(sound.id);
      notify(`${sound.label} diputar`, "success");
    }
  };

  const stopAudio = () => {
    if (audioInstance) {
      audioInstance.pause();
      setPlaying(null);
      setAudioInstance(null);
      notify("Musik dihentikan", "info");
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

  const moveTugas = (id, newStatus) => {
    setTugas(tugas.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));

    if (newStatus === "Selesai") {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#F9A826", "#362A1F", "#4ade80", "#FAF6F0"],
        zIndex: 9999,
      });
      notify(`Mantap! Satu tugas berhasil diselesaikan! 🎉`, "success");
    } else {
      notify(`Tugas dipindahkan ke ${newStatus}`, "info");
    }
  };

  const deleteTugas = (id) => {
    setTugas(tugas.filter((t) => t.id !== id));
    notify("Tugas dihapus", "warning");
  };

  return (
    <section
      id="workstation"
      className="py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto"
    >
      <ModalInput
        isOpen={modalAddTask.isOpen}
        notify={notify}
        title="Tambah Tugas Baru"
        fields={[
          {
            name: "teks",
            label: "Deskripsi Tugas",
            type: "textarea",
            placeholder: "Apa yang dikerjakan?",
            required: true,
            autoFocus: true,
          },
          { name: "deadline", label: "Deadline", type: "date", required: true },
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

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-5 reveal">
        <div className="flex items-center gap-4">
          <div className="p-3 md:p-4 bg-[#362A1F] rounded-[1.5rem] md:rounded-[2rem] shadow-xl flex-shrink-0">
            <LayoutDashboard className="h-6 w-6 md:h-8 md:w-8 text-[#F9A826]" />
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-[#362A1F] tracking-tighter uppercase">
              Meja Kerja
            </h2>
            <p className="text-[10px] md:text-sm font-bold text-[#8C7A6B] uppercase tracking-widest mt-1">
              Kelola Tugas dan Waktu Fokusmu
            </p>
          </div>
        </div>

        <button
          onClick={modalAddTask.open}
          className="px-6 py-3.5 bg-[#362A1F] text-white rounded-full font-black text-[10px] tracking-widest uppercase shadow-xl hover:bg-[#F9A826] hover:text-[#362A1F] hover:-translate-y-1 transition-all active:scale-95 whitespace-nowrap mt-2 md:mt-0"
        >
          + TUGAS BARU
        </button>
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start reveal"
        style={{ transitionDelay: "150ms" }}
      >
        <div className="lg:col-span-4">
          <div className="cozy-card p-6 lg:p-7 flex flex-col items-center border-t-[10px] border-[#F9A826] bg-white relative">
            <div className="absolute top-4 right-5 flex items-center gap-2">
              <span className="text-[8px] font-black text-[#8C7A6B] uppercase tracking-widest">
                Auto
              </span>
              <button
                onClick={() => setIsAuto(!isAuto)}
                className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${isAuto ? "bg-[#F9A826]" : "bg-[#EAE0D5]"}`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform duration-300 ${isAuto ? "translate-x-4.5" : "translate-x-0.5"}`}
                ></div>
              </button>
            </div>

            <div className="w-full max-w-[200px] flex bg-[#FAF6F0] rounded-full p-1 mb-6 mt-2">
              <button
                onClick={() => gantiMode("Fokus")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${mode === "Fokus" ? "bg-[#362A1F] text-white shadow-md" : "text-[#8C7A6B] hover:text-[#362A1F]"}`}
              >
                Fokus
              </button>
              <button
                onClick={() => gantiMode("Istirahat")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${mode === "Istirahat" ? "bg-[#F9A826] text-[#362A1F] shadow-md" : "text-[#8C7A6B] hover:text-[#362A1F]"}`}
              >
                Jeda
              </button>
            </div>

            <div className="w-full flex flex-col items-center mb-5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateWaktu(inputMenit - 5)}
                  disabled={jalan}
                  className="w-7 h-7 rounded-full bg-[#FAF6F0] font-black disabled:opacity-30 hover:bg-[#EAE0D5] transition-colors text-xs"
                >
                  -
                </button>
                <input
                  type="number"
                  value={inputMenit}
                  onChange={(e) => updateWaktu(Number(e.target.value))}
                  disabled={jalan}
                  className="w-12 text-center bg-transparent font-black text-lg outline-none"
                />
                <button
                  onClick={() => updateWaktu(inputMenit + 5)}
                  disabled={jalan}
                  className="w-7 h-7 rounded-full bg-[#FAF6F0] font-black disabled:opacity-30 hover:bg-[#EAE0D5] transition-colors text-xs"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              {[15, 25, 45].map((preset) => (
                <button
                  key={preset}
                  onClick={() => updateWaktu(preset)}
                  disabled={jalan}
                  className={`text-[8px] font-bold px-3 py-1.5 rounded-lg border transition-all ${inputMenit === preset ? "bg-[#362A1F] text-white" : "bg-white"}`}
                >
                  {preset}m
                </button>
              ))}
            </div>

            <div className="relative w-48 h-48 lg:w-56 lg:h-56 flex items-center justify-center mb-8">
              <svg className="absolute w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  fill="transparent"
                  stroke="#FAF6F0"
                  strokeWidth="8"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  fill="transparent"
                  stroke={mode === "Fokus" ? "#F9A826" : "#4ade80"}
                  strokeWidth="8"
                  strokeDasharray={keliling}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className={`transition-all duration-1000 ease-linear ${!jalan ? "opacity-50" : "opacity-100"}`}
                />
              </svg>
              <div className="flex flex-col items-center z-10">
                <div className="flex items-baseline overflow-hidden">
                  <span className="text-5xl font-black text-[#362A1F] tracking-tighter animate-[fadeScale_0.4s_ease-out]">
                    {m}
                  </span>
                  <span
                    className={`text-3xl font-black mx-1 ${mode === "Fokus" ? "text-[#F9A826]" : "text-green-400"}`}
                  >
                    :
                  </span>
                  <span className="text-5xl font-black text-[#362A1F] tracking-tighter animate-[fadeScale_0.4s_ease-out]">
                    {displayDetik}
                  </span>
                </div>
                <span
                  className={`text-[8px] font-black uppercase tracking-widest mt-1 ${jalan ? (mode === "Fokus" ? "text-[#F9A826]" : "text-green-500") : "text-[#8C7A6B]"}`}
                >
                  {jalan
                    ? isAuto
                      ? `Mode ${mode} (Auto)`
                      : `Mode ${mode} (Manual)`
                    : "Timer Jeda"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                onClick={() => setJalan(!jalan)}
                className={`py-3 rounded-[1.5rem] font-black text-[9px] tracking-widest uppercase shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1.5 ${jalan ? "bg-[#362A1F] text-white border-2 border-[#362A1F]" : "bg-[#F9A826] text-[#362A1F] border-2 border-[#F9A826]"}`}
              >
                {jalan ? (
                  <>
                    <span className="text-xs">⏸</span> PAUSE
                  </>
                ) : (
                  <>
                    <span className="text-xs">▶</span> RESUME
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setDetik(inputMenit * 60);
                  setJalan(false);
                }}
                className="py-3 bg-white text-[#8C7A6B] border-2 border-[#EAE0D5] rounded-[1.5rem] font-black text-[9px] tracking-widest uppercase active:scale-95 hover:border-[#F9A826] transition-all"
              >
                RESET
              </button>
            </div>

            <div className="mt-6 w-full">
              <p className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-widest mb-2 text-center">
                🎧 Musik
              </p>
              <div className="grid grid-cols-3 gap-2">
                {therapySounds.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => toggleAudio(s)}
                    title={s.label}
                    className={`w-full py-2 rounded-lg flex flex-col items-center justify-center transition-all border-2 font-black text-[9px] ${playing === s.id ? "bg-[#362A1F] text-white border-[#362A1F]" : "bg-white border-[#EAE0D5] text-[#8C7A6B] hover:border-[#F9A826]"}`}
                  >
                    <span className="text-base mb-0.5">{s.icon}</span>
                    <span className="text-[7px] hidden sm:block">
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>

              {playing && (
                <button
                  onClick={stopAudio}
                  className="w-full mt-3 py-2 bg-red-50 text-red-500 border border-red-100 rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm flex justify-center items-center gap-1.5 animate-[fadeScale_0.2s_ease-out]"
                >
                  ⏹ Hentikan Musik
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Rencana", "Dikerjakan", "Selesai"].map((st) => {
              const tugasDiKolom = tugas.filter((t) => t.status === st);

              return (
                <div
                  key={st}
                  className="bg-[#FAF6F0]/80 p-4 rounded-[1.5rem] border border-[#EAE0D5] flex flex-col h-[520px] lg:h-[600px]"
                >
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#EAE0D5]/60 flex-shrink-0">
                    <span className="text-[10px] font-black text-[#8C7A6B] uppercase tracking-[0.2em]">
                      {st}
                    </span>
                    <span className="text-[9px] font-black bg-white text-[#8C7A6B] px-2.5 py-1 rounded-full border border-[#EAE0D5] shadow-sm">
                      {tugasDiKolom.length}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1 custom-scrollbar">
                    {tugasDiKolom.map((t) => {
                      const deadlineStatus = getDeadlineStatus(t.deadline);
                      const isUrgent =
                        deadlineStatus.status === "urgent" ||
                        deadlineStatus.status === "today" ||
                        deadlineStatus.status === "overdue";

                      return (
                        <div
                          key={t.id}
                          className={`bg-white p-4 rounded-2xl shadow-sm border-2 transition-all group flex flex-col flex-shrink-0 ${isUrgent ? "border-red-300 bg-red-50/30" : "border-[#EAE0D5] hover:border-[#F9A826]"}`}
                        >
                          {isUrgent && (
                            <div className="flex items-center gap-1.5 mb-3 text-red-600 text-[9px] font-black uppercase tracking-widest">
                              <AlertCircle className="h-3.5 w-3.5" />
                              <span>{deadlineStatus.label}</span>
                            </div>
                          )}

                          <p className="text-sm font-bold text-[#362A1F] mb-4 leading-snug flex-1">
                            {t.teks}
                          </p>

                          <div className="flex items-center gap-1.5 mb-4 text-[10px] font-bold text-[#8C7A6B] uppercase tracking-widest">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{t.deadline}</span>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-[#FAF6F0]">
                            {st !== "Selesai" ? (
                              <button
                                onClick={() =>
                                  moveTugas(
                                    t.id,
                                    st === "Rencana" ? "Dikerjakan" : "Selesai",
                                  )
                                }
                                className="px-4 py-2 bg-[#F9A826]/10 text-[#F9A826] rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-[#F9A826] hover:text-white transition-colors"
                              >
                                Lanjut →
                              </button>
                            ) : (
                              <span className="px-3 py-2 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                <CheckCircle2 className="h-3.5 w-3.5" /> Tuntas
                              </span>
                            )}

                            <button
                              onClick={() => deleteTugas(t.id)}
                              className="px-4 py-2 bg-red-50 text-red-400 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
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

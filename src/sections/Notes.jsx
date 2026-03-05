import { useState, useEffect } from "react";
import { Bold, Italic, Underline, Save, Trash2, FileText } from "lucide-react";

export default function Notes() {
  const [jurnal, setJurnal] = useState(() => {
    const saved = localStorage.getItem("jurnal_lentera");
    return saved ? JSON.parse(saved) : [];
  });

  const [saved, setSaved] = useState(false);
  const [aktif, setAktif] = useState(0);
  const [dialogHapus, setDialogHapus] = useState(false);

  useEffect(() => {
    localStorage.setItem("jurnal_lentera", JSON.stringify(jurnal));
  }, [jurnal]);

  const handleBaru = () => {
    const date = new Date();
    const tgl =
      date.getDate() + " " + date.toLocaleString("id-ID", { month: "short" });
    setJurnal([
      {
        id: Date.now(),
        judul: "",
        tgl: tgl,
        isi: "",
      },
      ...jurnal,
    ]);
    setAktif(0);
  };

  const konfirmasiHapus = () => {
    const d = jurnal.filter((_, i) => i !== aktif);
    setJurnal(d);
    setAktif(0);
    setDialogHapus(false);
  };

  const handleSimpan = () => {
    localStorage.setItem("jurnal_lentera", JSON.stringify(jurnal));
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const eksekusiFormat = (cmd) => {
    document.execCommand(cmd, false, null);
  };

  const hasNotes = jurnal.length > 0;

  return (
    <section
      id="catatan"
      className="py-20 md:py-32 px-4 sm:px-8 max-w-7xl mx-auto relative"
    >
      {/* Dialog Konfirmasi Hapus */}
      {dialogHapus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#362A1F]/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl animate-pop-in border-4 border-[#FAF6F0]">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Trash2 size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-black text-center text-[#362A1F] mb-3">
              Buang Catatan?
            </h3>
            <p className="text-center text-[#6B5A46] text-sm mb-8 font-medium">
              Catatan ini akan dihapus secara permanen dan tidak bisa
              dikembalikan lagi.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDialogHapus(false)}
                className="flex-1 py-3.5 rounded-2xl font-bold text-[#6B5A46] bg-[#FAF6F0] hover:bg-[#EAE0D5] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={konfirmasiHapus}
                className="flex-1 py-3.5 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {saved && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="flex items-center gap-3 bg-white border border-[#EAE0D5] shadow-xl rounded-2xl px-4 py-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100">
              <span className="text-green-600 font-bold">✓</span>
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-[#362A1F]">
                Catatan tersimpan
              </span>
              <span className="text-xs text-[#6B5A46]">
                Perubahan berhasil disimpan
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="reveal mb-14">
        <h2 className="text-3xl md:text-5xl font-black text-[#362A1F] tracking-tighter uppercase">
          Jurnal Belajar
        </h2>
      </div>
      <div className="reveal cozy-card flex flex-col lg:flex-row overflow-hidden min-h-[600px] bg-[#FAF6F0] rounded-3xl border border-[#EAE0D5] shadow-xl relative">
        {/* Sidebar Jurnal */}
        <div className="w-full lg:w-80 lg:border-r border-b lg:border-b-0 border-[#EAE0D5] bg-[#362A1F]/5 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-[#6B5A46] font-black text-xs tracking-[0.2em] uppercase">
              Catatan
            </h3>
            <button
              onClick={handleBaru}
              className="bg-[#F9A826] text-[#362A1F] px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-1 hover:brightness-110 transition-all font-mono"
            >
              + Baru
            </button>
          </div>

          <div className="flex overflow-x-auto lg:flex-col mx-auto lg:mx-0 lg:overflow-y-auto gap-3 pb-4 lg:pb-0 w-full hide-scrollbar">
            {!hasNotes && (
              <div className="text-center py-10 opacity-50 flex flex-col items-center gap-3">
                <FileText
                  size={40}
                  className="text-[#6B5A46] mx-auto opacity-50"
                />
                <p className="text-sm font-bold text-[#6B5A46]">
                  Belum ada catatan
                </p>
              </div>
            )}

            {jurnal.map((j, i) => (
              <button
                key={j.id}
                onClick={() => setAktif(i)}
                className={`w-64 lg:w-full shrink-0 text-left p-4 rounded-2xl border-2 transition-all ${
                  aktif === i
                    ? "border-none bg-white shadow-sm scale-[1.02]"
                    : "border-transparent bg-white/40 hover:bg-white/70"
                }`}
              >
                <h4 className="text-sm font-bold text-[#362A1F] truncate mb-1">
                  {j.judul || "Tanpa Judul"}
                </h4>
                <p className="text-xs text-[#6B5A46] truncate mb-2">
                  {j.isi.replace(/<[^>]+>/g, "") || "..."}
                </p>
                <div className="text-[10px] text-[#6B5A46] font-medium font-mono">
                  {j.tgl}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Editor Jurnal */}
        {hasNotes ? (
          <div className="flex-1 p-6 md:p-10 flex flex-col bg-white">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 md:gap-6 mb-8 pb-4 border-b border-[#EAE0D5]">
              <div className="flex gap-1 md:gap-2 mr-auto md:mr-0">
                <button
                  onClick={() => eksekusiFormat("bold")}
                  title="Bold"
                  className="p-2 text-[#6B5A46] hover:bg-[#FAF6F0] hover:text-[#362A1F] rounded-lg transition-colors"
                >
                  <Bold size={18} strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => eksekusiFormat("italic")}
                  title="Italic"
                  className="p-2 text-[#6B5A46] hover:bg-[#FAF6F0] hover:text-[#362A1F] rounded-lg transition-colors"
                >
                  <Italic size={18} strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => eksekusiFormat("underline")}
                  title="Underline"
                  className="p-2 text-[#6B5A46] hover:bg-[#FAF6F0] hover:text-[#362A1F] rounded-lg transition-colors"
                >
                  <Underline size={18} strokeWidth={2.5} />
                </button>
              </div>

              <div className="h-6 w-px bg-[#EAE0D5] hidden md:block" />

              <button
                onClick={handleSimpan}
                className="flex gap-2 items-center px-3 py-2 text-[#362A1F] hover:bg-[#FAF6F0] rounded-lg transition-colors"
              >
                <Save size={18} className="text-[#6B5A46]" strokeWidth={2.5} />
                <span className="font-bold text-sm hidden sm:inline">
                  Simpan
                </span>
              </button>

              <button
                onClick={() => setDialogHapus(true)}
                className="flex gap-2 items-center px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors md:ml-auto group"
              >
                <Trash2
                  size={18}
                  strokeWidth={2.5}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-bold text-sm hidden sm:inline">
                  Hapus
                </span>
              </button>
            </div>

            {/* Area Input */}
            <div className="flex-1 overflow-y-auto pr-2">
              {jurnal[aktif] && (
                <div className="animate-fade-in fade-in">
                  <input
                    value={jurnal[aktif].judul}
                    onChange={(e) => {
                      const d = [...jurnal];
                      d[aktif].judul = e.target.value;
                      setJurnal(d);
                    }}
                    placeholder="Judul catatan..."
                    className="text-3xl md:text-4xl font-black text-[#362A1F] outline-none mb-6 w-full bg-transparent placeholder-[#EAE0D5] selection:bg-[#F9A826]/30"
                  />
                  <div
                    contentEditable
                    onBlur={(e) => {
                      const d = [...jurnal];
                      d[aktif].isi = e.target.innerHTML;
                      setJurnal(d);
                    }}
                    dangerouslySetInnerHTML={{
                      __html: jurnal[aktif].isi || "",
                    }}
                    className="text-base sm:text-lg text-[#6B5A46] outline-none leading-relaxed min-h-[300px] empty:before:content-['Tulis_pikiranmu,_rangkuman_materi,_atau_ide_di_sini...'] empty:before:text-[#EAE0D5] selection:bg-[#F9A826]/30"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-center bg-white/50 text-center">
            <div className="w-24 h-24 bg-[#FAF6F0] rounded-full flex items-center justify-center mb-6 shadow-inner">
              <FileText size={48} className="text-[#EAE0D5]" />
            </div>
            <h3 className="text-2xl font-black text-[#362A1F] mb-3">
              Tidak ada catatan terbuka
            </h3>
            <p className="text-[#6B5A46] mb-8 max-w-sm">
              Buat catatan baru untuk mulai menulis ide, tugas, atau rangkuman
              belajarmu hari ini.
            </p>
            <button
              onClick={handleBaru}
              className="bg-[#362A1F] text-white px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#F9A826] hover:text-[#362A1F] hover:-translate-y-1 transition-all shadow-xl shadow-[#362A1F]/10 flex items-center gap-2"
            >
              + Buat Catatan
            </button>
          </div>
        )}
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.9) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-pop-in {
          animation: popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `,
        }}
      />
    </section>
  );
}

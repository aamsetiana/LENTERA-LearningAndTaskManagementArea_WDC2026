import { CheckCircle2 } from "lucide-react";

export default function FocusCompleteModal({ isOpen, onClose, minutes = 25 }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 px-10 py-12 max-w-md w-full flex flex-col items-center animate-fade-in">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
        <h2 className="text-2xl font-black text-[#362A1F] mb-2 text-center">
          Fokus Selesai!
        </h2>
        <p className="text-[#362A1F] text-center mb-6 font-medium">
          Selamat, kamu telah menyelesaikan sesi fokus selama{" "}
          <span className="font-bold text-emerald-600">{minutes} menit</span>!
          <br />
          Ambil jeda sejenak sebelum lanjut belajar lagi.
        </p>
        <button
          onClick={onClose}
          className="mt-2 px-8 py-3 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg hover:scale-105 transition-all active:scale-95"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}

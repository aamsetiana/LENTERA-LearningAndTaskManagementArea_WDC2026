// src/components/AmbientPlayer.jsx

export default function AmbientPlayer() {
  return (
    <div className="cozy-card p-6 flex flex-col gap-4 w-full mt-6 animate-fade-up delay-150">
      {/* Header Widget */}
      <div className="flex justify-between items-center border-b border-[#EAE0D5] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎧</span>
          <span className="text-sm font-bold text-[#4A3F35]">
            Suasana Fokus
          </span>
        </div>
        {/* Animasi Gelombang Suara */}
        <div className="flex gap-1 items-end h-4">
          <span className="w-1 h-3 bg-[#D97757] rounded-full animate-pulse"></span>
          <span className="w-1 h-4 bg-[#D97757] rounded-full animate-pulse delay-75"></span>
          <span className="w-1 h-2 bg-[#D97757] rounded-full animate-pulse delay-150"></span>
        </div>
      </div>

      {/* Pilihan Suara (Hujan, Kafe, Lofi) */}
      <div className="grid grid-cols-3 gap-3">
        <button
          className="py-2.5 bg-[#F3EAD3] text-[#D97757] rounded-xl text-xl hover:bg-[#D97757] hover:text-white hover:-translate-y-1 transition-all shadow-sm border border-[#D97757]/20"
          title="Hujan Tropis"
        >
          🌧️
        </button>
        <button
          className="py-2.5 bg-[#FAF6F0] text-[#8C7A6B] rounded-xl text-xl hover:bg-[#EAE0D5] hover:-translate-y-1 transition-all shadow-sm border border-[#EAE0D5]"
          title="Suasana Kafe"
        >
          ☕
        </button>
        <button
          className="py-2.5 bg-[#FAF6F0] text-[#8C7A6B] rounded-xl text-xl hover:bg-[#EAE0D5] hover:-translate-y-1 transition-all shadow-sm border border-[#EAE0D5]"
          title="Lofi Hip-Hop"
        >
          📻
        </button>
      </div>

      {/* Kontrol Volume & Play */}
      <div className="flex items-center gap-3 mt-1">
        <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[#4A3F35] text-white rounded-full hover:bg-[#D97757] active:scale-95 transition-all shadow-md">
          ▶
        </button>
        <input
          type="range"
          className="w-full accent-[#D97757] h-1.5 bg-[#EAE0D5] rounded-lg appearance-none cursor-pointer"
          defaultValue="70"
        />
      </div>
    </div>
  );
}

// src/sections/Hero.jsx
export default function Hero() {
  return (
    <section className="hero-bg flex flex-col items-center justify-center text-center px-6">
      <div className="max-w-4xl space-y-6 animate-slide-up py-28">
        {/* <span className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-bold text-[#362A1F] uppercase tracking-[0.4em] border border-white/30 shadow-sm">
          Digital Sanctuary for Students
        </span> */}
        <h1 className="text-5xl md:text-8xl font-black text-[#362A1F] leading-tight tracking-tighter">
          Nyalakan <span className="text-white drop-shadow-md">Fokus,</span>
          <br />
          Selesaikan <span className="text-[#F9A826]">Tugas.</span>
        </h1>
        <p className="text-lg md:text-xl text-[#362A1F]/70 font-medium max-w-2xl mx-auto">
          Ruang kerja minimalis untuk manajemen waktu dan produktivitas
          mahasiswa yang lebih terukur.
        </p>
        <div className="pt-10 flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="#dashboard"
            className="px-12 py-5 bg-[#362A1F] text-white rounded-[2rem] font-bold text-sm shadow-2xl hover:bg-[#F9A826] hover:text-[#362A1F] transition-all duration-500 uppercase tracking-widest active:scale-95"
          >
            Mulai Produktif
          </a>
        </div>
      </div>
    </section>
  );
}

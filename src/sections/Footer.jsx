// src/sections/Footer.jsx
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#EAE0D5] bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6 mdd:px-12 py-12 md:py-16">
        {/* Grid Utama Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          {/* Kiri: Nama Aplikasi & Deskripsi Singkat */}
          <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <h2 className="text-2xl font-black text-[#362A1F] tracking-tighter uppercase">
              Lentera.
            </h2>
            <p className="text-xs font-medium text-[#8C7A6B] leading-relaxed max-w-xs">
              Ruang produktivitas digital yang dirancang untuk membantu Anda
              fokus, mengatur tugas, dan mencapai target harian dengan lebih
              baik.
            </p>
          </div>

          {/* Tengah: Informasi Kompetisi */}
          <div className="flex flex-col gap-3 items-center md:items-start text-center md:text-left md:mx-auto">
            <h3 className="text-[10px] font-black text-[#362A1F] uppercase tracking-[0.2em] mb-1">
              Kompetisi
            </h3>
            <p className="text-xs font-bold text-[#8C7A6B]">
              Web Development Competition 2026
            </p>
            <p className="text-xs font-bold text-[#8C7A6B]">
              Kategori Aplikasi Produktivitas
            </p>
            <p className="text-xs font-bold text-[#D97757]">Final Submission</p>
          </div>

          {/* Kanan: Profil Kreator (Identitas Kamu) */}
          <div className="flex flex-col gap-3 items-center md:items-end text-center md:text-right">
            <h3 className="text-[10px] font-black text-[#362A1F] uppercase tracking-[0.2em] mb-1">
              Dikembangkan Oleh
            </h3>
            <p className="text-xs font-bold text-[#362A1F]">Tim Semoga Juara</p>
            <p className="text-xs font-bold text-[#8C7A6B]">
              Teknik Informatika
            </p>
            <p className="text-xs font-bold text-[#8C7A6B]">
              Universitas Kuningan
            </p>
          </div>
        </div>

        {/* Baris Bawah: Hak Cipta & Status Sistem */}
        <div className="mt-16 pt-8 border-t border-[#EAE0D5] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-widest text-center md:text-left">
            © 2026 Lentera Workspace. All rights reserved.
          </p>

          <div className="flex items-center gap-2 bg-[#FAF6F0] px-3 py-1.5 rounded-full border border-[#EAE0D5]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-[9px] font-bold text-[#8C7A6B] uppercase tracking-widest">
              Lentera V.1
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

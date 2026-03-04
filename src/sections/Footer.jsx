import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-orange-100 fade-in-up">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-block bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 fade-in-up delay-100">
          Mulai Transformasi Belajar Anda
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 fade-in-up delay-200">Tingkatkan Produktivitas, <br />Kurangi Stres.</h2>
        <p className="text-slate-600 mb-10 text-lg fade-in-up delay-300">Platform LENTERA gratis untuk mahasiswa. Coba sekarang dan rasakan perbedaannya dalam satu minggu pertama.</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20 fade-in-up delay-400">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold transition-all text-lg shadow-xl shadow-orange-500/20 hover:shadow-orange-600/30">
            Daftar Sekarang
          </button>
          <button className="bg-white border border-orange-200 text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-2xl font-bold transition-all text-lg">
            Lihat Demo Interaktif
          </button>
        </div>

        <div className="pt-8 border-t border-orange-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm fade-in-up delay-500">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-orange-500" />
            <span className="font-bold tracking-wider text-slate-800">LENTERA</span>
          </div>
          <p>© {new Date().getFullYear()} LENTERA. Prototype for Web Development Competition.</p>
        </div>
      </div>
    </footer>
  );
}

import { BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white/70 backdrop-blur-xl z-50 border-b border-orange-100/50 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 group cursor-pointer fade-in-left">
            <div className="bg-orange-500 p-2 rounded-xl group-hover:bg-orange-600 transition-colors">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600">
              LENTERA
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#latar-belakang" className="text-sm text-slate-600 hover:text-orange-500 font-medium transition-colors fade-in-up delay-100">Latar Belakang</a>
            <a href="#fitur" className="text-sm text-slate-600 hover:text-orange-500 font-medium transition-colors fade-in-up delay-200">Fitur Utama</a>
            <a href="#cara-kerja" className="text-sm text-slate-600 hover:text-orange-500 font-medium transition-colors fade-in-up delay-300">Cara Kerja</a>
            <a href="#teknologi" className="text-sm text-slate-600 hover:text-orange-500 font-medium transition-colors fade-in-up delay-400">Teknologi</a>
          </div>
          <div className="flex items-center gap-3 fade-in-right">
            <button className="hidden md:block text-sm font-semibold text-slate-600 hover:text-orange-500 transition-colors">Masuk</button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-5 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-orange-400/30">
              Coba Gratis
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

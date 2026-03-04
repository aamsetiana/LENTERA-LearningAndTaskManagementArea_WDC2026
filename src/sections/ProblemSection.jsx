import { Layers, Target, Clock } from 'lucide-react';

export default function ProblemSection() {
    return (
        <section id="latar-belakang" className="py-24 bg-gradient-to-b from-white via-orange-50/30 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16 fade-in-up">
                    <h2 className="text-sm font-bold tracking-widest text-orange-600 uppercase mb-3">Latar Belakang</h2>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Mengapa LENTERA Diciptakan?</h3>
                    <p className="text-slate-600">Mahasiswa seringkali terjebak dalam siklus prokrastinasi bukan karena malas, melainkan karena sistem manajemen yang berantakan.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-transparent border border-orange-100 hover:shadow-lg transition-shadow fade-in-up delay-100">
                        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                            <Layers className="h-6 w-6" />
                        </div>
                        <h4 className="text-xl font-bold mb-2 text-slate-800">Tugas Menumpuk</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">Kesulitan melacak deadline dari berbagai mata kuliah dan kegiatan UKM yang berjalan bersamaan.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-transparent border border-orange-100 hover:shadow-lg transition-shadow fade-in-up delay-200">
                        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                            <Target className="h-6 w-6" />
                        </div>
                        <h4 className="text-xl font-bold mb-2 text-slate-800">Kehilangan Fokus</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">Distraksi media sosial dan notifikasi smartphone yang terus-menerus memecah konsentrasi belajar.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-transparent border border-orange-100 hover:shadow-lg transition-shadow fade-in-up delay-300">
                        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                            <Clock className="h-6 w-6" />
                        </div>
                        <h4 className="text-xl font-bold mb-2 text-slate-800">Manajemen Waktu Buruk</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">Sering mengorbankan waktu istirahat (burnout) karena tidak bisa memprioritaskan mana yang penting dan mendesak.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

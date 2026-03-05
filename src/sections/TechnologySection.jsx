import { Code2, Layers } from 'lucide-react';

export default function TechnologySection() {
    return (
        <section id="teknologi" className="py-20 bg-gradient-to-b from-orange-50 to-white fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-sm font-bold tracking-widest text-orange-600 uppercase mb-8 fade-in-up delay-100">Dibangun Dengan Teknologi Modern</h2>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                    <div className="flex flex-col items-center gap-2 hover:scale-110 transition-all opacity-70 hover:opacity-100 fade-in-up delay-150">
                        <Code2 className="h-10 w-10 text-orange-500" />
                        <span className="text-sm font-bold text-slate-700">React.js</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 hover:scale-110 transition-all opacity-70 hover:opacity-100 fade-in-up delay-200">
                        <div className="h-10 w-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg text-white flex items-center justify-center font-bold text-xl">JS</div>
                        <span className="text-sm font-bold text-slate-700">JavaScript</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 hover:scale-110 transition-all opacity-70 hover:opacity-100 fade-in-up delay-300">
                        <div className="h-10 w-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                            <div className="h-4 w-6 bg-white rounded-sm"></div>
                        </div>
                        <span className="text-sm font-bold text-slate-700">Tailwind CSS</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 hover:scale-110 transition-all opacity-70 hover:opacity-100 fade-in-up delay-400">
                        <Layers className="h-10 w-10 text-orange-500" />
                        <span className="text-sm font-bold text-slate-700">Vite Build</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

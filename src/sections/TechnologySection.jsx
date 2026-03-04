import { Code2, Layers } from 'lucide-react';

export default function TechnologySection() {
    return (
        <section id="teknologi" className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-8">Dibangun Dengan Teknologi Modern</h2>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                    <div className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                        <Code2 className="h-10 w-10 text-cyan-500" />
                        <span className="text-sm font-bold text-slate-700">React.js</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                        <div className="h-10 w-10 bg-blue-600 rounded-lg text-white flex items-center justify-center font-bold text-xl">JS</div>
                        <span className="text-sm font-bold text-slate-700">JavaScript</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                        <div className="h-10 w-10 bg-teal-500 rounded-full flex items-center justify-center">
                            <div className="h-4 w-6 bg-white rounded-sm"></div>
                        </div>
                        <span className="text-sm font-bold text-slate-700">Tailwind CSS</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                        <Layers className="h-10 w-10 text-indigo-500" />
                        <span className="text-sm font-bold text-slate-700">Vite Build</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

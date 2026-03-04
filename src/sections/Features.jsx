export default function Features() {
  const features = [
    {
      title: "Papan Tugas Visual",
      desc: "Atur tugas kuliah dengan sistem Kanban yang interaktif.",
      icon: "📋",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Ruang Fokus",
      desc: "Timer Pomodoro terintegrasi untuk menjaga konsentrasi belajar.",
      icon: "⏱️",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Catatan Cerdas",
      desc: "Simpan ide dan materi kuliah secara instan tanpa hambatan.",
      icon: "✍️",
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <section id="fitur" className="max-w-7xl mx-auto px-10 py-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 p-10 rounded-[2.5rem] hover:shadow-xl transition-all duration-500"
          >
            <div
              className={`h-14 w-14 ${f.color} rounded-2xl flex items-center justify-center text-2xl mb-6`}
            >
              {f.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

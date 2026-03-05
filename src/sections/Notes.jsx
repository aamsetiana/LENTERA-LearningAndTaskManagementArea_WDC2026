import { useState, useEffect } from "react";

export default function Notes() {
  const [jurnal, setJurnal] = useState(() => {
    const saved = localStorage.getItem("jurnal_lentera");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            judul: "Catatan Baru",
            tgl: "5/3/2026",
            isi: "Mulai menulis...",
          },
        ];
  });

  const [aktif, setAktif] = useState(0);

  useEffect(() => {
    localStorage.setItem("jurnal_lentera", JSON.stringify(jurnal));
  }, [jurnal]);

  return (
    <section
      id="catatan"
      className="py-20 md:py-32 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      <div className="reveal mb-14">
        <h2 className="text-3xl md:text-5xl font-black text-[#362A1F] tracking-tighter uppercase">
          Jurnal Belajar
        </h2>
      </div>
      <div className="reveal cozy-card flex flex-col lg:flex-row overflow-hidden min-h-[600px] bg-white">
        {/* Sidebar Jurnal */}
        <div className="w-full lg:w-80 border-b lg:border-r border-[#EAE0D5] bg-[#FAF6F0]/50 p-6">
          <button
            onClick={() =>
              setJurnal([
                {
                  id: Date.now(),
                  judul: "Jurnal Baru",
                  tgl: "5/3/2026",
                  isi: "...",
                },
                ...jurnal,
              ])
            }
            className="w-full py-4 mb-6 bg-[#362A1F] text-white rounded-[2rem] font-black text-[10px] tracking-[0.3em] uppercase"
          >
            + BARU
          </button>
          {jurnal.map((j, i) => (
            <button
              key={j.id}
              onClick={() => setAktif(i)}
              className={`w-full text-left p-4 rounded-[2rem] mb-2 border-2 ${aktif === i ? "border-[#F9A826] bg-white" : "border-transparent"}`}
            >
              <h4 className="text-sm font-black truncate">{j.judul}</h4>
            </button>
          ))}
        </div>
        {/* Editor Jurnal */}
        <div className="flex-1 p-10 md:p-16">
          <input
            value={jurnal[aktif]?.judul || ""}
            onChange={(e) => {
              const d = [...jurnal];
              d[aktif].judul = e.target.value;
              setJurnal(d);
            }}
            className="text-4xl font-black text-[#362A1F] outline-none mb-8 w-full bg-transparent"
          />
          <div
            contentEditable
            onBlur={(e) => {
              const d = [...jurnal];
              d[aktif].isi = e.target.innerHTML;
              setJurnal(d);
            }}
            dangerouslySetInnerHTML={{ __html: jurnal[aktif]?.isi || "" }}
            className="text-lg text-[#6B5A46] outline-none leading-relaxed"
          />
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Quote,
} from "lucide-react";
import { ModalInput, useModalInput } from "../components/ModalInput";

export default function Notes({ notify }) {
  const [jurnal, setJurnal] = useState(() => {
    const saved = localStorage.getItem("jurnal_lentera");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            judul: "Catatan Hari Ini - 5 Maret 2026",
            tgl: "5/3/2026",
            isi: "<p><strong>Pembelajaran Hari Ini:</strong></p><ul><li>Mempelajari React Hooks</li><li>Implementing Chart.js dengan React</li></ul>",
            images: [],
          },
        ];
  });

  const [aktif, setAktif] = useState(0);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const modalAddJournal = useModalInput();

  useEffect(() => {
    localStorage.setItem("jurnal_lentera", JSON.stringify(jurnal));
  }, [jurnal]);

  // Format Commands
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleAddLink = () => {
    const url = prompt("Masukkan URL (https://...):");
    if (url) execCommand("createLink", url);
  };

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result;
        execCommand("insertImage", dataUrl);
        notify("Gambar ditambahkan ke jurnal", "success");
      };
      reader.readAsDataURL(file);
    } else {
      notify("Pilih file gambar yang valid", "error");
    }
  };

  const handleAddJournalSubmit = (formData) => {
    setJurnal([
      {
        id: Date.now(),
        judul: formData.judul.trim(),
        tgl: new Date().toLocaleDateString("id-ID"),
        isi: "<p>Mulai menulis...</p>",
        images: [],
      },
      ...jurnal,
    ]);
    notify("Jurnal baru dibuat ✓", "success");
  };

  return (
    <section
      id="catatan"
      className="py-20 md:py-32 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      {/* Modal Add Journal */}
      <ModalInput
        isOpen={modalAddJournal.isOpen}
        title="Buat Jurnal Baru"
        fields={[
          {
            name: "judul",
            label: "Judul Jurnal",
            type: "text",
            placeholder: "Apa topik pembelajaran hari ini?",
            required: true,
            autoFocus: true,
          },
        ]}
        onSubmit={handleAddJournalSubmit}
        onClose={modalAddJournal.close}
      />

      <div className="reveal mb-14">
        <h2 className="text-3xl md:text-5xl font-black text-[#362A1F] tracking-tighter uppercase">
          📓 Jurnal Belajar
        </h2>
      </div>

      <div className="reveal cozy-card flex flex-col lg:flex-row overflow-hidden min-h-screen bg-white">
        {/* Sidebar Jurnal */}
        <div className="w-full lg:w-80 border-b lg:border-r border-[#EAE0D5] bg-[#FAF6F0]/50 p-6">
          <button
            onClick={modalAddJournal.open}
            className="w-full py-4 mb-6 bg-[#362A1F] text-white rounded-4xl font-black text-[10px] tracking-[0.3em] uppercase hover:bg-[#F9A826] hover:text-[#362A1F] transition-all"
          >
            + JURNAL BARU
          </button>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {jurnal.map((j, i) => (
              <button
                key={j.id}
                onClick={() => setAktif(i)}
                className={`w-full text-left p-4 rounded-4xl mb-2 border-2 transition-all ${
                  aktif === i
                    ? "border-[#F9A826] bg-white shadow-md"
                    : "border-transparent hover:bg-white/50"
                }`}
              >
                <h4 className="text-sm font-black truncate text-[#362A1F]">
                  {j.judul}
                </h4>
                <p className="text-xs text-[#8C7A6B] mt-1">{j.tgl}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Editor Jurnal */}
        <div className="flex-1 p-8 md:p-12 flex flex-col">
          {/* Input Judul */}
          <input
            value={jurnal[aktif]?.judul || ""}
            onChange={(e) => {
              const d = [...jurnal];
              d[aktif].judul = e.target.value;
              setJurnal(d);
            }}
            className="text-3xl md:text-4xl font-black text-[#362A1F] outline-none mb-2 w-full bg-transparent border-b-2 border-[#EAE0D5] pb-4 hover:border-[#F9A826] focus:border-[#F9A826] transition-colors"
          />
          <p className="text-xs text-[#8C7A6B] mb-8">
            Dibuat: {jurnal[aktif]?.tgl}
          </p>

          {/* Toolbar Editor */}
          <div className="mb-6 p-4 bg-[#FAF6F0] rounded-2xl border border-[#EAE0D5] flex flex-wrap gap-2">
            {/* Text Formatting */}
            <div className="flex gap-1 border-r border-[#EAE0D5] pr-2">
              <button
                onClick={() => execCommand("bold")}
                title="Bold (Ctrl+B)"
                className="p-2 hover:bg-white rounded-lg transition-colors text-[#362A1F] hover:text-[#F9A826]"
              >
                <Bold className="h-5 w-5" />
              </button>
              <button
                onClick={() => execCommand("italic")}
                title="Italic (Ctrl+I)"
                className="p-2 hover:bg-white rounded-lg transition-colors text-[#362A1F] hover:text-[#F9A826]"
              >
                <Italic className="h-5 w-5" />
              </button>
              <button
                onClick={() => execCommand("underline")}
                title="Underline (Ctrl+U)"
                className="p-2 hover:bg-white rounded-lg transition-colors text-[#362A1F] hover:text-[#F9A826]"
              >
                <Underline className="h-5 w-5" />
              </button>
            </div>

            {/* Headings */}
            <div className="flex gap-1 border-r border-[#EAE0D5] pr-2">
              <button
                onClick={() => execCommand("formatBlock", "h1")}
                title="Heading 1"
                className="p-2 hover:bg-white rounded-lg transition-colors text-[#362A1F] hover:text-[#F9A826]"
              >
                <Heading1 className="h-5 w-5" />
              </button>
              <button
                onClick={() => execCommand("formatBlock", "h2")}
                title="Heading 2"
                className="p-2 hover:bg-white rounded-lg transition-colors text-[#362A1F] hover:text-[#F9A826]"
              >
                <Heading2 className="h-5 w-5" />
              </button>
            </div>

            {/* Lists */}
            <div className="flex gap-1 border-r border-[#EAE0D5] pr-2">
              <button
                onClick={() => execCommand("insertUnorderedList")}
                title="Bullet List"
                className="p-2 hover:bg-white rounded-lg transition-colors text-[#362A1F] hover:text-[#F9A826]"
              >
                <List className="h-5 w-5" />
              </button>
              <button
                onClick={() => execCommand("insertOrderedList")}
                title="Numbered List"
                className="p-2 hover:bg-white rounded-lg transition-colors text-[#362A1F] hover:text-[#F9A826]"
              >
                <ListOrdered className="h-5 w-5" />
              </button>
            </div>

            {/* Media */}
            <div className="flex gap-1 border-r border-[#EAE0D5] pr-2">
              <button
                onClick={handleAddLink}
                title="Add Link"
                className="p-2 hover:bg-white rounded-lg transition-colors text-[#362A1F] hover:text-[#F9A826]"
              >
                <Link2 className="h-5 w-5" />
              </button>
              <button
                onClick={handleAddImage}
                title="Add Image"
                className="p-2 hover:bg-white rounded-lg transition-colors text-[#362A1F] hover:text-[#F9A826]"
              >
                <ImageIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Quote */}
            <div className="flex gap-1">
              <button
                onClick={() => execCommand("formatBlock", "blockquote")}
                title="Quote"
                className="p-2 hover:bg-white rounded-lg transition-colors text-[#362A1F] hover:text-[#F9A826]"
              >
                <Quote className="h-5 w-5" />
              </button>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Editor Content */}
          <div
            ref={editorRef}
            contentEditable
            onBlur={(e) => {
              const d = [...jurnal];
              d[aktif].isi = e.currentTarget.innerHTML;
              setJurnal(d);
            }}
            onInput={(e) => {
              const d = [...jurnal];
              d[aktif].isi = e.currentTarget.innerHTML;
              setJurnal(d);
            }}
            dangerouslySetInnerHTML={{ __html: jurnal[aktif]?.isi || "" }}
            suppressContentEditableWarning
            className="flex-1 text-lg text-[#362A1F] outline-none leading-relaxed p-6 bg-white border-2 border-[#EAE0D5] rounded-2xl hover:border-[#F9A826] focus:border-[#F9A826] transition-colors prose prose-sm max-w-none
              [&_h1]:text-3xl [&_h1]:font-black [&_h1]:mt-6 [&_h1]:mb-4
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-3
              [&_ul]:list-disc [&_ul]:ml-6 [&_li]:my-1
              [&_ol]:list-decimal [&_ol]:ml-6
              [&_blockquote]:border-l-4 [&_blockquote]:border-[#F9A826] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#8C7A6B]
              [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-4
              [&_a]:text-[#F9A826] [&_a]:underline [&_a]:hover:text-[#D97757]"
          />
        </div>
      </div>
    </section>
  );
}

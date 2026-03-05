import { useState } from "react";
import { X } from "lucide-react";

/**
 * Modal Input Component - Form Input yang Modern & Custom
 * Props:
 * - isOpen: boolean
 * - title: string
 * - fields: array of field configs
 * - onSubmit: function
 * - onClose: function
 */

export function ModalInput({ isOpen, title, fields, onSubmit, onClose }) {
  const [formData, setFormData] = useState({});

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi semua field required
    const allFilled = fields.every(
      (field) => !field.required || formData[field.name]?.trim(),
    );

    if (!allFilled) {
      alert("Mohon isi semua field yang diperlukan");
      return;
    }

    onSubmit(formData);
    setFormData({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - Z-index super tinggi biar nutupin Navbar */}
      <div
        className="fixed inset-0 bg-black/60 z-[998] backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal - Diatur persis di tengah layar tanpa padding top yang mengganggu */}
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
        {/* Kontainer Card */}
        <div className="bg-white rounded-[2rem] shadow-2xl border border-[#EAE0D5] w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-[fadeScale_0.2s_ease-out]">
          {/* Header */}
          <div className="bg-[#362A1F] text-white px-6 py-5 flex items-center justify-between flex-shrink-0">
            <h2 className="text-lg font-black uppercase tracking-widest text-[#F9A826]">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form - Bisa di-scroll kalau layar kekecilan */}
          <form
            onSubmit={handleSubmit}
            className="flex-auto p-6 space-y-5 overflow-y-auto custom-scrollbar bg-[#FAF6F0]/30"
          >
            {fields.map((field) => (
              <div key={field.name}>
                {/* Label */}
                <label className="block text-[10px] font-black text-[#8C7A6B] uppercase tracking-widest mb-2">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                {/* Input Types */}
                {field.type === "text" && (
                  <input
                    type="text"
                    name={field.name}
                    placeholder={field.placeholder || ""}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    autoFocus={field.autoFocus}
                    className="w-full px-5 py-3.5 border-2 border-[#EAE0D5] rounded-2xl font-bold text-[#362A1F] focus:border-[#F9A826] focus:outline-none transition-colors bg-white hover:border-[#F9A826]/50 placeholder:text-[#EAE0D5]"
                  />
                )}

                {field.type === "date" && (
                  <input
                    type="date"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-5 py-3.5 border-2 border-[#EAE0D5] rounded-2xl font-bold text-[#362A1F] focus:border-[#F9A826] focus:outline-none transition-colors bg-white hover:border-[#F9A826]/50"
                  />
                )}

                {field.type === "select" && (
                  <select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-5 py-3.5 border-2 border-[#EAE0D5] rounded-2xl font-bold text-[#362A1F] focus:border-[#F9A826] focus:outline-none transition-colors bg-white hover:border-[#F9A826]/50 cursor-pointer appearance-none"
                  >
                    <option value="" disabled className="text-gray-400">
                      -- Pilih {field.label} --
                    </option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt} className="font-bold">
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === "textarea" && (
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder || ""}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    rows={4}
                    className="w-full px-5 py-3.5 border-2 border-[#EAE0D5] rounded-2xl font-bold text-[#362A1F] focus:border-[#F9A826] focus:outline-none transition-colors bg-white hover:border-[#F9A826]/50 resize-none custom-scrollbar placeholder:text-[#EAE0D5]"
                  />
                )}

                {/* Helper Text */}
                {field.helperText && (
                  <p className="text-[10px] font-bold text-[#8C7A6B] mt-2">
                    {field.helperText}
                  </p>
                )}
              </div>
            ))}
          </form>

          {/* Buttons - Below form */}
          <div className="border-t border-[#EAE0D5] px-6 py-5 bg-white flex-shrink-0 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 bg-white text-[#8C7A6B] border-2 border-[#EAE0D5] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-red-400 hover:text-red-500 transition-colors active:scale-95"
            >
              Batal
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 py-3.5 bg-[#F9A826] text-[#362A1F] rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Hook untuk menggunakan ModalInput dengan lebih mudah
 */
export function useModalInput() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
}

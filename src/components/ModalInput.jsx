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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal - Full view centered with spacing */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pt-20 pb-10 px-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 w-full max-w-2xl max-h-[calc(100vh-100px)] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#362A1F] to-[#362A1F]/80 text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
            <h2 className="text-xl font-black uppercase tracking-widest">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form - No scroll, fits in view */}
          <form
            onSubmit={handleSubmit}
            className="flex-auto p-6 space-y-4 overflow-hidden"
          >
            {fields.map((field) => (
              <div key={field.name}>
                {/* Label */}
                <label className="block text-sm font-black text-[#362A1F] uppercase tracking-widest mb-2">
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
                    className="w-full px-4 py-3 border-2 border-[#EAE0D5] rounded-2xl focus:border-[#F9A826] focus:outline-none transition-colors bg-white hover:border-[#F9A826]/50"
                  />
                )}

                {field.type === "date" && (
                  <input
                    type="date"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#EAE0D5] rounded-2xl focus:border-[#F9A826] focus:outline-none transition-colors bg-white hover:border-[#F9A826]/50"
                  />
                )}

                {field.type === "select" && (
                  <select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#EAE0D5] rounded-2xl focus:border-[#F9A826] focus:outline-none transition-colors bg-white hover:border-[#F9A826]/50 cursor-pointer"
                  >
                    <option value="">-- Pilih {field.label} --</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
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
                    className="w-full px-4 py-3 border-2 border-[#EAE0D5] rounded-2xl focus:border-[#F9A826] focus:outline-none transition-colors bg-white hover:border-[#F9A826]/50 resize-none"
                  />
                )}

                {/* Helper Text */}
                {field.helperText && (
                  <p className="text-xs text-[#8C7A6B] mt-2">
                    {field.helperText}
                  </p>
                )}
              </div>
            ))}
          </form>

          {/* Buttons - Below form */}
          <div className="border-t border-[#EAE0D5] px-6 py-4 bg-white flex-shrink-0 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2 bg-white text-[#362A1F] border-2 border-[#EAE0D5] rounded-2xl font-black text-sm uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 px-6 py-2 bg-gradient-to-r from-[#F9A826] to-[#F9A826] text-[#362A1F] rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95"
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

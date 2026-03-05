/**
 * Mock Data untuk localStorage
 * Inisialisasi data awal jika belum ada
 */

export const initializeMockData = () => {
  // Data tugas jika kosong
  if (!localStorage.getItem("tugas_lentera")) {
    const tugas = [
      {
        id: 1,
        teks: "Finalisasi Proyek WDC International",
        status: "Dikerjakan",
        deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 2 hari lagi
        prioritas: "Tinggi",
      },
      {
        id: 2,
        teks: "Laporan Praktikum Sistem Operasi",
        status: "Rencana",
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 5 hari lagi
        prioritas: "Sedang",
      },
      {
        id: 3,
        teks: "Studi Machine Learning Advanced",
        status: "Selesai",
        deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        prioritas: "Rendah",
      },
      {
        id: 4,
        teks: "Presentasi Hasil Riset",
        status: "Dikerjakan",
        deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 1 hari lagi
        prioritas: "Tinggi",
      },
    ];
    localStorage.setItem("tugas_lentera", JSON.stringify(tugas));
  }

  // Total fokus time
  if (!localStorage.getItem("total_fokus_lentera")) {
    localStorage.setItem("total_fokus_lentera", "480"); // 480 menit = 8 jam
  }

  // Jurnal jika kosong
  if (!localStorage.getItem("jurnal_lentera")) {
    const jurnal = [
      {
        id: 1,
        judul: "Catatan Hari Ini - 5 Maret 2026",
        tgl: "5/3/2026",
        isi: "<p><strong>Pembelajaran Hari Ini:</strong></p><ul><li>Mempelajari React Hooks</li><li>Implementing Chart.js dengan React</li><li>Optimization Performance</li></ul>",
        images: [],
        links: [],
      },
    ];
    localStorage.setItem("jurnal_lentera", JSON.stringify(jurnal));
  }
};

// Hitung hari menuju deadline
export const daysUntilDeadline = (deadlineStr) => {
  const deadline = new Date(deadlineStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.ceil((deadline - today) / msPerDay);
};

// Status warning deadline
export const getDeadlineStatus = (deadlineStr) => {
  const days = daysUntilDeadline(deadlineStr);
  if (days < 0) return { status: "overdue", label: "Terlewat", color: "red" };
  if (days === 0)
    return { status: "today", label: "Hari Ini", color: "orange" };
  if (days <= 2)
    return { status: "urgent", label: `${days} Hari`, color: "red" };
  if (days <= 5)
    return { status: "approaching", label: `${days} Hari`, color: "yellow" };
  return { status: "ok", label: `${days} Hari`, color: "green" };
};

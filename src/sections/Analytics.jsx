// src/sections/Analytics.jsx
import { useState, useEffect } from "react";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Clock,
  CheckCircle2,
  Zap,
  Target,
} from "lucide-react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Registrasi komponen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

// Komponen Kartu Statistik
const StatCard = ({ icon: Icon, label, value, unit, color }) => (
  <div className="bg-white rounded-[2rem] p-8 border border-[#EAE0D5] hover:shadow-lg transition-all hover:border-[#F9A826] group">
    <div className="flex items-start gap-4">
      <div
        className={`p-4 rounded-2xl ${color} shadow-sm transition-transform group-hover:scale-110`}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#8C7A6B] mb-2">
          {label}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-[#362A1F] tracking-tighter">
            {value}
          </span>
          {unit && (
            <span className="text-xs font-bold text-[#8C7A6B] uppercase tracking-widest">
              {unit}
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default function Analytics() {
  const [statistik, setStatistik] = useState({
    totalFokus: 0,
    tugasSelesai: 0,
    sesiPomodoro: 0,
    targetTercapai: 0,
    totalTugas: 0,
  });

  const [performa, setPerforma] = useState({
    hariOnTrack: 0,
    rataRata: 0,
    efisiensi: 0,
  });

  const [barChartData, setBarChartData] = useState({
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    datasets: [],
  });

  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [lineChartData, setLineChartData] = useState({
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    datasets: [],
  });

  useEffect(() => {
    // 1. Ambil data dari localStorage (Sinkron dengan Meja Kerja)
    const dataTugas = JSON.parse(localStorage.getItem("tugas_lentera")) || [];
    const totalFokusStr = localStorage.getItem("total_fokus_lentera") || "0";
    const totalFokus = parseInt(totalFokusStr) || 0;

    // 2. Hitung statistik dasar
    const selesai = dataTugas.filter((t) => t.status === "Selesai").length;
    const total = dataTugas.length;
    const persentase = total > 0 ? Math.round((selesai / total) * 100) : 0;
    const sesiPomodoro = Math.round(totalFokus / 25) || 0;

    // 3. Hitung Performa Mingguan
    const uniqueDays = new Set(
      dataTugas.map((t) => new Date(t.id).toDateString()),
    ).size;
    const hariOnTrack = uniqueDays > 7 ? 7 : uniqueDays;
    const rataRata = total > 0 ? (total / 7).toFixed(1) : 0;

    // 4. Hitung data chart
    // A. Bar Chart (Durasi Fokus Harian)
    const today = new Date().getDay();
    const dayIndex = today === 0 ? 6 : today - 1; // Senin = 0
    const dailyFocus = [0, 0, 0, 0, 0, 0, 0];
    dailyFocus[dayIndex] = parseFloat((totalFokus / 60).toFixed(1));

    // B. Doughnut Chart (Status Tugas)
    const statusCounts = { Rencana: 0, Dikerjakan: 0, Selesai: 0 };
    dataTugas.forEach((t) => {
      if (statusCounts[t.status] !== undefined) statusCounts[t.status]++;
    });

    // C. Line Chart (Aktivitas Mingguan)
    const weeklyActivity = [0, 0, 0, 0, 0, 0, 0];
    dataTugas.forEach((t) => {
      const d = new Date(t.id);
      const day = d.getDay();
      const idx = day === 0 ? 6 : day - 1;
      weeklyActivity[idx]++;
    });

    // Update all state at once to avoid cascading renders
    setStatistik({
      totalFokus: parseFloat((totalFokus / 60).toFixed(1)), // Konversi ke jam
      tugasSelesai: selesai,
      sesiPomodoro: sesiPomodoro,
      targetTercapai: persentase,
      totalTugas: total,
    });

    setPerforma({
      hariOnTrack: hariOnTrack,
      rataRata: rataRata,
      efisiensi: persentase,
    });

    setBarChartData({
      labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
      datasets: [
        {
          label: "Jam Fokus",
          data: dailyFocus,
          backgroundColor: "#D97757", // Warna bata Lentera
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    });

    setDoughnutChartData({
      labels: ["Rencana", "Dikerjakan", "Selesai"],
      datasets: [
        {
          data: [
            statusCounts.Rencana,
            statusCounts.Dikerjakan,
            statusCounts.Selesai,
          ],
          backgroundColor: ["#EAE0D5", "#F9A826", "#362A1F"], // Krem, Oranye, Hitam
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    });

    setLineChartData({
      labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
      datasets: [
        {
          label: "Aktivitas Tugas",
          data: weeklyActivity,
          borderColor: "#F9A826",
          backgroundColor: "rgba(249, 168, 38, 0.1)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#362A1F",
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    });
  }, []);

  // Opsi Konfigurasi Chart agar tampilannya estetik
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#8C7A6B",
          font: { family: "Poppins", size: 10, weight: "bold" },
        },
      },
      y: {
        grid: { color: "#FAF6F0" },
        ticks: { color: "#8C7A6B", font: { family: "Poppins", size: 10 } },
        beginAtZero: true,
      },
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "75%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#8C7A6B",
          padding: 20,
          usePointStyle: true,
          font: { family: "Poppins", size: 11, weight: "bold" },
        },
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#8C7A6B",
          font: { family: "Poppins", size: 10, weight: "bold" },
        },
      },
      y: {
        grid: { color: "#FAF6F0" },
        ticks: { color: "#8C7A6B", font: { family: "Poppins", size: 10 } },
        beginAtZero: true,
      },
    },
  };

  return (
    <section id="statistik" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="reveal mb-12 flex items-center gap-4">
          <div className="p-4 bg-[#362A1F] rounded-[2rem] shadow-xl">
            <TrendingUp className="h-8 w-8 text-[#F9A826]" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-[#362A1F] tracking-tighter uppercase">
              Statistik
            </h2>
            <p className="text-sm font-bold text-[#8C7A6B] uppercase tracking-widest mt-1">
              Pantau produktivitas mingguanmu
            </p>
          </div>
        </div>

        {/* 4 Kartu Statistik Teratas */}
        <div
          className="grid md:grid-cols-4 gap-6 mb-8 reveal"
          style={{ transitionDelay: "100ms" }}
        >
          <StatCard
            icon={Clock}
            label="Total Fokus"
            value={statistik.totalFokus}
            unit="jam"
            color="bg-[#D97757]"
          />
          <StatCard
            icon={CheckCircle2}
            label="Tugas Selesai"
            value={statistik.tugasSelesai}
            unit="tugas"
            color="bg-[#362A1F]"
          />
          <StatCard
            icon={Zap}
            label="Sesi Pomodoro"
            value={statistik.sesiPomodoro}
            unit="sesi"
            color="bg-[#F9A826]"
          />
          <StatCard
            icon={Target}
            label="Target Tercapai"
            value={statistik.targetTercapai}
            unit="%"
            color="bg-[#8C7A6B]"
          />
        </div>

        {/* Grid Chart */}
        <div
          className="grid md:grid-cols-2 gap-6 reveal"
          style={{ transitionDelay: "200ms" }}
        >
          {/* Bar Chart */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-[#EAE0D5] shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-8">
              <BarChart3 className="h-6 w-6 text-[#D97757]" />
              <h3 className="text-lg font-black text-[#362A1F] uppercase tracking-widest">
                Durasi Fokus (Jam)
              </h3>
            </div>
            <div className="h-[280px] w-full">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>

          {/* Doughnut Chart */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-[#EAE0D5] shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-8">
              <PieChart className="h-6 w-6 text-[#F9A826]" />
              <h3 className="text-lg font-black text-[#362A1F] uppercase tracking-widest">
                Distribusi Tugas
              </h3>
            </div>
            <div className="h-[280px] flex items-center justify-center">
              <Doughnut
                data={doughnutChartData}
                options={doughnutChartOptions}
              />
            </div>
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-[#EAE0D5] shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="h-6 w-6 text-[#362A1F]" />
              <h3 className="text-lg font-black text-[#362A1F] uppercase tracking-widest">
                Tren Aktivitas
              </h3>
            </div>
            <div className="h-[200px] w-full">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>

          {/* Kartu Ringkasan Performa - Redesign Modern Putih */}
          <div className="reveal bg-gradient-to-br from-white to-orange-50/30 rounded-3xl p-8 border border-orange-100 shadow-sm hover:shadow-md transition-all fade-in-up delay-400">
            <div className="flex items-center gap-2 mb-8">
              <CheckCircle2 className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-bold text-slate-900">
                ✅ Performa Mingguan
              </h3>
            </div>

            {/* Grid 3 Kolom untuk Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Metrik 1: Hari On Track */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-orange-100/50 hover:border-orange-300 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
                    Hari On Track
                  </span>
                  <span className="text-2xl">📅</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-orange-600">
                    {performa.hariOnTrack}
                  </span>
                  <span className="text-lg font-bold text-slate-400">/7</span>
                </div>
                <div className="mt-3 w-full bg-orange-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${(performa.hariOnTrack / 7) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Hari produktif minggu ini
                </p>
              </div>

              {/* Metrik 2: Rata-rata Tugas */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-emerald-100/50 hover:border-emerald-300 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
                    Rata-rata/Hari
                  </span>
                  <span className="text-2xl">📊</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-emerald-600">
                    {performa.rataRata}
                  </span>
                  <span className="text-xs font-bold text-slate-400">tasks</span>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Konsistensi penyelesaian tugas
                </p>
              </div>

              {/* Metrik 3: Efisiensi */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-amber-100/50 hover:border-amber-300 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
                    Efisiensi Belajar
                  </span>
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-amber-600">
                    {performa.efisiensi}
                  </span>
                  <span className="text-lg font-bold text-slate-400">%</span>
                </div>
                <div className="mt-3 w-full bg-amber-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-600 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${performa.efisiensi}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Target pencapaian minggu ini
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Tip */}
      <div className="reveal mt-12 p-6 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-2xl border border-orange-100 fade-in-up delay-500">
        <p className="text-slate-700 text-sm">
          <span className="font-semibold">💡 Tips:</span> Pantau grafik ini
          setiap minggu untuk melihat pola pembelajaran Anda. Tingkatkan target
          fokus sebesar 10% setiap minggu untuk hasil optimal!
        </p>
      </div>
    </section>
  );
}

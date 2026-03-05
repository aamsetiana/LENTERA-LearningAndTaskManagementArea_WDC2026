import { useState, useEffect } from 'react';
import { BarChart3, PieChart, TrendingUp, Clock, CheckCircle2, Zap, Target } from 'lucide-react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatCard = ({ icon: Icon, label, value, unit, color }) => (
  <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 border border-orange-100 hover:shadow-lg transition-all fade-in-up">
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-2xl ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-slate-600 mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-slate-900">{value}</span>
          {unit && <span className="text-sm text-slate-500">{unit}</span>}
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
    labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    datasets: [],
  });

  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [lineChartData, setLineChartData] = useState({
    labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    datasets: [],
  });

  useEffect(() => {
    // Ambil data dari localStorage
    const dataTugas = JSON.parse(localStorage.getItem('tugas_lentera')) || [];
    const totalFokusStr = localStorage.getItem('total_fokus_lentera') || '0';
    const totalFokus = parseInt(totalFokusStr) || 0;

    // Hitung statistik
    const selesai = dataTugas.filter((t) => t.status === 'Selesai').length;
    const total = dataTugas.length;
    const persentase = total > 0 ? Math.round((selesai / total) * 100) : 0;

    // Hitung sesi pomodoro (25 menit per sesi, dari total fokus dalam menit)
    const sesiPomodoro = Math.round(totalFokus / 25) || 0;

    setStatistik({
      totalFokus: Math.round(totalFokus / 60) || 0, // Convert to hours
      tugasSelesai: selesai,
      sesiPomodoro: sesiPomodoro,
      targetTercapai: persentase,
      totalTugas: total,
    });

    // Hitung Performa Mingguan (Realtime dari LocalStorage)
    const uniqueDays = new Set(dataTugas.map((t) => new Date(t.id).toDateString())).size;
    const hariOnTrack = uniqueDays > 7 ? 7 : uniqueDays;
    const rataRata = total > 0 ? (total / 7).toFixed(1) : 0;

    setPerforma({
      hariOnTrack: hariOnTrack,
      rataRata: rataRata,
      efisiensi: persentase,
    });

    // --- UPDATE CHART DATA ---

    // 1. Bar Chart (Fokus Harian - Mockup Realtime: Total hari ini)
    const today = new Date().getDay();
    const dayIndex = today === 0 ? 6 : today - 1;
    const dailyFocus = [0, 0, 0, 0, 0, 0, 0];
    dailyFocus[dayIndex] = parseFloat((totalFokus / 60).toFixed(1));

    setBarChartData({
      labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
      datasets: [
        {
          label: 'Jam Fokus',
          data: dailyFocus,
          backgroundColor: 'rgba(217, 119, 87, 0.8)',
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    });

    // 2. Doughnut Chart (Distribusi Status Tugas)
    const statusCounts = { Rencana: 0, Dikerjakan: 0, Selesai: 0 };
    dataTugas.forEach((t) => {
      if (statusCounts[t.status] !== undefined) statusCounts[t.status]++;
    });

    setDoughnutChartData({
      labels: ['Rencana', 'Dikerjakan', 'Selesai'],
      datasets: [
        {
          data: [statusCounts.Rencana, statusCounts.Dikerjakan, statusCounts.Selesai],
          backgroundColor: ['#F3B664', '#E89A5E', '#D97757'],
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    });

    // 3. Line Chart (Aktivitas Tugas Mingguan)
    const weeklyActivity = [0, 0, 0, 0, 0, 0, 0];
    dataTugas.forEach((t) => {
      const d = new Date(t.id);
      const day = d.getDay();
      const idx = day === 0 ? 6 : day - 1;
      weeklyActivity[idx]++;
    });

    setLineChartData({
      labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
      datasets: [
        {
          label: 'Aktivitas Tugas',
          data: weeklyActivity,
          borderColor: '#D97757',
          backgroundColor: 'rgba(217, 119, 87, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#D97757',
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    });
  }, []);

  // Setup scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { color: 'rgba(217, 119, 87, 0.1)' },
        ticks: { color: '#64748b', font: { size: 12 } },
      },
      y: {
        grid: { color: 'rgba(217, 119, 87, 0.1)' },
        ticks: { color: '#64748b', font: { size: 12 } },
        beginAtZero: true,
      },
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#64748b',
          padding: 15,
          boxWidth: 12,
          font: { size: 12 },
        },
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: { color: '#64748b', font: { size: 12 } },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(217, 119, 87, 0.1)' },
        ticks: { color: '#64748b', font: { size: 12 } },
      },
      y: {
        grid: { color: 'rgba(217, 119, 87, 0.1)' },
        ticks: { color: '#64748b', font: { size: 12 } },
        beginAtZero: true,
      },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-orange-50/20 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="reveal mb-12 fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-xl">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              📊 Visualisasi Progres
            </h2>
          </div>
          <p className="text-slate-600">Pantau produktivitasmu dan tingkat pembelajaran minggu ini</p>
        </div>

        {/* Stat Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="reveal delay-100">
            <StatCard
              icon={Clock}
              label="Total Fokus Minggu Ini"
              value={statistik.totalFokus}
              unit="jam"
              color="bg-orange-500"
            />
          </div>
          <div className="reveal delay-200">
            <StatCard
              icon={CheckCircle2}
              label="Tugas Diselesaikan"
              value={statistik.tugasSelesai}
              unit="tugas"
              color="bg-emerald-500"
            />
          </div>
          <div className="reveal delay-300">
            <StatCard
              icon={Zap}
              label="Sesi Pomodoro"
              value={statistik.sesiPomodoro}
              unit="sesi"
              color="bg-amber-500"
            />
          </div>
          <div className="reveal delay-400">
            <StatCard
              icon={Target}
              label="Target Tercapai"
              value={statistik.targetTercapai}
              unit="%"
              color="bg-rose-500"
            />
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="reveal bg-white rounded-3xl p-8 border border-orange-100 shadow-sm hover:shadow-md transition-all fade-in-up delay-150">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-bold text-slate-900">📈 Durasi Fokus Harian (Jam)</h3>
            </div>
            <div className="h-[280px]">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>

          {/* Doughnut Chart */}
          <div className="reveal bg-white rounded-3xl p-8 border border-orange-100 shadow-sm hover:shadow-md transition-all fade-in-up delay-200">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-bold text-slate-900">🍩 Distribusi Status Tugas</h3>
            </div>
            <div className="h-[280px] flex items-center justify-center">
              <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
            </div>
          </div>

          {/* Line Chart */}
          <div className="reveal bg-white rounded-3xl p-8 border border-orange-100 shadow-sm hover:shadow-md transition-all fade-in-up delay-300">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-bold text-slate-900">📅 Tren Tugas Mingguan</h3>
            </div>
            <div className="h-[200px]">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>

          {/* Performance Summary */}
          <div className="reveal bg-white rounded-3xl p-8 border border-orange-100 shadow-sm hover:shadow-md transition-all fade-in-up delay-400">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-bold text-slate-900">✅ Performa Mingguan</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                <span className="text-sm font-medium text-slate-700">Hari On Track</span>
                <span className="text-xl font-bold text-orange-600">{performa.hariOnTrack}/7</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                <span className="text-sm font-medium text-slate-700">Rata-rata Tugas/Hari</span>
                <span className="text-xl font-bold text-emerald-600">{performa.rataRata}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
                <span className="text-sm font-medium text-slate-700">Efisiensi Belajar</span>
                <span className="text-xl font-bold text-amber-600">{performa.efisiensi}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Tip */}
        <div className="reveal mt-12 p-6 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-2xl border border-orange-100 fade-in-up delay-500">
          <p className="text-slate-700 text-sm">
            <span className="font-semibold">💡 Tips:</span> Pantau grafik ini setiap minggu untuk melihat pola pembelajaran Anda. Tingkatkan target fokus sebesar 10% setiap minggu untuk hasil optimal!
          </p>
        </div>
      </div>
    </section>
  );
}

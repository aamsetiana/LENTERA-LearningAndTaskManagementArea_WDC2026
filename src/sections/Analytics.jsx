import { BarChart3, PieChart, TrendingUp, Clock, CheckCircle2, Zap } from 'lucide-react';
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
  // Data untuk Bar Chart - Durasi Fokus Harian
  const barChartData = {
    labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    datasets: [
      {
        label: 'Jam Fokus',
        data: [2.5, 3.0, 1.5, 2.8, 4.0, 2.2, 1.0],
        backgroundColor: [
          'rgba(255, 139, 61, 0.8)',
          'rgba(255, 139, 61, 0.8)',
          'rgba(255, 139, 61, 0.8)',
          'rgba(255, 139, 61, 0.8)',
          'rgba(255, 165, 87, 0.9)',
          'rgba(255, 139, 61, 0.8)',
          'rgba(255, 139, 61, 0.8)',
        ],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 139, 61, 0.1)' },
        ticks: { color: '#64748b', font: { size: 12 } },
      },
      y: {
        grid: { color: 'rgba(255, 139, 61, 0.1)' },
        ticks: { color: '#64748b', font: { size: 12 } },
        beginAtZero: true,
      },
    },
  };

  // Data untuk Doughnut Chart - Distribusi Waktu Belajar
  const doughnutChartData = {
    labels: ['Basis Data', 'Algoritma', 'Jaringan', 'Matematika', 'Lainnya'],
    datasets: [
      {
        data: [35, 25, 20, 12, 8],
        backgroundColor: [
          '#FF8B3D',
          '#FFA557',
          '#FFB968',
          '#FFC97A',
          '#FFD98C',
        ],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
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

  // Data untuk Line Chart - Tren Tugas Mingguan
  const lineChartData = {
    labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    datasets: [
      {
        label: 'Tugas Selesai',
        data: [2, 4, 2, 5, 7, 3, 1],
        borderColor: '#FF8B3D',
        backgroundColor: 'rgba(255, 139, 61, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#FF8B3D',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Target',
        data: [4, 4, 4, 4, 4, 4, 4],
        borderColor: 'rgba(255, 139, 61, 0.3)',
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
      },
    ],
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
        grid: { color: 'rgba(255, 139, 61, 0.1)' },
        ticks: { color: '#64748b', font: { size: 12 } },
      },
      y: {
        grid: { color: 'rgba(255, 139, 61, 0.1)' },
        ticks: { color: '#64748b', font: { size: 12 } },
        beginAtZero: true,
      },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-orange-50/20 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 fade-in-up">
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
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="delay-100">
            <StatCard
              icon={Clock}
              label="Total Fokus Minggu Ini"
              value="18"
              unit="jam"
              color="bg-orange-500"
            />
          </div>
          <div className="delay-200">
            <StatCard
              icon={CheckCircle2}
              label="Tugas Diselesaikan"
              value="14"
              unit="tugas"
              color="bg-emerald-500"
            />
          </div>
          <div className="delay-300">
            <StatCard
              icon={Zap}
              label="Sesi Pomodoro"
              value="38"
              unit="sesi"
              color="bg-amber-500"
            />
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white rounded-3xl p-8 border border-orange-100 shadow-sm hover:shadow-md transition-all fade-in-up delay-150">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-bold text-slate-900">📈 Durasi Fokus Harian (Jam)</h3>
            </div>
            <div className="h-[280px]">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>

          {/* Doughnut Chart */}
          <div className="bg-white rounded-3xl p-8 border border-orange-100 shadow-sm hover:shadow-md transition-all fade-in-up delay-200">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-bold text-slate-900">🍩 Distribusi Waktu Belajar</h3>
            </div>
            <div className="h-[280px] flex items-center justify-center">
              <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
            </div>
          </div>

          {/* Line Chart */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-orange-100 shadow-sm hover:shadow-md transition-all fade-in-up delay-300">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-bold text-slate-900">📅 Tren Tugas Mingguan</h3>
            </div>
            <div className="h-[200px]">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>
        </div>

        {/* Footer Tip */}
        <div className="mt-12 p-6 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-2xl border border-orange-100 fade-in-up delay-400">
          <p className="text-slate-700 text-sm">
            <span className="font-semibold">💡 Tips:</span> Pantau grafik ini setiap minggu untuk melihat pola pembelajaran Anda. Tingkatkan target fokus sebesar 10% setiap minggu untuk hasil optimal!
          </p>
        </div>
      </div>
    </section>
  );
}

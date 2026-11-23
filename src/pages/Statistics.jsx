import {
  BookOpen,
  BookMarked,
  Star,
  Tags,
  Target,
  Clock,
  FileText,
  Gauge,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Sidebar } from "../components/Sidebar";
import "./Statistics.css";

// Monthly reading data (mock data)
const monthlyData = [
  { month: "ม.ค.", books: 0, pages: 0 },
  { month: "ก.พ.", books: 1, pages: 320 },
  { month: "มี.ค.", books: 0, pages: 0 },
  { month: "เม.ย.", books: 1, pages: 480 },
  { month: "พ.ค.", books: 0, pages: 0 },
  { month: "มิ.ย.", books: 1, pages: 350 },
  { month: "ก.ค.", books: 0, pages: 0 },
  { month: "ส.ค.", books: 1, pages: 600 },
  { month: "ก.ย.", books: 0, pages: 0 },
  { month: "ต.ค.", books: 1, pages: 422 },
  { month: "พ.ย.", books: 2, pages: 600 },
  { month: "ธ.ค.", books: 0, pages: 0 },
];

// Genre data (mock distribution)
const genreData = [
  { name: "นิยาย", value: 2 },
  { name: "ประวัติศาสตร์", value: 1 },
  { name: "พัฒนาตนเอง", value: 1 },
  { name: "นิยายวิทยาศาสตร์", value: 1 },
  { name: "ธุรกิจ", value: 1 },
];

const genreColors = ["#78917F", "#C9A96A", "#91A8A0", "#B2A3C7", "#D69C83"];

// Yearly data
const yearlyData = [
  { year: "2024", books: 2 },
  { year: "2025", books: 4 },
  { year: "2026", books: 6 },
];

const StatCard = ({ icon: Icon, title, value, subtitle }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-icon">
          <Icon size={20} />
        </span>
        <span className="stat-label">{title}</span>
      </div>

      <h2 className="stat-value">{value}</h2>
      <p className="stat-subtitle">{subtitle}</p>
    </div>
  );
};

export function Statistics() {
  return (
    <div className="layout">
      <Sidebar />

      <main className="main-content statistics-page">
        {/* Header */}
        <header className="statistics-header">
          <div>
            <h1>สถิติการอ่าน</h1>
            <p>วิเคราะห์พฤติกรรมการอ่านของคุณ</p>
          </div>

          <div className="year-select">
            <select defaultValue="2026">
              <option value="2026">ปี 2569</option>
              <option value="2025">ปี 2568</option>
              <option value="2024">ปี 2567</option>
            </select>
          </div>
        </header>

        {/* Overview Cards */}
        <section className="stats-overview">
          <StatCard
            icon={BookOpen}
            title="อ่านจบทั้งหมด"
            value="6 เล่ม"
            subtitle="หนังสือที่อ่านจบแล้ว"
          />

          <StatCard
            icon={BookMarked}
            title="หน้าที่อ่านทั้งหมด"
            value="2,772 หน้า"
            subtitle="จำนวนหน้าที่อ่านสะสม"
          />

          <StatCard
            icon={Star}
            title="คะแนนเฉลี่ย"
            value="4.5 / 5"
            subtitle="คะแนนจากหนังสือทั้งหมด"
          />

          <StatCard
            icon={Tags}
            title="ประเภทที่อ่านมากสุด"
            value="นิยาย"
            subtitle="2 เล่ม"
          />
        </section>

        {/* Monthly Reading Chart */}
        <section className="statistics-grid">
          <div className="statistics-card monthly-card">
            <div className="statistics-card-header">
              <div>
                <h3>รายเดือน ปี 2569</h3>
                <p>จำนวนหนังสือที่อ่านจบในแต่ละเดือน</p>
              </div>
            </div>

            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--border)"
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />

                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="books"
                    name="จำนวนเล่ม"
                    fill="#78917F"
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Genre Chart */}
          <div className="statistics-card genre-card">
            <div className="statistics-card-header">
              <div>
                <h3>ประเภทหนังสือที่อ่านจบ</h3>
                <p>สัดส่วนหนังสือในแต่ละหมวดหมู่</p>
              </div>
            </div>

            <div className="genre-chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genreData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={3}
                  >
                    {genreData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={genreColors[index % genreColors.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="genre-legend">
              {genreData.map((genre, index) => (
                <div className="genre-legend-item" key={genre.name}>
                  <span
                    className="genre-dot"
                    style={{
                      backgroundColor: genreColors[index],
                    }}
                  />
                  <span className="genre-name">{genre.name}</span>
                  <span className="genre-count">{genre.value} เล่ม</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Yearly Chart + Goal */}
        <section className="statistics-grid">
          <div className="statistics-card yearly-card">
            <div className="statistics-card-header">
              <div>
                <h3>สถิติรายปี</h3>
                <p>เปรียบเทียบจำนวนหนังสือที่อ่านจบในแต่ละปี</p>
              </div>
            </div>

            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--border)"
                  />

                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />

                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="books"
                    name="จำนวนเล่ม"
                    fill="#C9A96A"
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Reading Goal */}
          <div className="statistics-card goal-card">
            <div className="statistics-card-header">
              <div>
                <h3>เป้าหมายการอ่าน</h3>
                <p>เป้าหมายประจำปี 2569</p>
              </div>
              <Target size={20} />
            </div>

            <div className="goal-content">
              <div className="goal-circle" style={{ "--progress": "25%" }}>
                <div className="goal-circle-inner">
                  <strong>25%</strong>
                  <span>สำเร็จแล้ว</span>
                </div>
              </div>

              <div className="goal-details">
                <h2>
                  6 <span>/ 24 เล่ม</span>
                </h2>
                <p>อ่านจบแล้ว 6 เล่ม จากเป้าหมาย 24 เล่ม</p>

                <div className="goal-progress-track">
                  <div className="goal-progress-fill" />
                </div>

                <div className="goal-progress-label">
                  <span>ความคืบหน้า</span>
                  <span>25%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reading Session Stats */}
        <section className="session-section">
          <div className="session-section-header">
            <h3>สถิติ Reading Session</h3>
            <p>ภาพรวมการอ่านจาก Session ที่บันทึกไว้</p>
          </div>

          <div className="session-stats-grid">
            <StatCard
              icon={Clock}
              title="Session ทั้งหมด"
              value="4 ครั้ง"
              subtitle="จำนวนรอบการอ่าน"
            />

            <StatCard
              icon={Clock}
              title="เวลาอ่านรวม"
              value="2 ชม. 40 นาที"
              subtitle="เวลาที่ใช้ในการอ่านทั้งหมด"
            />

            <StatCard
              icon={FileText}
              title="หน้าที่อ่านจาก Session"
              value="112 หน้า"
              subtitle="จำนวนหน้าจาก Session"
            />

            <StatCard
              icon={Gauge}
              title="ความเร็วเฉลี่ย"
              value="42 หน้า/ชม."
              subtitle="อัตราการอ่านเฉลี่ย"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

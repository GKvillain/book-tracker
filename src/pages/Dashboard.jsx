import { Sidebar } from "../components/Sidebar";
import {
  BookOpen,
  BookMarked,
  Bookmark,
  Target,
  ArrowRight,
  Clock3,
  Star,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "./Dashboard.css";
import { initialBooks } from "../data/books";
const monthlyData = [
  { month: "ม.ค.", books: 0 },
  { month: "ก.พ.", books: 0 },
  { month: "มี.ค.", books: 1 },
  { month: "เม.ย.", books: 1 },
  { month: "พ.ค.", books: 0 },
  { month: "มิ.ย.", books: 1 },
  { month: "ก.ค.", books: 1 },
  { month: "ส.ค.", books: 0 },
  { month: "ก.ย.", books: 1 },
  { month: "ต.ค.", books: 0 },
  { month: "พ.ย.", books: 1 },
  { month: "ธ.ค.", books: 0 },
];

const stats = [
  {
    label: "หน้าที่อ่านทั้งหมด",
    value: "2,772",
    icon: BookOpen,
  },
  {
    label: "คะแนนเฉลี่ย",
    value: "4.5",
    suffix: "/ 5",
    icon: Star,
  },
  {
    label: "Reading Sessions",
    value: "4",
    icon: Clock3,
  },
];
const books = initialBooks;

function StatCard({ label, value, icon: Icon, suffix }) {
  return (
    <div className="dashboard-stat-card">
      <div className="dashboard-stat-icon">
        <Icon size={19} />
      </div>

      <div className="dashboard-stat-info">
        <p>{label}</p>
        <h3>
          {value}
          {suffix && <span>{suffix}</span>}
        </h3>
      </div>
    </div>
  );
}

// Helper สำหรับคำนวณ Progress
function getProgress(currentPage, totalPages) {
  return Math.round((currentPage / totalPages) * 100);
}

export function Dashboard() {
  const totalBooks = 12;
  const readingBooks = 2;
  const completedBooks = 6;
  const wantToRead = 2;

  const annualGoal = 24;
  const remaining = annualGoal - completedBooks;
  const goalPercentage = Math.round((completedBooks / annualGoal) * 100);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div>
            <p className="dashboard-greeting">สวัสดี นักอ่าน 👋</p>
            <h1>ภาพรวมการอ่านของคุณ</h1>
            <p className="dashboard-subtitle">
              มาดูกันว่าปีนี้คุณเดินทางไปกับหนังสือมากแค่ไหน
            </p>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="dashboard-summary-grid">
          <StatCard label="หนังสือทั้งหมด" value={totalBooks} icon={BookOpen} />
          <StatCard label="กำลังอ่าน" value={readingBooks} icon={BookMarked} />
          <StatCard
            label="อ่านจบแล้ว"
            value={completedBooks}
            icon={TrendingUp}
          />
          <StatCard label="อยากอ่าน" value={wantToRead} icon={Bookmark} />
        </section>

        {/* Annual Goal */}
        <section className="dashboard-goal-card">
          <div className="dashboard-goal-top">
            <div className="dashboard-goal-title">
              <div className="dashboard-goal-icon">
                <Target size={20} />
              </div>
              <div>
                <h2>เป้าหมายปี 2569</h2>
                <p>Reading Challenge</p>
              </div>
            </div>

            <button className="dashboard-edit-btn">แก้ไข</button>
          </div>

          <div className="dashboard-goal-content">
            <div className="dashboard-goal-progress">
              <div
                className="dashboard-goal-circle"
                style={{
                  "--goal-progress": `${goalPercentage}%`,
                }}
              >
                <div className="dashboard-goal-circle-inner">
                  <strong>{goalPercentage}%</strong>
                  <span>สำเร็จ</span>
                </div>
              </div>
            </div>

            <div className="dashboard-goal-details">
              <div className="goal-detail-item">
                <span>อ่านจบแล้ว</span>
                <strong>
                  {completedBooks} <small>/ {annualGoal} เล่ม</small>
                </strong>
              </div>

              <div className="goal-detail-item">
                <span>เหลืออีก</span>
                <strong>{remaining} เล่ม</strong>
              </div>

              <div className="goal-progress-track">
                <div
                  className="goal-progress-fill"
                  style={{ width: `${goalPercentage}%` }}
                />
              </div>

              <p className="goal-motivation">
                <TrendingUp size={15} />
                ช้ากว่าแผน 16 เล่ม — สู้ ๆ นะ
              </p>
            </div>
          </div>
        </section>

        {/* Currently Reading */}
        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <div>
              <h2>กำลังอ่าน</h2>
              <p>หนังสือที่คุณกำลังอ่านอยู่ในตอนนี้</p>
            </div>

            <button className="dashboard-view-all">
              ดูทั้งหมด <ArrowRight size={15} />
            </button>
          </div>

          <div className="currently-reading-grid">
            {books.map((book) => (
              <article className="reading-book-card" key={book.id}>
                <img src={book.cover} alt={book.title} />

                <div className="reading-book-info">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>

                  <div className="reading-page-info">
                    <span>
                      หน้า {book.currentPage} / {book.totalPages}
                    </span>
                    <strong>
                      {getProgress(book.currentPage, book.totalPages)}%
                    </strong>
                  </div>

                  <div className="reading-progress-track">
                    <div
                      className="reading-progress-fill"
                      style={{
                        width: `${getProgress(book.currentPage, book.totalPages)}%`,
                      }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Monthly Chart + Stats */}
        <section className="dashboard-analytics-grid">
          <div className="dashboard-chart-card">
            <div className="dashboard-section-header">
              <div>
                <h2>หนังสือที่อ่านจบรายเดือน</h2>
                <p>จำนวนหนังสือที่อ่านจบในปี 2569</p>
              </div>

              <button className="dashboard-view-all">
                สถิติทั้งหมด <ArrowRight size={15} />
              </button>
            </div>

            <div className="dashboard-chart">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={monthlyData}
                  margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e9e7df"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#888980" }}
                  />
                  <YAxis
                    domain={[0, 4]}
                    ticks={[0, 1, 2, 3, 4]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#888980" }}
                  />
                  <Tooltip
                    cursor={{ fill: "#f0f1e9" }}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #e8e7df",
                      fontSize: 13,
                    }}
                    formatter={(value) => [`${value} เล่ม`, "อ่านจบ"]}
                  />
                  <Bar
                    dataKey="books"
                    fill="#80977B"
                    radius={[5, 5, 0, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="dashboard-stats-panel">
            <div className="dashboard-section-header">
              <div>
                <h2>สถิติการอ่าน</h2>
                <p>ภาพรวมพฤติกรรมการอ่าน</p>
              </div>
            </div>

            <div className="dashboard-stats-list">
              {stats.map((stat) => (
                <StatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  icon={stat.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <div>
              <h2>อัปเดตล่าสุด</h2>
              <p>หนังสือที่คุณอ่านหรืออัปเดตเมื่อเร็ว ๆ นี้</p>
            </div>
          </div>

          <div className="recent-activity-list">
            {books.map((book) => (
              <article className="recent-activity-item" key={book.id}>
                <img src={book.cover} alt={book.title} />

                <div className="recent-activity-info">
                  <h3>{book.title}</h3>

                  <div className="recent-activity-progress">
                    <div className="recent-progress-track">
                      <div
                        className="recent-progress-fill"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                    <span>{book.progress}%</span>
                  </div>
                </div>

                <span className="recent-activity-date">{book.date}</span>
              </article>
            ))}
          </div>
        </section>

        {/* Recently Added */}
        <section className="dashboard-section recently-added-section">
          <div className="dashboard-section-header">
            <div>
              <h2>เพิ่มเข้ามาล่าสุด</h2>
              <p>หนังสือในคลังของคุณ</p>
            </div>

            <button className="dashboard-view-all">
              ดูทั้งหมด <ArrowRight size={15} />
            </button>
          </div>

          <div className="recently-added-grid">
            {books.map((book) => (
              <article className="recently-added-card" key={book.id}>
                <div className="recently-added-cover">
                  <img src={book.cover} alt={book.title} />
                  <span
                    className={`book-status ${book.status === "อ่านจบแล้ว" ? "status-completed" : book.status === "กำลังอ่าน" ? "status-reading" : "status-wishlist"}`}
                  >
                    {book.status}
                  </span>
                </div>

                <div className="recently-added-info">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;

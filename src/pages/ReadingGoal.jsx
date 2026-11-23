import { useState } from "react";
import { Target, BookOpen, Flag, CalendarDays } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import "./ReadingGoal.css";

const completedBooks = [
  {
    id: 6,
    title: "Atomic Habits",
    date: "22 ก.ย. 2569",
    cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  },
  {
    id: 5,
    title: "Deep Work",
    date: "20 ก.ค. 2569",
    cover: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
  },
  {
    id: 4,
    title: "The Psychology of Money",
    date: "1 มิ.ย. 2569",
    cover: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
  },
  {
    id: 3,
    title: "Ikigai",
    date: "3 เม.ย. 2569",
    cover: "https://covers.openlibrary.org/b/isbn/9781786330895-L.jpg",
  },
  {
    id: 2,
    title: "Rich Dad Poor Dad",
    date: "5 มี.ค. 2569",
    cover: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg",
  },
];

const currentYear = 2026;
const completed = 6;
const currentMonth = 11; // November

export function ReadingGoal() {
  const [goal, setGoal] = useState(24);
  const percentage = Math.min(Math.round((completed / goal) * 100), 100);
  const remaining = Math.max(goal - completed, 0);

  const expectedBooks = Math.floor((goal / 12) * currentMonth);
  const behind = Math.max(expectedBooks - completed, 0);

  const monthlyTarget = (goal / 12).toFixed(1);

  return (
    <div className="layout">
      <Sidebar />

      <main className="main-content reading-goal-page">
        {/* Header */}
        <header className="goal-page-header">
          <div>
            <h1>เป้าหมายการอ่าน</h1>
            <p>ตั้งเป้าและติดตามความสำเร็จตลอดทั้งปี</p>
          </div>
        </header>

        {/* Main Goal Card */}
        <section className="annual-goal-card">
          <div className="annual-goal-top">
            <div className="annual-goal-title">
              <div className="goal-icon">
                <Target size={22} />
              </div>
              <div>
                <span>เป้าหมายประจำปี</span>
                <h2>ปี {currentYear + 543}</h2>
              </div>
            </div>

            <span className="goal-percent">{percentage}%</span>
          </div>

          <div className="annual-progress-track">
            <div
              className="annual-progress-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="annual-progress-label">
            <span>ความคืบหน้า</span>
            <span>
              {completed} / {goal} เล่ม
            </span>
          </div>

          <div className="annual-goal-stats">
            <div>
              <span>อ่านจบแล้ว</span>
              <strong>{completed}</strong>
              <small>เล่ม</small>
            </div>

            <div>
              <span>เป้าหมาย</span>
              <strong>{goal}</strong>
              <small>เล่ม</small>
            </div>

            <div>
              <span>เหลืออีก</span>
              <strong>{remaining}</strong>
              <small>เล่ม</small>
            </div>
          </div>
        </section>

        {/* Pace Tracking */}
        <section className="pace-card">
          <div className="pace-card-header">
            <div className="pace-icon">
              <CalendarDays size={20} />
            </div>
            <div>
              <h3>Reading Pace</h3>
              <p>เปรียบเทียบความคืบหน้ากับแผนการอ่าน</p>
            </div>
          </div>

          <div className="pace-comparison">
            <div className="pace-item">
              <span>อ่านจบแล้ว</span>
              <strong>
                {completed} <small>เล่ม</small>
              </strong>
            </div>

            <div className="pace-divider" />

            <div className="pace-item">
              <span>ควรอ่านถึงตอนนี้</span>
              <strong>
                {expectedBooks} <small>เล่ม</small>
              </strong>
            </div>
          </div>

          <div className={`pace-status ${behind > 0 ? "behind" : "on-track"}`}>
            {behind > 0 ? (
              <>
                <strong>ช้ากว่าแผน {behind} เล่ม</strong>
                <span>เหลือเวลาอีกประมาณ 6 สัปดาห์</span>
              </>
            ) : (
              <>
                <strong>คุณกำลังทำได้ตามแผน!</strong>
                <span>รักษาความสม่ำเสมอในการอ่านต่อไป</span>
              </>
            )}
          </div>
        </section>

        {/* Goal Settings */}
        <section className="goal-setting-card">
          <div className="goal-setting-header">
            <div className="goal-icon">
              <Flag size={20} />
            </div>
            <div>
              <h3>ตั้งเป้าหมายปี {currentYear + 543}</h3>
              <p>ปรับจำนวนหนังสือที่ต้องการอ่านให้สำเร็จในปีนี้</p>
            </div>
          </div>

          <div className="goal-setting-form">
            <label htmlFor="annualGoal">จำนวนหนังสือเป้าหมาย</label>

            <div className="goal-input-row">
              <input
                id="annualGoal"
                type="number"
                min="1"
                value={goal}
                onChange={(e) =>
                  setGoal(Math.max(1, Number(e.target.value) || 1))
                }
              />

              <span>เล่ม / ปี</span>
            </div>

            <p className="monthly-target">
              <BookOpen size={16} />
              ประมาณ {monthlyTarget} เล่มต่อเดือน
            </p>
          </div>
        </section>

        {/* Completed Books */}
        <section className="completed-books-section">
          <div className="section-header">
            <h2>หนังสือที่อ่านจบแล้ว</h2>
            <span>{completedBooks.length} เล่ม</span>
          </div>

          <div className="completed-books-grid">
            {completedBooks.map((book) => (
              <div className="completed-book-card" key={book.id}>
                <img
                  src={book.cover}
                  alt={book.title}
                  className="completed-book-cover"
                />

                <div className="completed-book-info">
                  <h3>{book.title}</h3>
                  <p>{book.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

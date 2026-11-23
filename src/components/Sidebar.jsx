import {
  BookOpen,
  LayoutDashboard,
  Library,
  Heart,
  BookMarked,
  ChartNoAxesCombined,
  Target,
  Plus,
  Quote,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import "./Sidebar.css";

export function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="top-sidebar">
        <div className="brand-icon">
          <BookOpen size={26} />
        </div>

        <div className="brand-text">
          <h2>ชั้นหนังสือ</h2>
          <p>Book Tracker</p>
        </div>
      </div>

      {/* Add Book Button */}
      <button className="add-book">
        <Plus size={18} />
        <span>เพิ่มหนังสือ</span>
      </button>

      {/* Navigation */}
      <div className="inside-sidebar">
        <nav className="sidebar-nav">
          <NavLink to="/">
            <LayoutDashboard size={18} />
            <span>ภาพรวม</span>
          </NavLink>

          <NavLink to="/library">
            <Library size={18} />
            <span>คลังหนังสือ</span>
          </NavLink>

          <NavLink to="/wishlist">
            <Heart size={18} />
            <span>อยากอ่าน</span>
          </NavLink>

          <NavLink to="/booktrack">
            <BookMarked size={18} />
            <span>บันทึกการอ่าน</span>
          </NavLink>

          <NavLink to="/statistics">
            <ChartNoAxesCombined size={18} />
            <span>สถิติ</span>
          </NavLink>

          <NavLink to="/readinggoal">
            <Target size={18} />
            <span>เป้าหมาย</span>
          </NavLink>
        </nav>

        {/* Quote */}
        <div className="sidebar-quote">
          <Quote size={18} />
          <p>“ห้องที่ไม่มีหนังสือ ก็เหมือนร่างกายที่ไม่มีวิญญาณ”</p>
          <span>— Cicero</span>
        </div>
      </div>
    </aside>
  );
}

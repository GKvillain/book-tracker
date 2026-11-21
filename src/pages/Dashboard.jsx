import { Sidebar } from "../components/Sidebar";
import "./Dashboard.css";

export function Dashboard() {
  return (
    <div className="container">
      <Sidebar />
      <div className="dashboard">
        <h1>สวัสดีนักอ่าน</h1>
        <p>ภาพรวมการอ่านของคุณในปีนี้</p>
        <div className="contain-cards">
          <div className="info-card">
            <div className="icon">icon</div>
            <h4>12</h4>
            <p>หนังสือทั้งหมด</p>
          </div>
          <div className="info-card">
            <div className="icon">icon</div>
            <h4>2</h4>
            <p>การอ่าน</p>
          </div>
          <div className="info-card">
            <div className="icon">icon</div>
            <h4>6</h4>
            <p>อ่านจบแล้ว</p>
          </div>
          <div className="info-card">
            <div className="icon">icon</div>
            <h4>2</h4>
            <p>อยากอ่าน</p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

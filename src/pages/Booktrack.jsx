import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import "./Booktrack.css";
import { initialBooks } from "../data/books";

const mockNotes = [
  {
    id: 1,
    bookId: 1,
    category: "ข้อคิด",
    page: "24",
    content:
      "การเปลี่ยนแปลงเล็ก ๆ ที่ทำอย่างสม่ำเสมอ สามารถสร้างผลลัพธ์ที่ยิ่งใหญ่ได้ในระยะยาว ไม่จำเป็นต้องเปลี่ยนทุกอย่างในวันเดียว แค่เริ่มจากสิ่งเล็ก ๆ และทำมันให้ดีขึ้นในทุกวัน",
    createdAt: "2026-11-18T09:30:00",
  },
  {
    id: 2,
    bookId: 2,
    category: "คำคม",
    page: "67",
    content: "Clarity about what matters provides clarity about what does not.",
    createdAt: "2026-11-20T14:15:00",
  },
  {
    id: 3,
    bookId: 1,
    category: "บันทึก",
    page: "42",
    content:
      "อยากลองนำแนวคิด Habit Stacking มาใช้กับชีวิตประจำวัน โดยเริ่มจากการอ่านหนังสือ 10 นาทีหลังจากกินอาหารเช้า และฝึกเขียนสรุปสิ่งที่ได้เรียนรู้ก่อนนอน",
    createdAt: "2026-11-20T20:00:00",
  },
  {
    id: 4,
    bookId: 3,
    category: "ข้อคิด",
    page: "103",
    content:
      "การมีเงินไม่ได้หมายความว่าจะต้องใช้เงินเพื่อแสดงให้คนอื่นเห็นว่าเรามี แต่ความมั่งคั่งที่แท้จริงคือการมีอิสระในการเลือกใช้ชีวิตและเวลา",
    createdAt: "2026-11-21T11:45:00",
  },
  {
    id: 5,
    bookId: 2,
    category: "บันทึก",
    page: "91",
    content:
      "Deep Work ทำให้เห็นว่าการทำงานหลายอย่างพร้อมกันอาจทำให้เรารู้สึกยุ่ง แต่ไม่ได้หมายความว่าเราจะทำงานได้มีประสิทธิภาพมากขึ้น ควรจัดเวลาให้มีช่วงที่โฟกัสงานเดียวอย่างจริงจัง",
    createdAt: "2026-11-21T16:20:00",
  },
  {
    id: 6,
    bookId: 3,
    category: "คำคม",
    page: "56",
    content:
      "Spending money to show people how much money you have is the fastest way to have less money.",
    createdAt: "2026-11-22T08:10:00",
  },
];

const noteCategories = ["บันทึก", "คำคม", "ข้อคิด"];
const books = initialBooks;
const filters = ["ทั้งหมด", ...noteCategories];

export function Booktrack() {
  const [bookId, setBookId] = useState(books[0].id);
  const [category, setCategory] = useState("บันทึก");
  const [activeFilter, setActiveFilter] = useState("ทั้งหมด");
  const [page, setPage] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState(mockNotes);

  const handleAddNote = () => {
    if (!content.trim()) {
      alert("กรุณาเขียนบันทึกก่อน");
      return;
    }

    const newNote = {
      id: Date.now(),
      bookId,
      category,
      page,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);

    setPage("");
    setContent("");
    setCategory("บันทึก");
  };

  const handleDeleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  const filteredNotes = notes.filter((note) => {
    return activeFilter === "ทั้งหมด" || note.category === activeFilter;
  });

  const getBookTitle = (id) => {
    return books.find((book) => book.id === id)?.title || "ไม่พบหนังสือ";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="layout">
      <Sidebar />

      <main className="main-content booktrack-page">
        {/* Page Header */}
        <div className="topic-header">
          <h1>บันทึกการอ่าน</h1>
          <p>บันทึก คำคม และข้อคิดจากหนังสือที่คุณอ่าน</p>
        </div>

        {/* Note Form */}
        <div className="note">
          <h4>เขียนบันทึกใหม่</h4>

          <div className="section-note">
            {/* Book Selection */}
            <div>
              <label>หนังสือ</label>
              <select
                value={bookId}
                onChange={(e) => setBookId(Number(e.target.value))}
              >
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Selection */}
            <div>
              <label>ประเภท</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {noteCategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Page Number */}
            <div>
              <label>หน้า (ไม่บังคับ)</label>
              <input
                type="number"
                min="1"
                placeholder="ระบุเลขหน้า"
                value={page}
                onChange={(e) => setPage(e.target.value)}
              />
            </div>
          </div>

          {/* Note Content */}
          <textarea
            placeholder="เขียนความคิดของคุณ..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button onClick={handleAddNote}>เพิ่มบันทึก</button>
        </div>

        {/* Note Filter */}
        <div className="notes-section">
          <div className="notes-header">
            <h3>บันทึกของฉัน</h3>
            <span>{filteredNotes.length} รายการ</span>
          </div>

          <div className="category-filter">
            {filters.map((item) => (
              <button
                key={item}
                className={activeFilter === item ? "active" : ""}
                onClick={() => setActiveFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Notes List */}
          <div className="notes-list">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <article className="card-note" key={note.id}>
                  <div className="card-note-header">
                    <div>
                      <span className={`note-badge ${note.category}`}>
                        {note.category}
                      </span>
                      <h4>{getBookTitle(note.bookId)}</h4>
                    </div>

                    <button
                      className="delete-note"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      ลบ
                    </button>
                  </div>

                  {note.page && (
                    <span className="note-page">หน้า {note.page}</span>
                  )}

                  <p className="note-content">{note.content}</p>

                  <span className="note-date">
                    {formatDate(note.createdAt)}
                  </span>
                </article>
              ))
            ) : (
              <div className="empty-notes">
                <h4>ยังไม่มีบันทึก</h4>
                <p>
                  {activeFilter === "ทั้งหมด"
                    ? "เริ่มบันทึกสิ่งที่คุณได้เรียนรู้จากหนังสือ"
                    : `ยังไม่มีบันทึกประเภท "${activeFilter}"`}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

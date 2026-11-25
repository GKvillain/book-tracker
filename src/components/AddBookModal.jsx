import { useState } from "react";
import { X } from "lucide-react";
import "./AddBookModal.css";

const genres = [
  "นิยาย",
  "นิยายวิทยาศาสตร์",
  "แฟนตาซี",
  "พัฒนาตนเอง",
  "ธุรกิจ",
  "จิตวิทยา",
  "ประวัติศาสตร์",
  "ปรัชญา",
];

const statuses = ["อยากอ่าน", "กำลังอ่าน", "อ่านจบแล้ว", "พักไว้", "อ่านไม่จบ"];

const initialForm = {
  title: "",
  author: "",
  cover: "",
  genre: "นิยาย",
  status: "อยากอ่าน",
  totalPages: "",
  currentPage: 0,
  rating: 0,
};

// กำหนดค่าเริ่มต้นตามโหมด Add หรือ Edit
function getInitialForm(mode, initialBook) {
  if (mode === "edit" && initialBook) {
    return {
      title: initialBook.title ?? "",
      author: initialBook.author ?? "",
      cover: initialBook.cover ?? "",
      genre: initialBook.genre ?? "นิยาย",
      status: initialBook.status ?? "อยากอ่าน",
      totalPages: initialBook.totalPages ?? "",
      currentPage: initialBook.currentPage ?? 0,
      rating: initialBook.rating ?? 0,
    };
  }

  return { ...initialForm };
}

export function AddBookModal({
  onClose,
  onSubmit,
  mode = "add",
  initialBook = null,
}) {
  const [formData, setFormData] = useState(() =>
    getInitialForm(mode, initialBook),
  );

  const [error, setError] = useState("");

  // จัดการการเปลี่ยนแปลงข้อมูลใน Form
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  }

  // ตรวจสอบข้อมูลและส่งข้อมูลกลับไปยัง Library
  function handleSubmit(event) {
    event.preventDefault();

    const totalPages = Number(formData.totalPages);
    const currentPage = Number(formData.currentPage);

    // ตรวจสอบชื่อหนังสือและผู้เขียน
    if (!formData.title.trim() || !formData.author.trim()) {
      setError("กรุณากรอกชื่อหนังสือและชื่อผู้เขียน");
      return;
    }

    // ตรวจสอบจำนวนหน้าทั้งหมด
    if (!Number.isInteger(totalPages) || totalPages <= 0) {
      setError("จำนวนหน้าต้องเป็นจำนวนเต็มที่มากกว่า 0");
      return;
    }

    // ตรวจสอบหน้าที่อ่านแล้ว
    if (
      !Number.isInteger(currentPage) ||
      currentPage < 0 ||
      currentPage > totalPages
    ) {
      setError("หน้าที่อ่านต้องอยู่ระหว่าง 0 ถึงจำนวนหน้าทั้งหมด");
      return;
    }

    // ตรวจสอบสถานะอ่านจบแล้ว
    const isCompleted = formData.status === "อ่านจบแล้ว";

    if (isCompleted && currentPage !== totalPages) {
      setError("หนังสือที่อ่านจบแล้วต้องมีหน้าที่อ่านเท่ากับจำนวนหน้าทั้งหมด");
      return;
    }

    // เตรียมข้อมูลสำหรับส่งกลับไปยัง Library
    const bookData = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      cover: formData.cover.trim(),
      genre: formData.genre,
      status: formData.status,
      totalPages,
      currentPage: isCompleted ? totalPages : currentPage,
      rating: Number(formData.rating) || 0,
      completedAt: isCompleted
        ? (initialBook?.completedAt ?? new Date().toISOString())
        : null,
    };

    onSubmit(bookData);
  }

  return (
    <div
      className="add-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="add-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-modal-title"
      >
        {/* Modal Header */}
        <div className="add-modal-header">
          <div>
            <h2 id="add-modal-title">
              {mode === "edit" ? "แก้ไขข้อมูลหนังสือ" : "เพิ่มหนังสือใหม่"}
            </h2>

            <p>
              {mode === "edit"
                ? "แก้ไขรายละเอียดหนังสือในคลังของคุณ"
                : "กรอกข้อมูลหนังสือที่ต้องการเพิ่มลงในคลัง"}
            </p>
          </div>

          <button
            type="button"
            className="add-modal-close"
            onClick={onClose}
            aria-label="ปิดหน้าต่าง"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          <div className="add-modal-body">
            {/* Book Title */}
            <div className="form-group">
              <label htmlFor="title">
                ชื่อหนังสือ <span>*</span>
              </label>

              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="กรอกชื่อหนังสือ"
                required
              />
            </div>

            {/* Author */}
            <div className="form-group">
              <label htmlFor="author">
                ผู้เขียน <span>*</span>
              </label>

              <input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="กรอกชื่อผู้เขียน"
                required
              />
            </div>

            {/* Book Cover */}
            <div className="form-group">
              <label htmlFor="cover">URL รูปปกหนังสือ</label>

              <input
                id="cover"
                name="cover"
                type="url"
                value={formData.cover}
                onChange={handleChange}
                placeholder="https://example.com/book-cover.jpg"
              />
            </div>

            {/* Genre and Status */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="genre">ประเภทหนังสือ</label>

                <select
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                >
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">สถานะ</label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Total Pages */}
            <div className="form-group">
              <label htmlFor="totalPages">จำนวนหน้าทั้งหมด</label>

              <input
                id="totalPages"
                name="totalPages"
                type="number"
                min="1"
                step="1"
                value={formData.totalPages}
                onChange={handleChange}
                placeholder="เช่น 320"
                required
              />
            </div>

            {/* Current Page - Edit Mode Only */}
            {mode === "edit" && (
              <div className="form-group">
                <label htmlFor="currentPage">หน้าที่อ่านแล้ว</label>

                <input
                  id="currentPage"
                  name="currentPage"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.currentPage}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <p className="add-modal-error" role="alert">
                {error}
              </p>
            )}
          </div>

          {/* Modal Footer */}
          <div className="add-modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              ยกเลิก
            </button>

            <button type="submit" className="submit-btn">
              {mode === "edit" ? "บันทึกการแก้ไข" : "เพิ่มหนังสือ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

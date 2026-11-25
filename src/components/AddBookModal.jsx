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

export function AddBookModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const totalPages = Number(formData.totalPages);

    if (!formData.title.trim() || !formData.author.trim()) {
      setError("กรุณากรอกชื่อหนังสือและชื่อผู้เขียน");
      return;
    }

    if (!Number.isInteger(totalPages) || totalPages <= 0) {
      setError("จำนวนหน้าต้องเป็นจำนวนเต็มที่มากกว่า 0");
      return;
    }

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      author: formData.author.trim(),
      cover: formData.cover.trim(),
      totalPages,
      currentPage: formData.status === "อ่านจบแล้ว" ? totalPages : 0,
      rating: 0,
      completedAt:
        formData.status === "อ่านจบแล้ว" ? new Date().toISOString() : null,
    });
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
        <div className="add-modal-header">
          <div>
            <h2 id="add-modal-title">เพิ่มหนังสือใหม่</h2>
            <p>กรอกข้อมูลหนังสือที่ต้องการเพิ่มลงในคลัง</p>
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

        <form onSubmit={handleSubmit}>
          <div className="add-modal-body">
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

            {error && (
              <p className="add-modal-error" role="alert">
                {error}
              </p>
            )}
          </div>

          <div className="add-modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              ยกเลิก
            </button>

            <button type="submit" className="submit-btn">
              เพิ่มหนังสือ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

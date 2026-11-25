import { useState } from "react";
import { Search, LayoutGrid, List, Plus, Star, Pencil } from "lucide-react";

import { Sidebar } from "../components/Sidebar";
import { AddBookModal } from "../components/AddBookModal";
import { useBooks } from "../context/BookContext";

import "./Library.css";

const filters = [
  "ทั้งหมด",
  "กำลังอ่าน",
  "อยากอ่าน",
  "อ่านจบแล้ว",
  "พักไว้",
  "อ่านไม่จบ",
];

const categories = [
  "ทุกประเภท",
  "นิยาย",
  "นิยายวิทยาศาสตร์",
  "แฟนตาซี",
  "พัฒนาตนเอง",
  "ธุรกิจ",
  "จิตวิทยา",
  "ประวัติศาสตร์",
  "ปรัชญา",
];

// คำนวณความคืบหน้าจากหน้าปัจจุบันและจำนวนหน้าทั้งหมด
function calculateProgress(book) {
  if (!book.totalPages || book.totalPages <= 0) {
    return 0;
  }

  return Math.round((book.currentPage / book.totalPages) * 100);
}

export function Library() {
  // รับข้อมูลและ Functions จาก BookContext
  const { books, addBook, updateBook } = useBooks();

  // UI States
  const [activeFilter, setActiveFilter] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("ทุกประเภท");
  const [sortBy, setSortBy] = useState("recentlyAdded");
  const [viewMode, setViewMode] = useState("grid");

  // Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Edit Modal State
  const [selectedBook, setSelectedBook] = useState(null);

  // CREATE
  function handleAddBook(bookData) {
    addBook(bookData);
    setIsAddModalOpen(false);
  }

  // OPEN EDIT MODAL
  function handleOpenEdit(book) {
    setSelectedBook(book);
  }

  // CLOSE EDIT MODAL
  function handleCloseEdit() {
    setSelectedBook(null);
  }

  // UPDATE
  function handleEditBook(bookData) {
    if (!selectedBook) return;

    updateBook(selectedBook.id, bookData);
    setSelectedBook(null);
  }

  // Filter and Sort Books
  const filteredBooks = books
    .filter((book) => {
      const matchesStatus =
        activeFilter === "ทั้งหมด" || book.status === activeFilter;

      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        category === "ทุกประเภท" || book.genre === category;

      return matchesStatus && matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);

        case "highestRating":
          return b.rating - a.rating;

        case "highestProgress":
          return calculateProgress(b) - calculateProgress(a);

        case "recentlyAdded":
        default:
          return new Date(b.addedAt) - new Date(a.addedAt);
      }
    });

  return (
    <div className="layout">
      <Sidebar />

      <main className="main-content">
        {/* Page Header */}
        <div className="topic">
          <div className="topic-header">
            <h1>คลังหนังสือ</h1>
            <p>หนังสือทั้งหมดของคุณ ค้นหา กรอง และเรียงลำดับได้ตามต้องการ</p>
          </div>

          <button
            className="add-book-btn"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={18} />
            เพิ่มหนังสือ
          </button>
        </div>

        {/* Status Filters */}
        <div className="book-filter">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "active" : ""}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="library-toolbar">
          <div className="search-bar">
            <Search size={18} strokeWidth={1.8} />

            <input
              type="text"
              placeholder="ค้นหาชื่อหนังสือหรือผู้เขียน..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="toolbar-controls">
            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Sorting */}
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recentlyAdded">วันที่เพิ่มล่าสุด</option>
              <option value="title">ชื่อหนังสือ A-Z</option>
              <option value="highestRating">คะแนนสูงสุด</option>
              <option value="highestProgress">ความคืบหน้ามากสุด</option>
            </select>

            {/* View Toggle */}
            <div className="view-toggle">
              <button
                className={viewMode === "grid" ? "active" : ""}
                onClick={() => setViewMode("grid")}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>

              <button
                className={viewMode === "list" ? "active" : ""}
                onClick={() => setViewMode("list")}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Book Count */}
        <p className="book-count">หนังสือทั้งหมด {filteredBooks.length} เล่ม</p>

        {/* Book Container */}
        <div className={`book-container ${viewMode}`}>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => {
              const progress = calculateProgress(book);

              return (
                <div className="book-card" key={book.id}>
                  {/* Book Cover */}
                  {book.cover ? (
                    <img
                      className="book-cover"
                      src={book.cover}
                      alt={`ปกหนังสือ ${book.title}`}
                    />
                  ) : (
                    <div className="book-cover book-cover-placeholder">
                      ไม่มีรูปปก
                    </div>
                  )}

                  <div className="book-info">
                    {/* Status */}
                    <span className="book-status" data-status={book.status}>
                      {book.status}
                    </span>

                    {/* Book Details */}
                    <h3>{book.title}</h3>
                    <p className="book-author">{book.author}</p>
                    <p className="book-genre">{book.genre}</p>

                    {/* Progress */}
                    <div className="progress-section">
                      <div className="progress-info">
                        <span>ความคืบหน้า</span>
                        <span>{progress}%</span>
                      </div>

                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Rating */}
                    {book.rating > 0 && (
                      <div className="book-rating">
                        <Star size={15} fill="currentColor" />
                        <span>{book.rating}/5</span>
                      </div>
                    )}

                    {/* Book Actions */}
                    <div className="book-actions">
                      <button
                        type="button"
                        className="edit-book-btn"
                        onClick={() => handleOpenEdit(book)}
                      >
                        <Pencil size={15} />
                        แก้ไข
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              <h3>ไม่พบหนังสือ</h3>
              <p>ลองเปลี่ยนคำค้นหา หรือเลือกตัวกรองอื่น</p>
            </div>
          )}
        </div>

        {/* Add Book Modal */}
        {isAddModalOpen && (
          <AddBookModal
            key="add-book"
            mode="add"
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAddBook}
          />
        )}

        {/* Edit Book Modal */}
        {selectedBook && (
          <AddBookModal
            key={selectedBook.id}
            mode="edit"
            initialBook={selectedBook}
            onClose={handleCloseEdit}
            onSubmit={handleEditBook}
          />
        )}
      </main>
    </div>
  );
}

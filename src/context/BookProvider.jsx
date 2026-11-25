import { useEffect, useState } from "react";
import { initialBooks } from "../data/books";
import { BookContext } from "./BookContext";

const STORAGE_KEY = "booktrack_books";

export function BookProvider({ children }) {
  const [books, setBooks] = useState(() => {
    try {
      const savedBooks = localStorage.getItem(STORAGE_KEY);

      return savedBooks !== null ? JSON.parse(savedBooks) : initialBooks;
    } catch (error) {
      console.error("Failed to load books:", error);
      return initialBooks;
    }
  });

  // Save books to LocalStorage whenever books change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch (error) {
      console.error("Failed to save books:", error);
    }
  }, [books]);

  // CREATE
  function addBook(bookData) {
    const newBook = {
      ...bookData,
      id: crypto.randomUUID(),
      currentPage: bookData.currentPage ?? 0,
      rating: bookData.rating ?? 0,
      addedAt: bookData.addedAt ?? new Date().toISOString(),
      completedAt: bookData.completedAt ?? null,
    };

    setBooks((prevBooks) => [...prevBooks, newBook]);

    return newBook;
  }

  // UPDATE
  function updateBook(bookId, updatedData) {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, ...updatedData } : book,
      ),
    );
  }

  // DELETE
  function deleteBook(bookId) {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  }

  // READ
  function getBookById(bookId) {
    return books.find((book) => book.id === bookId);
  }

  // UPDATE STATUS
  function updateStatus(bookId, newStatus) {
    const book = getBookById(bookId);

    if (!book) return;

    const isCompleted = newStatus === "อ่านจบแล้ว";

    updateBook(bookId, {
      status: newStatus,
      currentPage: isCompleted ? book.totalPages : book.currentPage,
      completedAt: isCompleted
        ? (book.completedAt ?? new Date().toISOString())
        : null,
    });
  }

  // UPDATE READING PROGRESS
  function updateProgress(bookId, newPage) {
    const book = getBookById(bookId);

    if (!book) return;

    const page = Math.max(0, Math.min(Number(newPage) || 0, book.totalPages));

    const isCompleted = page === book.totalPages;

    updateBook(bookId, {
      currentPage: page,
      status: isCompleted
        ? "อ่านจบแล้ว"
        : book.status === "อ่านจบแล้ว"
          ? "กำลังอ่าน"
          : book.status,
      completedAt: isCompleted
        ? (book.completedAt ?? new Date().toISOString())
        : null,
    });
  }

  const value = {
    books,
    addBook,
    updateBook,
    deleteBook,
    getBookById,
    updateStatus,
    updateProgress,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

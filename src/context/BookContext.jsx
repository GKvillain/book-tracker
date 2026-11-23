import { createContext, useState } from "react";
import { initialBooks } from "../data/books";

const BookContext = createContext(null);

export function BookProvider({ children }) {
  const [books, setBooks] = useState(initialBooks);

  // Add book
  function addBook(newBook) {
    setBooks((prevBooks) => [
      ...prevBooks,
      {
        ...newBook,
        id: Date.now(),
      },
    ]);
  }

  // Update book
  function updateBook(bookId, updatedData) {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, ...updatedData } : book,
      ),
    );
  }

  // Delete book
  function deleteBook(bookId) {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  }

  const value = {
    books,
    addBook,
    updateBook,
    deleteBook,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

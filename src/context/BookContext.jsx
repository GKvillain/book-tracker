import { createContext, useContext } from "react";

export const BookContext = createContext(null);

export function useBooks() {
  const context = useContext(BookContext);

  if (context === null) {
    throw new Error("useBooks must be used within BookProvider");
  }

  return context;
}

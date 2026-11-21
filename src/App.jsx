import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import ReadingList from "./pages/ReadingList";
import BookDetail from "./pages/BookDetail";
import Journal from "./pages/Journal";
import Statistics from "./pages/Statistics";
import Goals from "./pages/Goals";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/library" element={<Library />} />
      <Route path="/reading-list" element={<ReadingList />} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/goals" element={<Goals />} />
    </Routes>
  );
}

export default App;

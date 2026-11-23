import { Routes, Route } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard";
import { Library } from "./pages/Library";
import { Wishlist } from "./pages/Wishlist";
import { Booktrack } from "./pages/Booktrack";
import { Statistics } from "./pages/Statistics";
import { ReadingGoal } from "./pages/ReadingGoal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/library" element={<Library />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/booktrack" element={<Booktrack />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/readinggoal" element={<ReadingGoal />} />
    </Routes>
  );
}

export default App;

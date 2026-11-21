import { Routes, Route } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard";
import { Library } from "./pages/Library";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/library" element={<Library />} />
    </Routes>
  );
}

export default App;

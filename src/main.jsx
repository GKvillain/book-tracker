import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./theme.css";
import { BookProvider } from "./context/BookProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BookProvider>
      <App />
    </BookProvider>
  </BrowserRouter>,
);

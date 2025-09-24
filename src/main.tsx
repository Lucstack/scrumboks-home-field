import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Force GitHub Pages refresh
createRoot(document.getElementById("root")!).render(<App />);

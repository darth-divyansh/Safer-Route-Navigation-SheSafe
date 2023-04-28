import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// ✅ import your CSS
// import "./style.css";
// import "./media-queries.css";

// ✅ FontAwesome (icons)
import "@fortawesome/fontawesome-free/css/all.min.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

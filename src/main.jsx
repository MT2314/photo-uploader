import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Mantine Component Library
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import '@mantine/carousel/styles.css';

// Styles
// import '@mantine/carousel/styles.css';
// import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>
);

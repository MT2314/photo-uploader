// App.jsx
// Mantine Component Library
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

// Subcomponents
import Gallery from "./subcomponents/Gallery";


function App() {
 
  return (
    <MantineProvider>
      <Gallery />
    </MantineProvider>
  );
}

export default App;

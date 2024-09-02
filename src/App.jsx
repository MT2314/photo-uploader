// App.jsx
import { useEffect, useState } from "react";
import { AppShell, Button, Group, Container } from "@mantine/core";
// Auth
import { auth } from "./firebaseConfig"; // Import the auth instance
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";

// Components
import Gallery from "./subcomponents/Gallery";
import Uploader from "./subcomponents/Uploader";

function App() {
  const [activeComponent, setActiveComponent] = useState("gallery");

  useEffect(() => {
    // Check if the user is already signed in
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User ID:", user.uid);
      } else {
        // User is not signed in, sign them in anonymously
        signInAnonymously(auth)
          .then(() => {
            console.log("Signed in anonymously");
          })
          .catch((error) => {
            console.error("Anonymous sign-in failed:", error);
          });
      }
    });
  }, []);

  return (
    <AppShell>
      <Container>
        <Group justify="center" mt="md" mb="xl">
          <Button onClick={() => setActiveComponent("gallery")}>Gallery</Button>
          <Button onClick={() => setActiveComponent("upload")}>Upload</Button>
        </Group>

        {activeComponent === "gallery" ? <Gallery /> : <Uploader />}
      </Container>
    </AppShell>
  );
}

export default App;

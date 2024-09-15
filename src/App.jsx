// App.jsx
import { useEffect, useState } from "react";
import { AppShell, Container, AppShellMain, Image } from "@mantine/core";
// Auth
import { auth } from "./firebaseConfig"; // Import the auth instance
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
// Components
import Gallery from "./subcomponents/Gallery";
import PhotoCarousel from "./subcomponents/PhotoCarousel";
import Uploader from "./subcomponents/Uploader";
import Button from "./subcomponents/Button";
// Assets
import HeaderLogo from "./assets/header_logo.png";

function App() {
  const [activeComponent, setActiveComponent] = useState("home");

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
    <AppShell header={{ height: "300px" }}>
      <AppShell.Header
        style={{
          borderBottom: "4px solid #f7c5c1", // Light blush pink border
          boxShadow: "0 6px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "500px",
        }}
      >
        <Image
          src={HeaderLogo}
          alt={`Nicole and Eddy Wedding Photo Gallery`}
          radius="md"
          h={200}
          fit="contain"
          caption={`Nicole and Eddy Wedding Photo Gallery`}
          onClick={() => setActiveComponent("home")}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          <Button
            label={"Gallery"}
            setActiveComponent={() => setActiveComponent("gallery")}
          />
          <Button
            label={"Upload"}
            setActiveComponent={() => setActiveComponent("upload")}
          />
        </div>
      </AppShell.Header>
      <AppShellMain>
        <Container fluid h={50} size="lg" px="md" py="xl">
          {activeComponent === "home" && <PhotoCarousel />}
          {activeComponent === "gallery" && <Gallery />}
          {activeComponent === "upload" && <Uploader />}
        </Container>
      </AppShellMain>
    </AppShell>
  );
}

export default App;

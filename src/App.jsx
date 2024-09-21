// App.jsx
import { useEffect, useState } from "react";
import { AppShell, Container, AppShellMain, Image } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
// Auth
import { auth } from "./firebaseConfig"; // Import the auth instance
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
// Components
import Home from "./subcomponents/Home";
import Gallery from "./subcomponents/Gallery";
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
    <MantineProvider
      theme={{
        fontFamily: "'PT Serif', serif",
        colors: {
          brand: [
            "#f4ecec",
            "#e9d7d7",
            "#dec2c2",
            "#d3adad",
            "#c89898",
            "#bd8383",
            "#b26e6e",
            "#a75959",
            "#9c4444",
            "#913030",
          ],
        },
      }}
    >
      <AppShell>
        <AppShell.Header
          style={{
            height: "300px",
            position: "relative",
            borderBottom: "4px solid #ACBD86", // Light blush pink border
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
              disabled = {activeComponent === "gallery"}
              setActiveComponent={() => setActiveComponent("gallery")}
            />
            <Button
              label={"Upload"}
              disabled = {activeComponent === "upload"}
              setActiveComponent={() => setActiveComponent("upload")}
            />
          </div>
        </AppShell.Header>
          <Container fluid h={50} size="lg" px="md" py="xl">
            {activeComponent === "home" && <Home />}
            {activeComponent === "gallery" && <Gallery />}
            {activeComponent === "upload" && <Uploader />}
          </Container>
      </AppShell>
    </MantineProvider>
  );
}

export default App;

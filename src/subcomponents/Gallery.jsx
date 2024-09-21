// Gallery.js
import { useState, useEffect } from "react";
import {
  SimpleGrid,
  Image,
  Container,
  Title,
  Modal,
  Button,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { fetchAllImageUrls } from "../database/getAllImages";
import { ref, getBlob } from "firebase/storage";
import { saveAs } from "file-saver";
import { storage } from "../firebaseConfig";
import { Download } from "tabler-icons-react"; // Import the download icon

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  useEffect(() => {
    fetchAllImageUrls("gs://edward--nicole-wedding.appspot.com/images/")
      .then((urls) => {
        setImages(urls);
      })
      .catch(console.error);
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    open();
  };

  // Function to handle the download
  const handleDownload = () => {
    // Create a reference to the file you want to download
    const storageRef = ref(storage, selectedImage);

    // Get the file as a Blob
    getBlob(storageRef)
      .then((blob) => {
        // Use FileSaver.js to save the blob
        saveAs(blob, extractFileName(selectedImage));
      })
      .catch((error) => {
        console.error("Failed to download image:", error);
      });
  };

  // Helper function to extract the filename
  const extractFileName = (url) => {
    return url.substring(url.lastIndexOf("/") + 1).split("?")[0];
  };

  return (
    <Container size="lg" py="xl">
      <Title
        align="center"
        sx={{
          fontFamily: "'Cursive', sans-serif",
          color: theme.colors.gray[8],
          marginBottom: theme.spacing.xxl,
        }}
      >
        Our Wedding Gallery
      </Title>

      <SimpleGrid
        style={{ marginTop: "20px" }}
        cols={3}
        spacing="md"
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "sm", cols: 1 },
        ]}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              paddingBottom: "100%",
              position: "relative",
            }}
          >
            <Image
              src={image}
              alt={`Wedding Photo ${index + 1}`}
              radius="md"
              withPlaceholder
              onClick={() => handleImageClick(image)}
              styles={{
                root: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                },
                image: {
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  border: `1px solid ${theme.colors.gray[3]}`,
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: theme.shadows.sm,
                  },
                },
              }}
            />
          </div>
        ))}
      </SimpleGrid>

      <Modal
        opened={opened}
        onClose={close}
        centered
        size="lg"
        overlayOpacity={0.6}
        overlayBlur={3}
        withCloseButton={true} // Enable close button
        styles={{
          modal: {
            backgroundColor: theme.white,
            padding: theme.spacing.md,
            borderRadius: theme.radius.md,
          },
        }}
      >
        <Stack align="center" spacing="md">
          <Image
            src={selectedImage}
            alt="Enlarged Wedding Photo"
            radius="md"
            styles={{
              image: {
                maxHeight: "70vh",
                objectFit: "contain",
              },
            }}
          />
          <Button
            size="md"
            leftIcon={<Download size={20} />}
            onClick={handleDownload}
            variant="filled"
            color="teal"
            styles={{
              root: {
                width: "200px",
                justifyContent: "center",
              },
            }}
          >
            Download
          </Button>
        </Stack>
      </Modal>
    </Container>
  );
};

export default Gallery;

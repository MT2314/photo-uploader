// Gallery.js
import React, { useState, useEffect } from "react";
import {
  SimpleGrid,
  Image,
  Container,
  Title,
  Modal,
  Button,
  Stack,
  useMantineTheme,
  Loader,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { fetchAllImageUrls } from "../database/getAllImages";
import { ref, getBlob } from "firebase/storage";
import { saveAs } from "file-saver";
import { storage } from "../firebaseConfig";
import { Download } from "tabler-icons-react";

// Helper function to extract filename from URL
const extractFileName = (url) => {
  return url.substring(url.lastIndexOf("/") + 1).split("?")[0];
};

// Component to display each image in the gallery
const GalleryImage = ({ src, alt, onClick }) => {
  const theme = useMantineTheme();

  return (
    <div
      style={{
        width: "100%",
        paddingBottom: "100%",
        position: "relative",
      }}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        radius="md"
        withPlaceholder
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
  );
};

// Component for the image modal
const ImageModal = ({
  opened,
  onClose,
  imageSrc,
  onDownload,
  isDownloading,
}) => {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      overlayOpacity={0.6}
      overlayBlur={3}
      withCloseButton={true}
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
          src={imageSrc}
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
          onClick={onDownload}
          variant="filled"
          color="teal"
          leftIcon={<Download size={20} />}
          loading={isDownloading}
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
  );
};

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useMantineTheme();

  // Fetch all image URLs on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const urls = await fetchAllImageUrls(
          "gs://edward--nicole-wedding.appspot.com/images/"
        );
        setImages(urls);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to load images. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Handle image click to open modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
    open();
  };

  // Handle download functionality
  const handleDownload = async () => {
    if (!selectedImage) return;

    setDownloadLoading(true);
    try {
      const storageRef = ref(storage, selectedImage);
      const blob = await getBlob(storageRef);
      saveAs(blob, extractFileName(selectedImage));
    } catch (error) {
      console.error("Failed to download image:", error);
      alert("Failed to download image. Please try again.");
    } finally {
      setDownloadLoading(false);
    }
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

      {loading ? (
        <Loader size="lg" variant="dots" />
      ) : error ? (
        <Text color="red" align="center">
          {error}
        </Text>
      ) : (
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
            <GalleryImage
              key={index}
              src={image}
              alt={`Wedding Photo ${index + 1}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </SimpleGrid>
      )}

      <ImageModal
        opened={opened}
        onClose={close}
        imageSrc={selectedImage}
        onDownload={handleDownload}
        isDownloading={downloadLoading}
      />
    </Container>
  );
};

export default Gallery;

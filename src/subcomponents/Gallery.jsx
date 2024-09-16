// Gallery.js
import { useState, useEffect } from "react";
import {
  SimpleGrid,
  Image,
  Container,
  Title,
  Modal,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { fetchAllImageUrls } from "../database/getAllImages";

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
      style={{marginTop: "20px"}}
        cols={3}
        spacing="md"
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "sm", cols: 1 },
        ]}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Wedding Photo ${index + 1}`}
            radius="md"
            withPlaceholder
            onClick={() => handleImageClick(image)}
            styles={{
              image: {
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                border: `1px solid ${theme.colors.gray[3]}`,
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: theme.shadows.sm,
                },
              },
            }}
          />
        ))}
      </SimpleGrid>

      <Modal
        opened={opened}
        onClose={close}
        centered
        size="auto"
        overlayOpacity={0.6}
        overlayBlur={3}
        withCloseButton={false}
        styles={{
          modal: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <Image src={selectedImage} alt="Enlarged Wedding Photo" radius="md" />
      </Modal>
    </Container>
  );
};

export default Gallery;

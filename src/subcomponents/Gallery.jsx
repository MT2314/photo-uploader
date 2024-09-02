import { useState, useEffect } from "react";
// Mantine Components
import { SimpleGrid, Image, Container } from "@mantine/core";

// Database
import { fetchAllImageUrls } from "../database/getAllImages";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Replace 'images/' with the actual folder path in your storage
    fetchAllImageUrls("gs://edward--nicole-wedding.appspot.com/images/")
      .then((urls) => {
        setImages(urls); // Set the image URLs in the state
      })
      .catch(console.error); // Handle any errors
  }, []);

  return (
    <Container size="lg" py="xl">
      <h1>Gallery</h1>

      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "sm", cols: 1 },
        ]}
        spacing="md"
      >
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Image ${index}`}
            radius="md"
            caption={`Image ${index}`}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Gallery;

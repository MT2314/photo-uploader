import { useState, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { SimpleGrid, Image, Container, Button } from "@mantine/core";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage"; // Firebase imports

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // Fetch all image URLs from Firebase Storage
    const fetchImagesFromFirebase = async () => {
      const storage = getStorage();
      const listRef = ref(storage, "images"); // Replace with your folder path
      try {
        const res = await listAll(listRef); // List all files in the folder
        const urls = await Promise.all(
          res.items.map((itemRef) => getDownloadURL(itemRef))
        );
        setImages(urls); // Set image URLs in state
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    fetchImagesFromFirebase();
  }, []);

  const downloadImagesAsZip = async () => {
    setDownloading(true);
    const zip = new JSZip();
    const folder = zip.folder("wedding-images");

    // Fetch each image as a blob and add it to the zip
    const imagePromises = images.map(async (url, index) => {
      const response = await fetch(url);
      const blob = await response.blob();
      folder.file(`image${index + 1}.jpg`, blob); // Add blob to ZIP
    });

    // Wait for all images to be fetched and added to the ZIP
    await Promise.all(imagePromises);

    // Generate ZIP and trigger download
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "wedding-images.zip");
      setDownloading(false); // Reset the download state
    });
  };

  return (
    <Container size="lg" py="xl">
      <h1
        style={{
          fontFamily: "'Cursive', sans-serif",
        }}
      >
        Gallery
      </h1>

      <Button
        onClick={downloadImagesAsZip}
        mt="md"
        variant="outline"
        color="teal"
        disabled={downloading}
      >
        {downloading ? "Downloading..." : "Download All Images as ZIP"}
      </Button>

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

import { useRef, useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
// Database
import { fetchAllImageUrls } from "../database/getAllImages";

function PhotoCarousel() {
  const [images, setImages] = useState([]);
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  useEffect(() => {
    // Replace 'images/' with the actual folder path in your storage
    fetchAllImageUrls("gs://edward--nicole-wedding.appspot.com/images/")
      .then((urls) => {
        setImages(urls); // Set the image URLs in the state
      })
      .catch(console.error); // Handle any errors
  }, []);

  return (
    <Carousel
      withIndicators
      height={500}
      slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
      slideGap={{ base: 0, sm: 'md' }}
      loop
      align="start"
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      {images.map((image, index) => (
        <Carousel.Slide key={index}>
          <img src={image} alt={`Image ${index}`} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default PhotoCarousel;

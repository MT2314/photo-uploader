import { useRef, useState, useEffect } from "react";
// import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { Center, Image, Container } from "@mantine/core";

// Database
import { fetchAllImageUrls } from "../database/getAllImages";

function PhotoCarousel() {
  const [images, setImages] = useState([]);
  console.log(images);
  // const autoplay = useRef(Autoplay({ delay: 2000 }));

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
      height={"auto"}
      slideSize="70%"
      slideGap={{ base: 0, sm: "md" }}
      loop
      align="center"
      // slideSize="33.333333%"
      // slideGap="md"
      // slideSize="33.333333%"
      // slideSize="200px"
      // slideGap={{ base: 0, sm: 'md' }}
      // loop
      // align="start"
      // plugins={[autoplay.current]}
      // onMouseEnter={autoplay.current.stop}
      // onMouseLeave={autoplay.current.reset}
    >
      {/* <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide> */}
      {images.map((image, index) => (
        <Carousel.Slide key={index}>
          {/* <p>Image {index}</p> */}
          <Container size="responsive">
            <Center>
              <Image
                key={index}
                src={image}
                alt={`Image ${index}`}
                radius="md"
                fit="contain"
                h={"300px"}
                w="auto"
                caption={`Image ${index}`}
              />
            </Center>
          </Container>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default PhotoCarousel;

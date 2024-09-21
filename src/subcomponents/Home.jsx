import React from "react";
import { Container, Image, Text } from "@mantine/core";
import rings from "../assets/rings.png";

const Home = () => {
  return (
    <Container>
      <Text align="center" size="xl" style={{ fontSize: "3rem" }}>
        Thank you for joining us on our special day and capturing these
        wonderful memories!
      </Text>
      <Image
        src={rings}
        alt="wedding rings"
        radius="md"
        maw={400}
        mx="auto"
        my="xl"
        caption="Nicole and Eddy's Wedding Day"
      />
    </Container>
  );
};

export default Home;

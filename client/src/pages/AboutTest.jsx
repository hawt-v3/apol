import { Box, Heading, Link, ScaleFade, Text } from "@chakra-ui/react";
import Layout from "./Layout";

const AboutTest = () => (
  <Layout>
    <ScaleFade in={true}>
      <Box
        w="100%"
        h="96vh"
        display="flex"
        flexDir="column"
        alignItems="center"
        pt="5rem"
      >
        <Heading>About The Test</Heading>
        <Text maxW="30%" textAlign="center" mt="1rem">
          The political alignment test itself is nothing really new, it's been
          around for a while and has sustained its reputation as a broad measure
          for political alignment.
        </Text>
        <Heading mt="1rem" size="md">
          So what's new?
        </Heading>
        <Text maxW="30%" textAlign="center" mt="1rem">
          Everything else.
        </Text>
        <Text maxW="30%" textAlign="center" mt="1rem">
          Our biggest change and influence on the way the current system works
          comes as a result of our extensive research into the inner-workings of
          the human mind and its thoughts, because that is what lies at the core
          of all of us, what makes us similar. The first part of our conducted
          research can be viewed{" "}
          <Link
            variant="link"
            colorScheme="pink"
            color="pink.400"
            target="_blank"
            _focus={{
              outline: "none",
            }}
            href="https://google.com/"
          >
            here.
          </Link>
        </Text>
      </Box>
    </ScaleFade>
  </Layout>
);
export default AboutTest;

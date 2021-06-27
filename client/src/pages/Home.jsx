import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  ScaleFade,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../flag.css";
import Layout from "./Layout";

const Home = () => {
  return (
    <ScaleFade in={true}>
      <Layout>
        <Container
          maxW={"7xl"}
          mt={{ base: "0", md: "2rem", lg: "3rem", xl: "5rem" }}
        >
          <Stack
            align={"center"}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}
            direction={{ base: "column-reverse", md: "row" }}
          >
            <Stack flex={1} spacing={{ base: 5, md: 10 }}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
              >
                <Text
                  fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
                  as={"span"}
                  fontWeight="black"
                  position={"relative"}
                  color="#007e94"
                >
                  A-
                </Text>
                <Text
                  fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
                  as={"span"}
                  fontWeight="black"
                  position={"relative"}
                  color="#ff6961"
                >
                  POL
                </Text>
                <br />
                <Text
                  mt={5}
                  mb={-2}
                  color={"gray.600"}
                  fontWeight="bold"
                  fontSize={{ base: "xl", sm: "2xl", lg: "2xl" }}
                >
                  The measure of intelligence is the ability to change.
                </Text>
              </Heading>
              <Text color={"gray.500"}>
                Apol is a news delegator that helps you gain a thorough
                understanding of the political scene, whatever your alignment
                may be. We use a complex algorithm to bring you categorized news
                from all the major sources.
              </Text>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: "column", sm: "row" }}
              >
                <Button
                  rounded={"full"}
                  size={"lg"}
                  fontWeight={"normal"}
                  px={6}
                  as={Link}
                  colorScheme={"red"}
                  bg={"red.400"}
                  to="/register"
                  _hover={{ bg: "red.500" }}
                >
                  Get started
                </Button>
                <Button
                  rounded={"full"}
                  size={"lg"}
                  fontWeight={"normal"}
                  px={6}
                >
                  How It Works
                </Button>
              </Stack>
            </Stack>
            <Flex
              flex={1}
              justify={"center"}
              align={"center"}
              position={"relative"}
              w={"full"}
            >
              <Blob
                w={"150%"}
                h={"150%"}
                position={"absolute"}
                top={"-20%"}
                left={0}
                zIndex={-1}
                color={useColorModeValue("red.50", "red.400")}
              />
              <Box
                position={"relative"}
                height={{ base: "150px", md: "200px", lg: "300px" }}
                rounded={"2xl"}
                boxShadow={"2xl"}
                width={"full"}
                overflow={"hidden"}
              >
                <IconButton
                  aria-label={"Play Button"}
                  variant={"ghost"}
                  _hover={{ bg: "transparent" }}
                  size={"lg"}
                  color={"white"}
                  position={"absolute"}
                  left={"50%"}
                  top={"50%"}
                  transform={"translateX(-50%) translateY(-50%)"}
                />
                <Image
                  alt={"Hero Image"}
                  fit={"cover"}
                  align={"center"}
                  w={"100%"}
                  h={"100%"}
                  className="animated"
                  src={
                    "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"
                  }
                />
              </Box>
            </Flex>
          </Stack>
        </Container>
      </Layout>
    </ScaleFade>
  );
};

export const Blob = props => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
export default Home;

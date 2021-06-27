import {
  Box,
  Button,
  Heading,
  Link,
  ScaleFade,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import Layout from "./Layout";

const PoliTest = () => {
  const selectRef = useRef();
  const { currentUser } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    const option = selectRef.current.value;
    setLoading(true);

    firebase
      .firestore()
      .doc(`users/${currentUser.uid}`)
      .update({ alignment: option })
      .then(() => {
        setLoading(false);
        toast({
          description: "Your alignment has been updated.",
          status: "success",
        });
      })
      .catch(err => {
        console.log(err);
        toast({ description: "Something went wrong", status: "error" });
      });
  };

  return (
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
          <Heading>Political Alignment Test</Heading>
          <Text maxW="30%" textAlign="center" mt="1rem">
            Before participating in the platform, we recommend you do a
            political alignment test, which you can do{" "}
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
          <Text maxW="30%" textAlign="center" mt="1rem">
            After you do the test, select the category that matches your result
            most!
          </Text>

          {/* choose the your category */}
          <Box
            mt={5}
            d="flex"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
          >
            <Select ref={selectRef}>
              <option value="NTRL">Neutral</option>
              <option value="CONS">Conservative</option>
              <option value="SOCL">Socialist</option>
              <option value="NATL">Nationalist</option>
              <option value="INDV">Individualist</option>
              <option value="ANCA">Anarcho-Capitalist</option>
              <option value="SJW">SJW</option>
              <option value="RPLB">Representative Liberal</option>
            </Select>
            <Button
              isLoading={loading}
              size="sm"
              width="5rem"
              mt={5}
              colorScheme="blue"
              onClick={onSubmit}
            >
              Save
            </Button>
          </Box>
        </Box>
      </ScaleFade>
    </Layout>
  );
};

export default PoliTest;

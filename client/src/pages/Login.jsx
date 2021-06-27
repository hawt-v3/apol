import {
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  Link,
  ScaleFade,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import firebase from "../firebase";
import Layout from "./Layout";

export const Login = () => {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();

  const toast = useToast();

  const submit = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (password.length < 5)
      return toast({
        title: "Bad Password",
        description: "Please enter a stronger password",
        status: "error",
      });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(yes => {
        toast({
          title: "Signed in",
          description: "Welcome to A-POL",
          status: "success",
        });
        setTimeout(() => history.push("/news"), 500);
      })
      .catch(error => {
        console.log(error);
        toast({
          title: "Error",
          description: "Please check your credentials",
          status: "error",
        });
      });
  };

  return (
    <Layout>
      <ScaleFade in={true}>
        <Box
          onKeyPress={e => e.key === "Enter" && submit()}
          width="100%"
          mt="10rem"
          d="flex"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
        >
          <Heading size="lg">Login</Heading>

          <Box w="25%">
            <FormLabel mt="1rem">E-Mail</FormLabel>
            <Input
              type="email"
              ref={emailRef}
              placeholder="jimi@hendrix.com"
              focusBorderColor="#d66f69"
            />
          </Box>

          <Box w="25%">
            <FormLabel mt="1rem">Password</FormLabel>
            <Input
              type="password"
              ref={passwordRef}
              placeholder="purplehaze123"
              focusBorderColor="#d66f69"
            />
          </Box>

          <Text mt="0.5rem">
            Don't have an account?{" "}
            <Link
              color="red"
              as={RouterLink}
              to="/register"
              _focus={{ outline: "none" }}
            >
              Register
            </Link>
          </Text>

          <Button mt="1.5rem" colorScheme="red" onClick={submit}>
            Login
          </Button>
        </Box>
      </ScaleFade>
    </Layout>
  );
};

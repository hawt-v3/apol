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

const checkEmail = email => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const Register = () => {
  const history = useHistory();
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();

  const toast = useToast();

  const submit = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

    if (!checkEmail(email))
      return toast({
        title: "Bad Email",
        description: "Your email is incorrect",
        status: "error",
      });

    if (password.length < 5)
      return toast({
        title: "Bad Password",
        description: "Please enter a stronger password",
        status: "error",
      });

    if (name.length < 2)
      return toast({
        title: "Name too short",
        description: "Please enter a longer name",
        status: "error",
      });

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.updateProfile({ displayName: name })
          .then(() => {
            firebase
              .firestore()
              .doc(`users/${firebase.auth().currentUser.uid}`)
              .set({
                id: firebase.auth().currentUser.uid,
                displayName: name,
                photoUrl: "",
                private: false,
              })
              .then(() => {
                toast({
                  title: "Account Created",
                  description: "Welcome to A-POL",
                  status: "success",
                });
                setTimeout(() => history.push("/news"), 500);
              });
          });
      })
      .catch(error => {
        console.log(error);
        toast({
          title: "Existing account",
          description: "An account with that email already exists",
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
          <Heading size="lg">Register</Heading>

          <Box w="25%">
            <FormLabel mt="1rem">Name</FormLabel>
            <Input
              ref={nameRef}
              placeholder="Jimi Hendrix"
              focusBorderColor="#d66f69"
            />
          </Box>

          <Box w="25%">
            <FormLabel mt="1rem">E-Mail</FormLabel>
            <Input
              ref={emailRef}
              type="email"
              placeholder="jimi@hendrix.com"
              focusBorderColor="#d66f69"
            />
          </Box>

          <Box w="25%">
            <FormLabel mt="1rem">Password</FormLabel>
            <Input
              ref={passwordRef}
              type="password"
              placeholder="purplehaze123"
              focusBorderColor="#d66f69"
            />
          </Box>

          <Text mt="0.5rem">
            Have an account?{" "}
            <Link
              color="red"
              as={RouterLink}
              to="/login"
              _focus={{ outline: "none" }}
            >
              Log in
            </Link>
          </Text>

          <Button mt="1.5rem" colorScheme="red" onClick={submit}>
            Register
          </Button>
        </Box>
      </ScaleFade>
    </Layout>
  );
};

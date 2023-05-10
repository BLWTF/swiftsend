import useAuth from "@/lib/auth/useAuth";
import {
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import CustomButton from "./custom-button";
import axios from "axios";
import { FormInput } from "./form-input";

export default function LoginDrawer({ isOpen, onClose, onRegisterOpen }) {
  const { mutateAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({});
  const toast = useToast();
  const router = useRouter();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      mutateAuth(
        await axios.post("/api/auth/login", {
          email: inputs.email,
          password: inputs.password,
        })
      );
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error logging in",
        description: error.message,
        status: "error",
        duration: 9000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size={{ base: "full", md: "lg" }}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <Container
          p={10}
          alignItems="center"
          justifyContent="center"
          maxW="lg"
          minH={"100vh"}
        >
          <DrawerHeader>
            <Heading>Sign In</Heading>
          </DrawerHeader>

          <DrawerBody height="100%">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormInput
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </FormControl>
              <CustomButton size="lg" type="submit" isLoading={isLoading}>
                Sign In
              </CustomButton>
              <Flex>
                <Text fontSize="sm">{"Don't have an account? "}</Text>
                <Link
                  href="#"
                  onClick={(e) => {
                    onClose();
                    onRegisterOpen();
                    // setTimeout(() => {
                    // }, 1000);
                  }}
                >
                  <Text color="blue" fontSize="sm" pl={2}>
                    Sign Up
                  </Text>
                </Link>
              </Flex>
            </form>
          </DrawerBody>
        </Container>
      </DrawerContent>
    </Drawer>
  );
}
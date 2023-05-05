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
  FormControl,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import CustomButton from "./custom-button";
import axios from "axios";

export default function LoginDrawer({ isOpen, onClose }) {
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
						<Heading>
							Sign In
						</Heading>
					</DrawerHeader>

					<DrawerBody height="100%">
						<form onSubmit={handleSubmit}>
							<FormControl>
								<LoginInput 
									type="text" 
									name="email" 
									onChange={handleChange} 
								/>
							</FormControl>
							<FormControl>
								<LoginInput 
									type="password" 
									name="password" 
									onChange={handleChange} 
								/>
							</FormControl>
							<CustomButton size="lg" type="submit" isLoading={isLoading}>
								Sign In
							</CustomButton>
						</form>
					</DrawerBody>
				</Container>
      </DrawerContent>
    </Drawer>
  );
}

const LoginInput = (props) => (
	<Input mb={2} id={props.name} {...props} />
)
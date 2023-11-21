import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Link,
  Stack,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import LoginDrawer from "./login-drawer";
import RegisterDrawer from "./register-drawer";
import { AiFillPhone } from "react-icons/ai";

const LinkItem = ({ href, path, children }) => {
  const active = path === href;

  return (
    <Link as={NextLink} href={href} p={2} variant="nav-link">
      {children}
    </Link>
  );
};

const phone = "+1 641-247-8194";

export default function LandingNavbar() {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();

  return (
    <Box
      as="nav"
      w="100%"
      position="fixed"
      bg="#FFF"
      top={0}
      borderBottomStyle="solid"
      borderBottomWidth="thin"
      zIndex={99}
    >
      <Box
        p={4}
        w="100%"
        bg="#FFF"
        borderBottomStyle="solid"
        borderBottomWidth="thin"
        zIndex={99}
      >
        {/* <Container maxW="container.lg">
          <Flex
            align="center"
            fontSize="large"
            fontWeight="bold"
            animation={{
              base: "marquee-sm 15s linear 0s infinite normal none running",
              md: "marquee-md 15s linear 0s infinite normal none running",
            }}
          >
            <Icon as={AiFillPhone} color="#0088b4" mr={2} />
            <Link href={`tel:${phone}`}>{phone}</Link>
          </Flex>
        </Container> */}
      </Box>
      <Container p={2} maxW="container.lg">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex mr="16" align="center">
            <Image
              alt="SwiftSend"
              src="/images/logo.svg"
              width={150}
              height={16}
            />
          </Flex>

          <Stack
            ml={10}
            display={{ base: "none", md: "flex" }}
            direction={{ base: "column", md: "row" }}
            width={{ base: "full", md: "auto" }}
            alignItems="center"
            flex={1}
          ></Stack>

          <Box flex={1} align="right">
            <Button bg="#0088b4" color="#FFF" onClick={onLoginOpen}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      <LoginDrawer
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        onRegisterOpen={onRegisterOpen}
      />
      <RegisterDrawer
        isOpen={isRegisterOpen}
        onClose={onRegisterClose}
        onLoginOpen={onLoginOpen}
      />
    </Box>
  );
}

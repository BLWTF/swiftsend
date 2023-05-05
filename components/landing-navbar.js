import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Link,
  Stack,
	useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import LoginDrawer from "./login-drawer";

const LinkItem = ({ href, path, children }) => {
  const active = path === href;

  return (
    <Link as={NextLink} href={href} p={2} variant="nav-link">
      {children}
    </Link>
  );
};

export default function LandingNavbar() {
	const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box as="nav" w="100%" zIndex={99} position="fixed" top={0}>
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
          >
            <LinkItem href="/personal">Home</LinkItem>
            <LinkItem href="/business">Services</LinkItem>
            <LinkItem href="/investment">About</LinkItem>
            <LinkItem href="/online">Contact</LinkItem>
          </Stack>

          <Box flex={1} align="right">
            <Button bg="#0088b4" color="#FFF" onClick={onOpen}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      <LoginDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

import Head from "next/head";
import AccountNavbar from "../account-navbar";
import { Box, Container, Stack, useDisclosure } from "@chakra-ui/react";
import SidebarDrawer from "../sidebar-drawer";
import Sidebar from "../sidebar";

export default function Main({ children, router, auth }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAdmin = auth?.user.isAdmin ?? false;
  const path = router.asPath;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="SwiftSend" />
        <meta property="og:site_name" content="SwiftSend" />
        <meta name="og:title" content="SwiftSend" />
        <link
          rel="shortcut icon"
          href="images/favicon.ico"
          type="image/x-icon"
        />
        <title>SwiftSend - Account</title>
        <link rel="icon" type="image/x-icon" href="images/favicon.ico"></link>
      </Head>

      <AccountNavbar onOpen={onOpen} />
      <SidebarDrawer
        path={path}
        isAdmin={isAdmin}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
      />

      <Stack direction="row" pt={20}>
        <Box
          flex={1}
          position="fixed"
          borderRightStyle="solid"
          borderRightWidth="thin"
          minH="100vh"
        >
          <Sidebar path={path} isAdmin={isAdmin} />
        </Box>
        <Container maxW="container.lg">
          <Box flex={20} minH="100vh" pl={{ base: 0, md: 20 }}>
            {children}
          </Box>
        </Container>
      </Stack>
    </>
  );
}

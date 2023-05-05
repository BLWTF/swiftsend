import Head from "next/head";
import AccountNavbar from "../account-navbar";
import { Box } from "@chakra-ui/react";

export default function Main({ children }) {
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

			<AccountNavbar />

			<Box>{children}</Box>
    </>
  );
}

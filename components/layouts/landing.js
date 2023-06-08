import { Box } from "@chakra-ui/react";
import Head from "next/head";
import LandingNavbar from "../landing-navbar";
import { Wrap } from "../wrap";
import TawkMessengerReactUmd from "@tawk.to/tawk-messenger-react";

export default function Main({ children, noWrap = false }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="SwiftSend" />
        <meta property="og:site_name" content="SwiftSend" />
        <meta name="og:title" content="SwiftSend" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link
          rel="shortcut icon"
          href="images/favicon.ico"
          type="image/x-icon"
        />
        <title>SwiftSend - Homepage</title>
        <link rel="icon" type="image/x-icon" href="images/favicon.ico"></link>
      </Head>

      {!noWrap && (
        <Wrap>
          <LandingNavbar />

          <Box>{children}</Box>
        </Wrap>
      )}
      {noWrap && (
        <>
          <LandingNavbar />

          <Box>{children}</Box>
        </>
      )}

      <TawkMessengerReactUmd
        propertyId="6481e4cfcc26a871b0216357"
        widgetId="1h2dmbj5a"
      />
    </>
  );
}

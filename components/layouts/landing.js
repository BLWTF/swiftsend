import { Box } from "@chakra-ui/react";
import Head from "next/head";
import LandingNavbar from "../landing-navbar";
import { Wrap } from "../wrap";
import TawkMessengerReactUmd from "@tawk.to/tawk-messenger-react";
import Footer from "../footer";

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
        <>
            <LandingNavbar />

            <Box>{children}</Box>
          <Footer />
        </>
      )}
      {noWrap && (
        <>
          <LandingNavbar />

          <Box>{children}</Box>
          <Footer />
        </>
      )}

      <TawkMessengerReactUmd
        propertyId="65746f3470c9f2407f7dd48e"
        widgetId="1hh7d4q5i"
      />
    </>
  );
}

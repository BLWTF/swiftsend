import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
} from "@chakra-ui/react";
import Layout from "../components/layouts/landing";
import TrackingForm from "@/components/tracking-form";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/auth/session-options";

export default function Page() {
  return (
    <Layout>
      <Box>
        <Container maxW="container.lg">
          <Stack minH="100vh" direction={{ base: "column", md: "row" }} m={5}>
            <Flex p={8} flex={1} align="center">
              <Stack direction="column" spacing={7}>
                <Heading fontSize="5xl">Quickest & Safest Delivery</Heading>
                <TrackingForm />
              </Stack>
            </Flex>
            <Flex flex={1} align="center">
              <Image alt="" src="/images/d-1.png" />
            </Flex>
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const auth = req.session.auth;

  if (auth !== undefined) {
    res.setHeader("location", "/dashboard");
    res.statusCode = 302;
    res.end();
    return {
      props: { auth: req.session.auth },
    };
  }

  return {
    props: {},
  };
},
sessionOptions);
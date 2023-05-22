import { Box, Container, Flex, IconButton, Text } from "@chakra-ui/react";
import Layout from "../../components/layouts/account";
import { sessionOptions } from "@/lib/auth/session-options";
import { withIronSessionSsr } from "iron-session/next";
import { useEffect } from "react";

export default function Page({ router, auth }) {
	useEffect(() => {
    router.push("/admin/packages");
  }, [router]);

  return (
    <Layout router={router} auth={auth}>
      <Box>
        <Container maxW="container.lg">
          <Box
            display="flex"
            flexDirection="row"
            pt={2}
            alignItems="center"
            justifyContent="space-between"
          >
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  res.setHeader("location", "/admin/packages");
  res.statusCode = 302;
  res.end();
  return {
    props: {
      auth: { isLoggedIn: false, user: null },
    },
  };

  // const auth = req.session.auth;

  // if (auth === undefined) {
  //   res.setHeader("location", "/");
  //   res.statusCode = 302;
  //   res.end();
  //   return {
  //     props: {
  //       auth: { isLoggedIn: false, user: null },
  //     },
  //   };
  // }

  // return {
  //   props: { auth: req.session.auth },
  // };
},
sessionOptions);
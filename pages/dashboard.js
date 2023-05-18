import { Box, Container } from "@chakra-ui/react"
import Layout from "../components/layouts/account"
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/auth/session-options";

export default function Dashboard() {
	return (
		<Layout>
			<Box>
				<Container maxW="container.lg">

				</Container>
			</Box>
		</Layout>
	)
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const auth = req.session.auth;

  if (auth === undefined) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        auth: { isLoggedIn: false, user: null },
      },
    };
  }

  if (auth.user.isAdmin) {
    res.setHeader("location", "/admin");
    res.statusCode = 302;
    res.end();
    return {
      props: { auth: req.session.auth },
    };
  }

  return {
    props: { auth: req.session.auth },
  };
},
sessionOptions);
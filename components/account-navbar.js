import useAuth from "@/lib/auth/useAuth";
import { Box, Container, Flex, Icon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa"
import { BiLogIn } from "react-icons/bi"
import { useRouter } from "next/router";
import axios from "axios";

export default function AccountNavbar() {
	const { mutateAuth } = useAuth();
	const router = useRouter();

  return (
    <Box as="nav" w="100%" position="fixed" bg="#FFF">
      <Container p={2} maxW="container.lg">
        <Box
          display="flex"
          flexDirection="row"
          pt={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex align="center">
            <Image
              alt="SwiftSend"
              src="/images/logo.svg"
              width={150}
              height={16}
            />
          </Flex>

          <Box flex={1} align="right">
            <Menu>
              <MenuButton>
								<UserIconLink />
							</MenuButton>
							<MenuList>
								<MenuItem
									icon={<BiLogIn />}
									onClick={async (event) => {
										event.preventDefault();
										mutateAuth(await axios.post("/api/auth/logout"));
                    router.push("/");
									}}
								>
									Log Out
								</MenuItem>
							</MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

const UserIconLink = () => {
  return (
    <Box
      display="flex"
      bg="#0088b4"
      height="30px"
      width="30px"
      borderRadius="50%"
      alignItems="center"
      justifyContent="center"
      color="#FFF"
      cursor="pointer"
    >
			<Icon as={FaUserCircle} />
		</Box>
  );
};

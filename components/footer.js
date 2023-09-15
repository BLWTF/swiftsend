import { Box, Container, Stack, Image, Link, Icon } from "@chakra-ui/react";
import { PiWhatsappLogoDuotone, PiTelegramLogoDuotone } from "react-icons/pi";

export default function Footer() {
  return (
    <Box py={6} w="100%" bg="#FFF" borderTopStyle="solid" borderTopWidth="thin">
      <Container maxW="container.lg">
        <Stack
          direction="row"
          display="flex"
          align="center"
          justifyContent="space-between"
        >
          <Image
            alt="SwiftSend"
            src="/images/logo.svg"
            width={150}
            height={16}
          />

          <Stack direction="row" spacing={3}>
            <Link href="https://wa.link/nid4w8" isExternal>
              <Icon as={PiWhatsappLogoDuotone} boxSize={12} />
            </Link>
            <Link href="https://t.me/+16412478194" isExternal>
              <Icon as={PiTelegramLogoDuotone} boxSize={12} />
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

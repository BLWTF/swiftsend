import { Icon, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const SidebarItem = ({ href, path, title, icons, drawer = false }) => {
  const active = path === href;
  return (
    <Link
      p={2}
      as={NextLink}
      href={href}
      _hover={{
        bg: "#d6d2cf",
      }}
      borderRadius="md"
      fontWeight={active ? "bold" : null}
    >
      {drawer && (
        <Stack direction="row" spacing={3} align="center">
          <Icon as={active ? icons[0] : icons[1]} fontSize="2xl" />
          <Text fontSize="xs">{title}</Text>
        </Stack>
      )}
      {!drawer && (
        <Stack direction="column" spacing={0} align="center">
          <Icon as={active ? icons[0] : icons[1]} fontSize="2xl" />
          <Text fontSize="xs">{title}</Text>
        </Stack>
      )}
    </Link>
  );
};

export default SidebarItem
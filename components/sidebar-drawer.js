import {
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import SidebarItem from "./sidebar-item";
import { HamburgerIcon } from "@chakra-ui/icons";
import Sidebar from "./sidebar";

export default function SidebarDrawer({
  path,
  isAdmin,
  router,
  isOpen,
  onOpen,
  onClose,
}) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="xs">
      <DrawerOverlay />
      <DrawerContent>
        <Container alignItems="center" justifyContent="center" minH={"100vh"}>
          <DrawerHeader>
            <Stack direction="column">
              <Stack direction="row" spacing={2}>
                <IconButton
                  bg="#FFF"
                  icon={<HamburgerIcon />}
                  onClick={onClose}
                />
              </Stack>
            </Stack>
          </DrawerHeader>
          <DrawerBody height="100%">
            <Sidebar isAdmin={isAdmin} path={path} drawer dark />
          </DrawerBody>
        </Container>
      </DrawerContent>
    </Drawer>
  );
}

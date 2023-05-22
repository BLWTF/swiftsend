import { Stack } from "@chakra-ui/react";
import SidebarItem from "./sidebar-item";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { RiUserSettingsLine, RiUserSettingsFill, RiArchiveFill, RiArchiveLine } from "react-icons/ri";

const adminItems = [
  {
    title: "Packages",
    href: "/admin/packages",
    icons: [RiArchiveFill, RiArchiveLine],
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icons: [RiUserSettingsFill, RiUserSettingsLine],
  },
];

const userItems = [
  {
    title: "Home",
    href: "/dashboard",
    icons: [AiFillHome, AiOutlineHome],
  },
];

export default function Sidebar({
  path,
  drawer = false,
  isAdmin = false,
  dark = false,
}) {
  return (
    <Stack
      direction="column"
      p={!drawer ? 3 : null}
      alignItems={!drawer ? "center" : null}
      display={{ base: !drawer ? "none" : "flex", md: "flex" }}
      color={dark ? "#00040F" : null}
    >
      {isAdmin &&
        adminItems.map((item) => (
          <SidebarItem
            title={item.title}
            key={item.title}
            href={item.href}
            path={path}
            icons={item.icons}
            drawer={drawer}
          />
        ))}
      {!isAdmin &&
        userItems.map((item) => (
          <SidebarItem
            title={item.title}
            key={item.title}
            href={item.href}
            path={path}
            icons={item.icons}
            drawer={drawer}
          />
        ))}
    </Stack>
  );
}

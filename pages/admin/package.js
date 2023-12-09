import Layout from "../../components/layouts/account";
import { sessionOptions } from "@/lib/auth/session-options";
import SqlizeService from "@/lib/database/services/sqlize";
import { capitalizeFirst } from "@/lib/helpers";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Stack,
  StackDivider,
  Tag,
  Text,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { withIronSessionSsr } from "iron-session/next";
import { useState } from "react";
import { BiPause, BiPlay } from "react-icons/bi";
import { FaRegCopy } from "react-icons/fa";
import { MdPending } from "react-icons/md";

const statusOptions = ["pending pickup", "in transit", "delivered"];

export default function Page({ router, auth, pkg }) {
  const [isLoadingPause, setIsLoadingPause] = useState(false);
  const [status, setStatus] = useState(pkg.deliveryStatus);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [isCurLoading, setIsCurLoading] = useState(false);
  const [currentLocationState, setCurrentLocationState] = useState(
    pkg.currentLocation
  );

  async function togglePause() {
    setIsLoadingPause(true);

    await axios.get(`/api/admin/toggle-pause?packageId=${pkg.id}`);
    router.reload(window.location.pathname);
  }

  async function handleDelete() {
    await axios.delete(`/api/admin/delete-package?packageId=${pkg.id}`);
    router.push("/admin/packages");
  }

  async function handleUpdate(body) {
    body.deliveryStatus ? setIsLoadingStatus(true) : null;
    await axios.post(`/api/admin/update-package?packageId=${pkg.id}`, body);
    body.deliveryStatus ? setStatus(body.deliveryStatus) : null;
    body.deliveryStatus ? setIsLoadingStatus(false) : null;
  }

  async function handleCurrentLocation() {
    setIsCurLoading(true);
    const body = { currentLocation: currentLocationState };
    await axios.post(`/api/admin/update-package?packageId=${pkg.id}`, body);
    setIsCurLoading(false);
  }

  return (
    <Layout router={router} auth={auth}>
      <Box p={2}>
        <Box display="flex" pb={5} justifyContent="space-between">
          <Heading as="h3" variant="page-title">
            Package
          </Heading>

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Delete"
              icon={<MdPending />}
            />
            <MenuList>
              <MenuItem icon={<DeleteIcon />} onClick={handleDelete}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <Card align="center">
          <CardBody>
            <Stack divider={<StackDivider />} spacing={2}>
              <Flex justifyContent="space-between">
                <Text fontWeight="light">Tracking Number:</Text>
                <Stack direction="row">
                  <Text fontWeight="bold">{pkg.trackingNumber}</Text>
                  <IconButton
                    icon={<FaRegCopy />}
                    size="xs"
                    onClick={(e) =>
                      navigator.clipboard.writeText(pkg.trackingNumber)
                    }
                  />
                </Stack>
              </Flex>
              <Flex justifyContent="space-between">
                <Stack direction="column" spacing={0}>
                  <Text fontWeight="light">Sender Name:</Text>
                  <Text fontWeight="bold">{pkg.senderName}</Text>
                </Stack>
                <Stack direction="column" spacing={0}>
                  <Text fontWeight="light">Recipient Name:</Text>
                  <Text fontWeight="bold">{pkg.recipientName}</Text>
                </Stack>
              </Flex>
              <Flex justifyContent="space-between">
                <Stack direction="column" spacing={0}>
                  <Text fontWeight="light">Content:</Text>
                  <Text fontWeight="bold">{pkg.packageContent}</Text>
                </Stack>
                <Stack direction="column" spacing={0}>
                  <Text fontWeight="light">Weight:</Text>
                  <Text fontWeight="bold">{pkg.packageWeight}</Text>
                </Stack>
              </Flex>
              <Stack direction="column" spacing={0}>
                <Text fontWeight="light">From:</Text>
                <Text fontWeight="bold">
                  {`${pkg.fromAddress}`}
                  {pkg.fromCity?.id
                    ? `, ${pkg.fromCity.name} ${pkg.fromCity.state.name}, ${pkg.fromCity.state.country.name}`
                    : ""}
                </Text>
              </Stack>
              <Stack direction="column" spacing={0}>
                <Text fontWeight="light">To:</Text>
                <Text fontWeight="bold">
                  {`${pkg.toAddress}`}
                  {pkg.toCity?.id
                    ? `, ${pkg.toCity.name} ${pkg.toCity.state.name}, ${pkg.toCity.state.country.name}`
                    : ""}
                </Text>
              </Stack>
              <Flex justifyContent="space-between">
                <Stack direction="column" spacing={0}>
                  <Text fontWeight="light">Status:</Text>
                  <Stack direction="row" spacing={1}>
                    <Select
                      value={status}
                      onChange={(e) =>
                        handleUpdate({ deliveryStatus: e.target.value })
                      }
                    >
                      {statusOptions.map((e) => (
                        <option key={e} value={e}>
                          {capitalizeFirst(e)}
                        </option>
                      ))}
                    </Select>
                    {isLoadingStatus && <Button
                      align="center"
                      bg="transparent"
                      size="lg"
                      isLoading
                      disabled
                    ></Button>}
                  </Stack>
                </Stack>

                <Stack direction="column" spacing={0}>
                  <Text fontWeight="light">Curent Location:</Text>

                  <Flex align="center" gap={2}>
                    <Input
                      value={currentLocationState}
                      onChange={(e) => setCurrentLocationState(e.target.value)}
                    />
                    <Button onClick={handleCurrentLocation} isLoading={isCurLoading}>Save</Button>
                  </Flex>
                </Stack>
              </Flex>
              <Flex justifyContent="space-between">
                {pkg.isPaused && (
                  <Button
                    colorScheme="green"
                    leftIcon={<BiPlay />}
                    size="lg"
                    onClick={togglePause}
                    isLoading={isLoadingPause}
                  >
                    Continue
                  </Button>
                )}
                {!pkg.isPaused && (
                  <Button
                    colorScheme="teal"
                    leftIcon={<BiPause />}
                    size="lg"
                    onClick={togglePause}
                    isLoading={isLoadingPause}
                  >
                    Pause
                  </Button>
                )}
              </Flex>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </Layout>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  query,
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

  const { id } = query;

  const pkg = await new SqlizeService().getPackage({ id });

  if (!pkg) {
    res.setHeader("location", "/admin/packages");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        auth: { isLoggedIn: true, user: auth.user },
      },
    };
  }

  return {
    props: { auth: req.session.auth, pkg: JSON.parse(JSON.stringify(pkg)) },
  };
},
sessionOptions);

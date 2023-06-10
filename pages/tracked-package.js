import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import Layout from "../components/layouts/landing";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/auth/session-options";
import SqlizeService from "@/lib/database/services/sqlize";
import { capitalizeFirst } from "@/lib/helpers";
import { TfiLineDotted } from "react-icons/tfi";
import { FaRegDotCircle } from "react-icons/fa";
import useSWR from "swr";
import { useEffect } from "react";

const statusOptions = ["pending pickup", "in transit", "delivered"];

export default function Page({ pkg }) {
  const toast = useToast();
  const { data, isLoading } = useSWR(
    `/api/admin/is-paused?packageId=${pkg.id}`
  );
  const isPaused = data?.isPaused;

  useEffect(() => {
    if (isPaused !== undefined) {
      if (isPaused) {
        toast({
          title: "Error",
          description:
            "We have an issue with your package. Please call +1 (641) 247-8194 or chat with us. Thanks.",
          status: "error",
          duration: null,
          position: "top-right",
          isClosable: true,
        });
      }
    }
  }, [isPaused, toast]);

  return (
    <Layout noWrap>
      <Box pt={20}>
        <Container maxW="container.lg">
          <Stack direction="column" minH="100vh">
            <Card align="center" minH="20vh">
              <CardHeader>
                <Text fontWeight="black">Package Details</Text>
              </CardHeader>

              <CardBody align="center">
                <Heading>{pkg.packageContent}</Heading>
                <Text fontSize="xl">{`#${pkg.trackingNumber}`}</Text>

                <Flex justifyContent="space-between" pt={5}>
                  <Stack direction="column">
                    <Text>Status</Text>
                    <Tag colorScheme="orange" size="lg">
                      <Text fontWeight="bold">
                        {capitalizeFirst(pkg.deliveryStatus)}
                      </Text>
                    </Tag>
                  </Stack>
                  <Stack direction="column">
                    <Text>Weight</Text>
                    <Tag colorScheme="teal" size="lg">
                      <Text fontWeight="bold">{pkg.packageWeight}</Text>
                    </Tag>
                  </Stack>
                </Flex>
              </CardBody>
            </Card>

            <Card align="center">
              <CardBody align="center">
                <Stack direction="column" spacing={2}>
                  <Flex>
                    <Stack>
                      <Text fontSize="sm" fontWeight="medium">
                        From
                      </Text>
                      <Text>
                        {`${pkg.senderName} - `}
                        {`${pkg.fromAddress}`}
                        {pkg.fromCity?.id
                          ? `, ${pkg.fromCity.name} ${pkg.fromCity.state.name}, ${pkg.fromCity.state.country.name}`
                          : ""}
                      </Text>
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={0}
                      align="center"
                      verticalAlign="center"
                    >
                      <Icon as={FaRegDotCircle} />
                      <Icon boxSize={10} as={TfiLineDotted} />
                      <Icon as={FaRegDotCircle} />
                    </Stack>

                    <Stack>
                      <Text fontSize="sm" fontWeight="medium">
                        To
                      </Text>
                      <Text>
                        {`${pkg.recipientName} - `}
                        {`${pkg.toAddress}`}
                        {pkg.toCity?.id
                          ? `, ${pkg.toCity.name} ${pkg.toCity.state.name}, ${pkg.toCity.state.country.name}`
                          : ""}
                      </Text>
                    </Stack>
                  </Flex>

                  <Flex align="center" justifyContent="space-between">
                    <Stack direction="row" spacing={0} pt={5}>
                      <Stack
                        direction="column"
                        spacing={0}
                        align="center"
                        py={5}
                      >
                        <Icon
                          boxSize={4}
                          as={FaRegDotCircle}
                          color={
                            statusOptions[0] === pkg.deliveryStatus
                              ? "blue.900"
                              : "gray"
                          }
                        />
                        <Icon
                          boxSize={16}
                          as={TfiLineDotted}
                          transform="rotate(90deg)"
                          color="gray"
                        />
                        <Icon
                          boxSize={4}
                          as={FaRegDotCircle}
                          color={
                            statusOptions[1] === pkg.deliveryStatus
                              ? "blue.900"
                              : "gray"
                          }
                        />
                        <Icon
                          boxSize={16}
                          as={TfiLineDotted}
                          transform="rotate(90deg)"
                          color="gray"
                        />
                        <Icon
                          boxSize={4}
                          as={FaRegDotCircle}
                          color={
                            statusOptions[2] === pkg.deliveryStatus
                              ? "blue.900"
                              : "gray"
                          }
                        />
                      </Stack>

                      <Stack direction="column" spacing={6}>
                        <Stack direction="column" align="start" spacing={0}>
                          <Text fontSize="xl">Pending Pickup</Text>
                          <Text fontWeight="thin">
                            {statusOptions.indexOf(pkg.deliveryStatus) == 0
                              ? "In Progress"
                              : "Completed"}
                          </Text>
                        </Stack>
                        <Stack direction="column" align="start" spacing={0}>
                          <Text fontSize="xl">In Transit</Text>
                          <Text fontWeight="thin">
                            {statusOptions.indexOf(pkg.deliveryStatus) < 1
                              ? "Not There Yet"
                              : statusOptions.indexOf(pkg.deliveryStatus) == 1
                              ? "In Progress"
                              : "Completed"}
                          </Text>
                        </Stack>
                        <Stack direction="column" align="start" spacing={0}>
                          <Text fontSize="xl">Delivered</Text>
                          <Text fontWeight="thin">
                            {statusOptions.indexOf(pkg.deliveryStatus) < 2
                              ? "Not There Yet"
                              : statusOptions.indexOf(pkg.deliveryStatus) == 2
                              ? "In Progress"
                              : "Completed"}
                          </Text>
                        </Stack>
                      </Stack>
                    </Stack>

                    {/* <CircularProgress value={10} color="#0088b4" size="100px">
                      <CircularProgressLabel>10%</CircularProgressLabel>
                    </CircularProgress> */}
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  query,
}) {
  const { id } = query;

  const pkg = await new SqlizeService().getPackage({ id });

  if (!pkg) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
    return {
      props: {},
    };
  }

  return {
    props: {
      pkg: JSON.parse(JSON.stringify(pkg)),
    },
  };
},
sessionOptions);

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import Layout from "../components/layouts/landing";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/auth/session-options";
import SqlizeService from "@/lib/database/services/sqlize";
import { capitalizeFirst } from "@/lib/helpers";
import { TfiLineDotted } from "react-icons/tfi";
import { FaRegDotCircle } from "react-icons/fa";

export default function Page({ pkg }) {
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
                      <Text>{`${pkg.fromCity.name} ${pkg.fromCity.state.name}, ${pkg.fromCity.state.country.name}`}</Text>
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
                      <Text>{`${pkg.toCity.name} ${pkg.toCity.state.name}, ${pkg.toCity.state.country.name}`}</Text>
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
                        <Flex align="center">
                          <Icon boxSize={4} as={FaRegDotCircle} color="#0088b4" />
                        </Flex>
                        <Icon
                          boxSize={16}
                          as={TfiLineDotted}
                          transform="rotate(90deg)"
                          color="gray"
                        />
                        <Icon boxSize={4} as={FaRegDotCircle} color="gray" />
                        <Icon
                          boxSize={16}
                          as={TfiLineDotted}
                          transform="rotate(90deg)"
                          color="gray"
                        />
                        <Icon boxSize={4} as={FaRegDotCircle} color="gray" />
                      </Stack>

                      <Stack direction="column" spacing={6}>
                        <Stack direction="column" align="start" spacing={0}>
                          <Text fontSize="xl">Pending Pickup</Text>
                          <Text fontWeight="thin">12:32</Text>
                        </Stack>
                        <Stack direction="column" align="start" spacing={0}>
                          <Text fontSize="xl">In Transit</Text>
                          <Text fontWeight="thin">12:32</Text>
                        </Stack>
                        <Stack direction="column" align="start" spacing={0}>
                          <Text fontSize="xl">Delivered</Text>
                          <Text fontWeight="thin">12:32</Text>
                        </Stack>
                      </Stack>
                    </Stack>

										<CircularProgress value={10} color="#0088b4" size="100px">
											<CircularProgressLabel>10%</CircularProgressLabel>
										</CircularProgress>
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

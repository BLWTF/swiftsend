import Layout from "../../components/layouts/account";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/auth/session-options";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import { formatSets, getSets } from "@/lib/helpers";

export default function Customers({ router, auth }) {
  const [pagination, setPagination] = useState({
    set: 1,
    limit: 5,
  });
  const [searchQuery, setSearchQuery] = useState(null);
  const url = `/api/admin/customers?set=${pagination.set}&limit=${
    pagination.limit
  }${searchQuery ? "&search=" + searchQuery : ""}`;
  const { data, error, isLoading } = useSWR(url);
  const customers = data?.customers;
  const customersCount = data?.count;

  return (
    <Layout router={router} auth={auth}>
      <Box p={2}>
        <Box pb={5}>
          <Heading as="h3" variant="page-title">
            Customers
          </Heading>
        </Box>

        <Box>
          <CustomersPaginatedTable
            customers={customers}
            customersCount={customersCount}
            pagination={pagination}
            setPagination={pagination}
            setSearchQuery={setSearchQuery}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </Layout>
  );
}

const CustomersPaginatedTable = ({
  customers,
  customersCount,
  pagination,
  setPagination,
  setSearchQuery,
  isLoading,
}) => {
  const setsList = formatSets(getSets(customersCount, pagination.limit));
  const btns = [
    {
      text: "Previous",
    },
    ...setsList,
    {
      text: "Next",
    },
  ];
  const start = pagination.limit * (pagination.set - 1) + 1;

  function handlePaginate(e) {
    switch (e.target.id) {
      case "Previous":
        setPagination((values) => ({
          ...values,
          set: values.set - 1,
        }));
        break;

      case "Next":
        setPagination((values) => ({
          ...values,
          set: values.set + 1,
        }));
        break;

      default:
        setPagination((values) => ({
          ...values,
          set: +e.target.id,
        }));
        break;
    }
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        pb={5}
      >
        <Input
          size="xs"
          width="100px"
          placeholder="Search"
          onChange={handleSearch}
        />

        <Flex align="center">
          <Text fontSize="sm" pr={2}>
            Rows:
          </Text>
          <Box width="60px">
            <Select
              size="xs"
              value={pagination.limit}
              onChange={(e) => {
                setPagination((values) => ({
                  ...values,
                  set: 1,
                  limit: e.target.value,
                }));
              }}
            >
              <option>5</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </Select>
          </Box>
        </Flex>
      </Box>
      {isLoading && (
        <Flex>
          <Button
            align="center"
            bg="transparent"
            size="lg"
            isLoading
            disabled
          ></Button>
        </Flex>
      )}
      {!isLoading && (
        <TableContainer>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>City</Th>
                <Th>Address</Th>
                <Th>Password</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers.length === 0 && (
                <Tr textAlign="center" p={2}>
                  <Td align="center" textAlign="center" p={5}>
                    No customers
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        pt={2}
      >
        <Text fontSize="xs" pr={2}>
          Showing {start} to {customers?.length ?? ""} of{" "}
          {customersCount} entries
        </Text>

        <Stack fontSize="xs" direction="row" spacing={0}>
          {btns.map((btn) => {
            const isSet = pagination.set === btn.text;
            const canPrevious =
              btn.text === "Previous" && !setsList[pagination.set - 2];
            const canNext = btn.text === "Next" && !setsList[pagination.set];
            const isActive = isSet;
            const isDisabled = canPrevious || canNext;
            return (
              <Button
                key={btn.text}
                id={btn.text}
                size="xs"
                isActive={isActive}
                isDisabled={isDisabled}
                onClick={handlePaginate}
              >
                {btn.text}
              </Button>
            );
          })}
        </Stack>
      </Box>
    </>
  );
};
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

  return {
    props: { auth: req.session.auth },
  };
},
sessionOptions);

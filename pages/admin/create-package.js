import { capitalizeFirst } from "@/lib/helpers";
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Layout from "../../components/layouts/account";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/auth/session-options";
import AsyncSelect from "react-select/async";
import axios from "axios";
import CustomButton from "@/components/custom-button";

export default function Create({ router, auth }) {
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [senderCountry, setSenderCountry] = useState(null);
  const [senderState, setSenderState] = useState(null);
  const [senderCity, setSenderCity] = useState(null);
  const [recipientCountry, setRecipientCountry] = useState(null);
  const [recipientState, setRecipientState] = useState(null);
  const [recipientCity, setRecipientCity] = useState(null);
  const toast = useToast();

  function handleChange(event) {
    const name = event.target.name;
    const value =
      event.target.type === "text"
        ? capitalizeFirst(event.target.value)
        : event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("/api/admin/create-package", inputs);

      router.push("/admin/packages");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleSenderCountry = (event) => {
    setSenderCountry(event.value);
  };

  const handleSenderState = (event) => {
    setSenderState(event.value);
  };

  const handleSenderCity = (event) => {
    setSenderCity(event.value);
    setInputs((values) => ({ ...values, senderCityId: event.value }));
  };

  const handleRecipientCountry = (event) => {
    setRecipientCountry(event.value);
  };

  const handleRecipientState = (event) => {
    setRecipientState(event.value);
  };

  const handleRecipientCity = (event) => {
    setRecipientCity(event.value);
    setInputs((values) => ({ ...values, recipientCityId: event.value }));
  };

  const searchSenderCountries = async (query) => {
    const res = await axios.get(`/api/country?search=${query}`);
    return res.data.countries;
  };

  const searchSenderStates = async (query) => {
    const res = await axios.get(
      `/api/state?countryId=${senderCountry}&search=${query}`
    );
    return res.data.states;
  };

  const searchSenderCities = async (query) => {
    const res = await axios.get(`/api/city?stateId=${senderState}&search=${query}`);
    return res.data.cities;
  };
  
	const searchRecipientCountries = async (query) => {
    const res = await axios.get(`/api/country?search=${query}`);
    return res.data.countries;
  };

  const searchRecipientStates = async (query) => {
    const res = await axios.get(
      `/api/state?countryId=${recipientCountry}&search=${query}`
    );
    return res.data.states;
  };

  const searchRecipientCities = async (query) => {
    const res = await axios.get(`/api/city?stateId=${recipientState}&search=${query}`);
    return res.data.cities;
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const res = await axios.get("/api/admin/generate-tracking-number", {
        signal: controller.signal,
      });
      const { gen } = res.data;
      setInputs((values) => ({ ...values, trackingNumber: gen }));
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Layout router={router} auth={auth}>
      <Box p={2}>
        <Box pb={5}>
          <Heading as="h3" variant="page-title">
            Create Package
          </Heading>
        </Box>

        <Box>
          <form onSubmit={handleSubmit}>
            <Stack direction={{ base: "column", md: "row" }} spacing={2} pb={2}>
              <FormControl isRequired>
                <FormLabel>Tracking Number</FormLabel>
                <Input
                  type="text"
                  name="trackingNumber"
                  value={inputs.trackingNumber ?? ""}
                  onChange={handleChange}
                  isReadOnly
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Sender Name</FormLabel>
                <Input
                  type="text"
                  name="senderName"
                  value={inputs.senderName ?? ""}
                  onChange={handleChange}
                />
              </FormControl>
            </Stack>
            <Stack direction={{ base: "column", md: "row" }} spacing={2} pb={2}>
              <FormControl isRequired>
                <FormLabel>Recipient Name</FormLabel>
                <Input
                  type="text"
                  name="recipientName"
                  value={inputs.recipientName ?? ""}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Sender Address</FormLabel>
                <Input
                  type="text"
                  name="fromAddress"
                  value={inputs.fromAddress ?? ""}
                  onChange={handleChange}
                />
              </FormControl>
            </Stack>
            <Stack direction={{ base: "column", md: "row" }} spacing={2} pb={2}>
              <FormControl isRequired>
                <FormLabel>Recipient Address</FormLabel>
                <Input
                  type="text"
                  name="toAddress"
                  value={inputs.toAddress ?? ""}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Sender Country</FormLabel>
                <AsyncSelect
                  loadOptions={searchSenderCountries}
                  onChange={handleSenderCountry}
                />
              </FormControl>
            </Stack>
            <Stack direction={{ base: "column", md: "row" }} spacing={2} pb={2}>
              <FormControl isRequired>
                <FormLabel>Sender State</FormLabel>
                <AsyncSelect
                  loadOptions={searchSenderStates}
                  onChange={handleSenderState}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Sender City</FormLabel>
                <AsyncSelect
                  loadOptions={searchSenderCities}
                  onChange={handleSenderCity}
                />
              </FormControl>
            </Stack>
            <Stack direction={{ base: "column", md: "row" }} spacing={2} pb={2}>
              <FormControl isRequired>
                <FormLabel>Recipient Country</FormLabel>
                <AsyncSelect
                  loadOptions={searchRecipientCountries}
                  onChange={handleRecipientCountry}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Recipient State</FormLabel>
                <AsyncSelect
                  loadOptions={searchRecipientStates}
                  onChange={handleRecipientState}
                />
              </FormControl>
            </Stack>
            <Stack direction={{ base: "column", md: "row" }} spacing={2} pb={2}>
              <FormControl isRequired>
                <FormLabel>Recipient City</FormLabel>
                <AsyncSelect
                  loadOptions={searchRecipientCities}
                  onChange={handleRecipientCity}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Content</FormLabel>
                <Input 
									type="text"
									name="packageContent"
									value={inputs.packageContent}
									onChange={handleChange}
								/>
              </FormControl>
            </Stack>
            <Stack direction={{ base: "column", md: "row" }} spacing={2} pb={2}>
              <FormControl isRequired>
                <FormLabel>Weight</FormLabel>
                <Input 
									type="text"
									name="packageWeight"
									value={inputs.packageWeight}
									onChange={handleChange}
								/>
              </FormControl>
              <FormControl>
                <FormLabel>Note</FormLabel>
								<Textarea 
									name="note"
									value={inputs.note}
									onChange={handleChange}
								/>
              </FormControl>
            </Stack>
            <CustomButton mt={5} size="lg" type="submit" isLoading={isLoading}>
              Create
            </CustomButton>
          </form>
        </Box>
      </Box>
    </Layout>
  );
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

  return {
    props: { auth: req.session.auth },
  };
},
sessionOptions);

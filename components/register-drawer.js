import useAuth from "@/lib/auth/useAuth";
import {
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormInput } from "./form-input";
import CustomButton from "./custom-button";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { capitalizeFirst } from "@/lib/helpers";

export default function RegisterDrawer({ isOpen, onClose, onLoginOpen }) {
  const { mutateAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({});
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (inputs.password !== "" && inputs.password !== inputs.confirmPassword) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }
  }, [inputs]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "text"
        ? capitalizeFirst(event.target.value)
        : event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      mutateAuth(await axios.post("/api/admin/users/create-customer", inputs));
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error logging in",
        description: error.message,
        status: "error",
        duration: 9000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCountry = (event) => {
    setCountryId(event.value);
  };

  const handleState = (event) => {
    setStateId(event.value);
  };

  const handleCity = (event) => {
    setCityId(event.value);
    setInputs((values) => ({ ...values, cityId: event.value }));
  };

  const searchCountries = async (query) => {
    const res = await axios.get(`/api/country?search=${query}`);
    return res.data.countries;
  };

  const searchStates = async (query) => {
    const res = await axios.get(
      `/api/state?countryId=${countryId}&search=${query}`
    );
    return res.data.states;
  };

  const searchCities = async (query) => {
    const res = await axios.get(`/api/city?stateId=${stateId}&search=${query}`);
    return res.data.cities;
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size={{ base: "full", md: "lg" }}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <Container
          pt={10}
          pb={20}
          alignItems="center"
          justifyContent="center"
          maxW="8xl"
          minH={"100vh"}
        >
          <DrawerHeader>
            <Heading>Sign Up</Heading>
          </DrawerHeader>

          <DrawerBody height="100%">
            <form onSubmit={handleSubmit} autoComplete="off">
              <Stack direction={{ base: "column", md: "row" }} spacing={2}>
                <FormControl isRequired>
                  <FormInput
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                    value={inputs.firstName}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormInput
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                    value={inputs.lastName}
                  />
                </FormControl>
              </Stack>
              <Stack direction={{ base: "column", md: "row" }} spacing={2}>
                <FormControl isRequired>
                  <FormInput
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={inputs.email}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormInput
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                    value={inputs.phone}
                  />
                </FormControl>
              </Stack>
              <Stack direction={{ base: "column", md: "row" }} spacing={2}>
                <FormControl isRequired>
                  <FormLabel>Country</FormLabel>
                  <AsyncSelect
                    loadOptions={searchCountries}
                    onChange={handleCountry}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>State</FormLabel>
                  <AsyncSelect
                    loadOptions={searchStates}
                    onChange={handleState}
                  />
                </FormControl>
              </Stack>
              <Stack direction={{ base: "column", md: "row" }} spacing={2}>
                <FormControl isRequired>
                  <FormLabel>City</FormLabel>
                  <AsyncSelect
                    loadOptions={searchCities}
                    onChange={handleCity}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormInput
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    onChange={handleChange}
                    value={inputs.zipCode}
                  />
                </FormControl>
              </Stack>
              <Stack direction={{ base: "column", md: "row" }} spacing={2}>
                <FormControl isRequired>
                  <FormInput
                    type="text"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    value={inputs.address}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    autoComplete="new-password"
                    value={inputs.password}
                  />
                </FormControl>
              </Stack>
              <Stack direction={{ base: "column", md: "row" }} spacing={2}>
                <FormControl isRequired isInvalid={isPasswordError}>
                  <FormInput
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    autoComplete="new-password"
                    value={inputs.confirmPassword}
                  />
                  <FormErrorMessage>Passwords must match!</FormErrorMessage>
                </FormControl>
              </Stack>
              <CustomButton
                mt={5}
                size="lg"
                type="submit"
                isLoading={isLoading}
                isDisabled={isPasswordError}
              >
                Sign Up
              </CustomButton>
              <Flex>
                <Text fontSize="sm">{"Already have an account? "}</Text>
                <Link
                  href="#"
                  onClick={(e) => {
                    onClose();
                    onLoginOpen();
                  }}
                >
                  <Text color="blue" fontSize="sm" pl={2}>
                    Sign In
                  </Text>
                </Link>
              </Flex>
            </form>
          </DrawerBody>
        </Container>
      </DrawerContent>
    </Drawer>
  );
}

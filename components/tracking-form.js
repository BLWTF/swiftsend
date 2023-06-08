import { Box, Button, Input, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function TrackingForm() {
  const [trackingNumber, setTrackingNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  async function handleSubmit() {
    setIsLoading(true);
    const res = await axios.get(
      `/api/check-tracking-number?trackingNumber=${trackingNumber}`
    );
    const { pkg } = res.data;
    if (!pkg) {
      toast({
        title: "Error",
        description: "Please check the number and try again.",
        status: "error",
        duration: 9000,
        position: "top-right",
      });
      setIsLoading(false);
      return;
    }
    router.push(`/tracked-package?id=${pkg.id}`);
    setIsLoading(false);
  }
  return (
    <Box
      p={3}
      style={{
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 8.55px 0.45px rgba(0,0,0,.27)",
      }}
    >
      <Text fontWeight="bold" fontSize="xs">
        Enter your tracking Number
      </Text>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={2}
        pt={3}
        align="center"
      >
        <Input
          flex={{ base: null, md: 2 }}
          placeholder="Tracking No."
          value={trackingNumber ?? ""}
          onChange={(e) => {
            setTrackingNumber(e.target.value.toLocaleUpperCase());
          }}
        />
        <Button
          bg="#0088b4"
          color="#FFF"
          whiteSpace="normal"
          height="auto"
          blockSize="auto"
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          <Text flex={{ base: null, md: 1 }} fontSize="xs" padding={3}>
            TRACK YOUR SHIPMENT
          </Text>
        </Button>
      </Stack>
    </Box>
  );
}

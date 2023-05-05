import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";

export default function TrackingForm() {
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
        <Input flex={{ base: null, md: 2 }} placeholder="Tracking No." />
        <Button bg="#0088b4" color="#FFF" whiteSpace="normal" height="auto" blockSize="auto">
          <Text flex={{ base: null, md: 1 }} fontSize="xs" padding={3}>
            TRACK YOUR SHIPMENT
          </Text>
        </Button>
      </Stack>
    </Box>
  );
}

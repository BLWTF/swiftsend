import { SWRConfig } from "swr";
import fetcher from "../lib/fetcher";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/lib/theme";

export default function App({ Component, pageProps, router }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} key={router.route} />
      </ChakraProvider>
    </SWRConfig>
  );
}

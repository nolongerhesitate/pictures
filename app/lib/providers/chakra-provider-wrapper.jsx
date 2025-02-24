"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import theme from "@/app/lib/theme.js";


export default function ChakraProviderWrapper({ children }) {


  return (
    <ChakraProvider theme={theme} >
      {children}
    </ChakraProvider>
  );
}


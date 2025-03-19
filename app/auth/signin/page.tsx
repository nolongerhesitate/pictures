"use client";

import Logo from "@/app/ui/logo";
import LoginForm from "@/app/ui/login-form";
import { Flex, Text, Box } from "@chakra-ui/react";
import useStylesColorMode from "@/app/lib/hooks/useStylesColorMode";

export default function Page() {
  const stylesColorMode = useStylesColorMode();


  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      height="100vh"
      width="100vw"
      gap={6}
    >
      {/* <main className="flex flex-col justify-center items-center h-dvh w-dvw"> */}
      <Box width="300px">
        <Logo />
        <Box textAlign="center" my={2}>
          <Text fontSize="2xl" as="b"
            className="my-0 py-0"
            color={stylesColorMode.fontColor}
          >R-Pictures</Text>
          <Text fontSize="xl"
            className="my-0 py-0"
            color={useStylesColorMode("gray.600", "#f5f5f5")}
          >Management</Text>
        </Box>
        <LoginForm />
      </Box>
    </Flex >
    // </main>
  );
}


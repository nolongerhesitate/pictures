import Logo from "@/app/ui/logo";
import LoginForm from "@/app/ui/login-form";
import { Flex, Text, Box } from "@chakra-ui/react";

export default function Page() {
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
      <Logo />
      <Box textAlign="center">
        <Text fontSize="2xl" as="b"
          className="my-0 py-0"
          color="gray.700"
        >R-Wallpapers</Text>
        <Text fontSize="xl"
          className="my-0 py-0"
          color="gray.600"
        >Management</Text>
      </Box>
      <LoginForm />
    </Flex >
    // </main>
  );
}


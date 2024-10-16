import { Flex } from "@chakra-ui/react";
import Header from "../ui/dashboard/header";
import SideNav from "../ui/dashboard/sidenav";

export default function Layout({ children }) {
  return (
    <Flex
      width="100vw"
      height="100vh"
      direction="column"
      px="10px"
    >
      <Header></Header>
      <Flex
        width="100vw"
        height="100vh"
        mt="10px"
      >
        <SideNav
          mr="10px"
          p="20px"
          gap="10px"
          minW="3xs"
        ></SideNav>
        <div className="w-full">
          {children}
        </div>
      </Flex>
    </Flex>
  );
}


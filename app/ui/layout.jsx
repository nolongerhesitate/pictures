import { Flex } from "@chakra-ui/react";
import Header from "../ui/dashboard/header";
import SideNav from "../ui/dashboard/sidenav";
import Dialog from "@/app/ui/components/dialog";

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
        width="100%"
        height="100%"
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
      <Dialog />
    </Flex>
  );
}


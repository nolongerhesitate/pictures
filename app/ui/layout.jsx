import { Flex } from "@chakra-ui/react";
import Header from "./components/header";
import SideNav from "./components/sidenav";
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
          mr="1.8rem"
          w="3rem"
        />
        <div className="w-full">
          {children}
        </div>
      </Flex>
      <Dialog />
    </Flex>
  );
}


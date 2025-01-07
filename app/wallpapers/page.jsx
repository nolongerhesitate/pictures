import Layout from "../ui/layout";
import { Flex } from "@chakra-ui/react";
import TopBar from "../ui/wallpapers/top-bar";

export default function Page() {
  return (
    <Layout>
      <Flex
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        gap={6}
      >
        <TopBar></TopBar>
        <div>
          this is content
        </div>
        <div>
          this is Pagination
        </div>
      </Flex>
    </Layout>
  );
}

"use client";

import Layout from "../ui/layout";
import { Flex } from "@chakra-ui/react";
import TopBar from "../ui/pictures/top-bar";
import MainContent from "../ui/pictures/main-content";
import Pagination from "../ui/components/pagination";
import { useState } from "react";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSelectedPics, setIsSelectedPics] = useState(false);


  return (
    <Layout>
      <Flex
        direction="column"
        justifyContent="space-between"
        // alignItems="stretch"
        gap={6}
      >
        <TopBar
          isSelectedPics={isSelectedPics}
        />
        <MainContent
          currentPage={currentPage}
          setTotalPages={setTotalPages}
          setIsSelectedPics={setIsSelectedPics}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </Flex>
    </Layout >
  );
}

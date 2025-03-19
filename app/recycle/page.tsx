"use client";

import Layout from "../ui/layout";
import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import TopBar from "@/app/ui/recycle/top-bar";
import MainContent from "@/app/ui/recycle/main-content";
import Pagination from "@/app/ui/components/pagination";

export default function Page() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isSelectedPics, setIsSelectedPics] = useState<boolean>(false);


  return (
    <Layout>
      <Flex
        direction="column"
        justifyContent="space-between"
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
    </Layout>
  );
}

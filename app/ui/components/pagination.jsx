"use client";

import { Flex, Button } from "@chakra-ui/react";
import { useState } from "react";

// hook
/*
const usePagination = (itemsPerPage, data) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  return { currentPage, totalPages, getCurrentItems, goToPage };
};
*/

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Flex
      gap="0.5rem"
    >
      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        isDisabled={currentPage === 1}
        variant="outline"
        colorScheme="orange"
        size="sm"
      >
        Previous
      </Button>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => setCurrentPage(number)}
          variant={number === currentPage ? "solid" : "outline"}
          colorScheme="orange"
          isDisabled={number === currentPage}
          size="sm"
        >
          {number}
        </Button>
      ))}
      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        variant="outline"
        colorScheme="orange"
        size="sm"
      >
        Next
      </Button>
    </Flex>
  );
}

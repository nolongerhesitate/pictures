import { Flex, Button } from "@chakra-ui/react";
import { SetUseState } from "@/app/lib/types";


export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage
}: {
  currentPage: number,
  totalPages: number,
  setCurrentPage: SetUseState<number>
}) {
  const pageNumbers: number[] = [];
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

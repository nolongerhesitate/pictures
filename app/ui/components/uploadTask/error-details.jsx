import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { Button } from "@chakra-ui/react";

export default function ErrorDetails({ details, onClose, ...props }) {

  return (
    <Modal
      closeOnOverlayClick={false}
      onClose={onClose}
      size="xl"
      {...props}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Error Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>
                    File Name
                  </Th>
                  <Th>
                    Reason
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  details.map(detail => (
                    <Tr key={detail.id}>
                      <Td>{detail.fileName}</Td>
                      <Td color="red">{detail.reason}</Td>
                    </Tr>
                  ))
                }
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal >
  );
}

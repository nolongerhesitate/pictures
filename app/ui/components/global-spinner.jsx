import { Modal, ModalOverlay, ModalContent, Spinner } from "@chakra-ui/react";

export default function GlobalSpinner() {
  return (
    <Modal isOpen={true} isCentered>
      <ModalOverlay />
      <ModalContent bg="none">
        <Spinner
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="#EC8678"
          size="xl"
        />
      </ModalContent>
    </Modal>
  );
}

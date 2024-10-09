import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from '@chakra-ui/react'
import { useRef } from "react";

export default function Dialog({ buttonType = 1, ...props }) {
  // buttonType: 1-Yes&Cancel, 2-Yes&No&Cancel
  const {
    isOpen,
    onClose,
    title,
    content,
    // return true if Yes is clicked, false if No is clicked, otherwise cancel
    setDialogResult,
  } = props;
  const cancelRef = useRef()

  function handleClick(e) {
    e.stopPropagation();
    const id = e.target.id;
    setDialogResult(id === "yes" ? true : id === "no" ? false : null);
    onClose();
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            {content}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button id="yes" colorScheme='red' onClick={handleClick} mr={3}>
              Yes
            </Button>
            {
              buttonType === 2 && (
                <Button id="no" colorScheme='blue' mr={3} onClick={handleClick}>
                  No
                </Button>
              )
            }
            <Button id="cancel" ref={cancelRef} onClick={handleClick}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

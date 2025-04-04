"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { useRef } from "react";
import { closeDialog, useDialog, useDialogDispatch } from "@/app/lib/contexts/dialogContext";

export default function Dialog() {
  const cancelRef = useRef()
  const dialog = useDialog();
  const dialogDispatch = useDialogDispatch();


  if (dialog.isOpen === false) {
    return null;
  }

  function handleClick(e) {
    e.stopPropagation();
    const id = e.target.id;
    dialog.setDialogResult(id === "yes" ? true : id === "no" ? false : null);

    dialogDispatch(closeDialog());
  }

  return (
    <AlertDialog
      isOpen={dialog.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={null}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {dialog.title}
          </AlertDialogHeader>

          <AlertDialogBody>
            {dialog.content}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button id="yes" colorScheme='red' onClick={handleClick} mr={3}>
              Yes
            </Button>
            {
              dialog.buttonType === 2 && (
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

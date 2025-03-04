"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Grid, GridItem } from "@chakra-ui/react";
import { Button, Select, Text } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { useState } from "react";

export default function Settings({ isOpen, onClose }) {
  const { colorMode, setColorMode } = useColorMode();
  const [theme, setTheme] = useState(colorMode);

  const handleSave = () => {
    setColorMode(theme);
    onClose();
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid
            gridTemplate="auto auto / auto auto"
            alignItems="end"
          >
            <GridItem>
              <Text>Theme:</Text>
            </GridItem>
            <GridItem>
              <Select
                size="sm"
                value={theme}
                onChange={(e) => {
                  setTheme(e.target.value);
                  setColorMode(e.target.value);
                }}
              >
                <option value="light">Light mode</option>
                <option value="dark">Dark mode</option>
                <option value="system">System</option>
              </Select>
            </GridItem>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            colorScheme="red"
            onClick={handleSave}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

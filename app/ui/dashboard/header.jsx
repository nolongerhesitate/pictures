"use client";

import {
  Flex,
  Text, Input, InputGroup,
  InputLeftElement, Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import Logo from "../logo";
import Dialog from "../components/dialog";
import { useState } from "react";
import { signOut } from "next-auth/react"
import { useSelector } from "react-redux";
import { selectUser } from "@/app/lib/store/userSlice";

export default function Header() {
  const { isOpen, onOpen, onClose, } = useDisclosure();
  const [dialogResult, setDialogResult] = useState(null);
  const currentUser = useSelector(selectUser);

  if (dialogResult) {
    signOut();
  }

  return (
    <Flex
      height="60px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex
        alignItems="center"
        minW="170px">
        <Logo width={50} height={50}></Logo>
        <Text fontSize="xl" color="gray.700">
          R-Wallpapers
        </Text>
      </Flex>
      <InputGroup width="500px">
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input placeholder="Search" />
      </InputGroup>
      <Menu>
        <MenuButton>
          <Avatar name={currentUser.username} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpen}>Sign Out</MenuItem>
        </MenuList>
      </Menu>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        title="Sign Out"
        content="Do you want to sign out?"
        setDialogResult={setDialogResult}
      />
    </Flex >
  );
}

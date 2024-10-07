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
import { Search2Icon } from "@chakra-ui/icons";
import Logo from "../logo";

export default function Header() {
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
          <Avatar name="Name" />
        </MenuButton>
        <MenuList>
          <MenuItem >SignOut</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

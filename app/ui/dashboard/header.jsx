"use client";

import {
  Flex, Spacer,
  Text, Input, InputGroup,
  InputLeftElement, Avatar,
  Menu, MenuButton, MenuList, MenuItem,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import Logo from "../logo";
import { useState } from "react";
import { signOut } from "next-auth/react"
import { useSelector } from "react-redux";
// import { selectUser } from "@/app/lib/store/userSlice";
import { selectUploadTasks } from "@/app/lib/store/uploadTasksSlice";
import { showYesCancelDialog, useDialogDispatch } from "@/app/lib/contexts/dialogContext";
import { useSession } from "next-auth/react";
import UploadTasks from "../components/uploadTask/upload-tasks";


export default function Header() {
  const [dialogResult, setDialogResult] = useState(null);
  // const currentUser = useSelector(selectUser);
  const dialogDispatch = useDialogDispatch();
  const { data: session } = useSession();
  const allUploadTasks = useSelector(selectUploadTasks);

  const uploadTasksComp = (
    <>
      <UploadTasks />
      <Spacer width="10px" />
    </>
  );

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

      <Flex
        alignItems="center"
      >
        {
          allUploadTasks.tasks.length > 0 && uploadTasksComp
        }

        <Menu>
          <MenuButton>
            <Avatar name={session?.user.username} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() =>
              dialogDispatch(showYesCancelDialog("Do you want to sing out?", setDialogResult))
            }>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex >
  );
}

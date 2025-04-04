"use client";

import {
  Input, InputGroup,
  InputLeftElement, Avatar,
  InputRightElement,
  Menu, MenuButton, MenuList, MenuItem,
} from "@chakra-ui/react";
import { IconButton, Flex, Spacer, Text } from "@chakra-ui/react";
import { Search2Icon, CloseIcon } from "@chakra-ui/icons";
import Logo from "../logo";
import { useState } from "react";
import { signOut } from "next-auth/react"
import { useSelector } from "react-redux";
import { selectUploadTasks } from "@/app/lib/store/uploadTasksSlice";
import { useDispatch } from "react-redux";
import { showYesCancelDialog, useDialogDispatch } from "@/app/lib/contexts/dialogContext";
import { useSession } from "next-auth/react";
import UploadTasks from "./uploadTask/upload-tasks";
import { searchPictures } from "@/app/lib/store/pictureStateSlice";
import Settings from "@/app/ui/components/settings";
import { useDisclosure } from "@chakra-ui/react";
import useStylesColorMode from "@/app/lib/hooks/useStylesColorMode";


export default function Header() {
  const [dialogResult, setDialogResult] = useState(null);
  const dialogDispatch = useDialogDispatch();
  const { data: session } = useSession();
  const allUploadTasks = useSelector(selectUploadTasks);
  const dispatch = useDispatch();
  const [searchFeed, setSearchFeed] = useState("");
  const { isOpen: isOpenSettings, onOpen: onOpenSettings, onClose: onCloseSettings } = useDisclosure();
  const stylesColorMode = useStylesColorMode();

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
        <Text fontSize="xl" color={stylesColorMode.fontColor}>
          Pictures
        </Text>
      </Flex>

      <InputGroup width="500px">
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search"
          value={searchFeed}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSearchFeed(e.target.value)}
          onKeyUp={(e: React.KeyboardEvent) => {
            if (e.key === "Enter")
              dispatch(searchPictures({ searchFeed: searchFeed }));
          }}
        />
        {searchFeed !== "" && (
          <InputRightElement>
            <IconButton
              isRound={true}
              icon={<CloseIcon color="white.500" />}
              size="xs"
              aria-label="clear search"
              onClick={() => setSearchFeed("")}
            />
          </InputRightElement>
        )}
      </InputGroup>

      <Flex
        alignItems="center"
      >
        {
          allUploadTasks.tasks.length > 0 && uploadTasksComp
        }

        <Menu>
          <MenuButton>
            <Avatar name={session?.user?.username} boxSize="2.4rem" />
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={onOpenSettings}
            >
              Settings
            </MenuItem>
            <MenuItem
              onClick={() =>
                dialogDispatch(
                  showYesCancelDialog(
                    "Do you want to sing out?",
                    setDialogResult
                  )
                )
              }
            >
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Settings
        isOpen={isOpenSettings}
        onClose={onCloseSettings}
      />
    </Flex >
  );
}

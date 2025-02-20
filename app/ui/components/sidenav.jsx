"use client";

import { usePathname } from "next/navigation";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { TiImage } from "react-icons/ti";
import { useRouter } from "next/navigation";


export default function SideNav({ ...props }) {
  const pathname = usePathname();
  const router = useRouter();

  const styles = {
    IconButton: {
      color: "orange",
      variant: "link",
      boxSize: "3rem",
      // iconSize: "1.5rem",
      _hover: {
        background: "gray.100",
      },
    },
    IconButtonSelected: {
      background: "orange.100",
      _hover: {},
    },
  };


  return (
    <Flex
      direction="column"
      {...props}
    >
      <Tooltip label="Pictures">
        <IconButton
          aria-label="pictures"
          icon={<TiImage fontSize="1.4rem" />}
          onClick={() => router.push("/pictures")}
          {...styles.IconButton}
          {...((pathname === "/pictures") && styles.IconButtonSelected)}
        />
      </Tooltip>
      <Tooltip label="Recycle Bin">
        <IconButton
          aria-label="recycle"
          icon={<DeleteIcon fontSize="1.3rem" />}
          onClick={() => router.push("/recycle")}
          {...styles.IconButton}
          {...((pathname === "/recycle") && styles.IconButtonSelected)}
        />
      </Tooltip>
    </Flex>
  );
}

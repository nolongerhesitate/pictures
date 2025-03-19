"use client";

import { usePathname } from "next/navigation";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { TiImage } from "react-icons/ti";
import { useRouter } from "next/navigation";
import useStylesColorMode from "@/app/lib/hooks/useStylesColorMode";


export default function SideNav({ ...props }) {
  const pathname = usePathname();
  const router = useRouter();
  const stylesColorMode = useStylesColorMode();

  const styles = {
    IconButton: {
      color: "orange",
      variant: "link",
      boxSize: "3rem",
      // iconSize: "1.5rem",
      _hover: {
        background: stylesColorMode._hoverBgColor,
      },
    },
    IconButtonSelected: {
      background: stylesColorMode.bgColor,
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

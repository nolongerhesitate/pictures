"use client";

import { Flex, Tooltip, IconButton } from "@chakra-ui/react";
import { FaTrashRestore } from "react-icons/fa";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { restoreRecyclePictures, deleteRecyclePictures } from "@/app/lib/store/pictureStateSlice";
import { showYesCancelDialog, useDialogDispatch } from "@/app/lib/contexts/dialogContext";
import { useState, useEffect, useRef } from "react";


export default function TopBar({
  isSelectedPics
}: {
  isSelectedPics: boolean
}) {
  const [dialogResult, setDialogResult] = useState(null);
  const clickedButtonRef = useRef(null);
  const dispatch = useDispatch();
  const dialogDispatch = useDialogDispatch();


  const styles = {
    IconButton: {
      isRound: true,
      variant: "outline",
      isDisabled: !isSelectedPics,
    }
  };

  useEffect(() => {
    if (dialogResult !== true) return;

    if (clickedButtonRef.current === "restore") {
      dispatch(restoreRecyclePictures({ isRestoreRecyclePictures: true }));
    } else if (clickedButtonRef.current === "delete") {
      dispatch(deleteRecyclePictures({ isDeleteRecyclePictures: true }));
    }

    setDialogResult(null);
    clickedButtonRef.current = null;
  }, [dialogResult]);


  return (
    <Flex
      justifyContent="flex-start"
      gap="1rem"
    >
      <Tooltip label="Restore">
        <IconButton
          icon={<FaTrashRestore />}
          aria-label="restore pictures"
          onClick={() => {
            clickedButtonRef.current = "restore";
            dialogDispatch(
              showYesCancelDialog(
                "Do you want to restore selected pictures?",
                setDialogResult,
              )
            );
          }}
          {...styles.IconButton}
        />
      </Tooltip>
      <Tooltip label="Delete">
        <IconButton
          icon={<DeleteIcon />}
          aria-label="delete pictures"
          onClick={() => {
            clickedButtonRef.current = "delete";
            dialogDispatch(
              showYesCancelDialog(
                "Are you sure you want to delete the selected pictures forever?",
                setDialogResult,
              )
            )
          }}
          color="red"
          borderColor="red"
          _hover={{
            background: "red.100"
          }}
          {...styles.IconButton}
        />
      </Tooltip>
    </Flex>
  );
}

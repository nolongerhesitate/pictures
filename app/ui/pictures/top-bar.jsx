"use client";

import { Flex, IconButton, Box, Tooltip, Input } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { useRef, useState, useEffect } from "react";
import apiUtil from "@/app/lib/utils/apiUtil";
import { useSelector, useDispatch } from "react-redux";
import { selectUploadTasks, addTask, addErrorDetail, completedCountPlusOne, skippedCountPlusOne, failedCountPlusOne } from "@/app/lib/store/uploadTasksSlice";
import { ErrorDetail, UploadTask } from "@/app/lib/definitions";
import dayjs from "dayjs";
import emitter, { EVENTS } from "@/app/lib/emitter";


export default function TopBar({
  isSelectedPics
}) {
  const fileInputRef = useRef(null);
  const uploadTaskIdRef = useRef(null);
  const abortUploadRef = useRef(false);
  const reduxDispatch = useDispatch();
  const allUploadTasks = useSelector(selectUploadTasks);

  const styles = {
    IconButton: {
      isRound: true,
      variant: "outline",
    }
  };

  useEffect(() => {
    const curUploadTask = allUploadTasks.tasks.find(ut => ut.id === uploadTaskIdRef.current);
    if (curUploadTask && curUploadTask.isCanceled) {
      abortUploadRef.current = true;
    }
  });

  const handleFileChange = async (e) => {
    try {
      const files = e.target.files;
      if (files.length <= 0) return;

      let uploadTask = UploadTask(
        dayjs().unix(),
        0,
        files.length,
      );

      uploadTaskIdRef.current = uploadTask.id;

      reduxDispatch(addTask(uploadTask));
      emitter.emit(EVENTS.UPLOADTASK_OPENED);

      for (let i = 0; i < files.length; i++) {
        if (abortUploadRef.current) break;
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          reduxDispatch(completedCountPlusOne(uploadTask));
          reduxDispatch(failedCountPlusOne(uploadTask));
          reduxDispatch(addErrorDetail(ErrorDetail(
            dayjs().unix(),
            uploadTask.id,
            file.name,
            "This file type is not supported."
          )));
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);
        const axiosResponse = await apiUtil.uploadPictures(formData);

        reduxDispatch(completedCountPlusOne(uploadTask));

        if (axiosResponse.status === "failed") {
          reduxDispatch(failedCountPlusOne(uploadTask));
          reduxDispatch(addErrorDetail(ErrorDetail(
            dayjs().unix(),
            uploadTask.id,
            file.name,
            axiosResponse.message
          )));
        }
      }

      emitter.emit(EVENTS.PICTURES_FETCH);
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <Flex
      justifyContent="space-between"
    >
      <Flex
        justifyContent="flex-start"
        gap="1rem"
      >
        <Tooltip label="Upload">
          <IconButton
            icon={<AddIcon />}
            aria-label="upload images"
            onClick={() => fileInputRef.current.click()}
            {...styles.IconButton}
          />
        </Tooltip>
        {
          isSelectedPics && (
            <>
              <Tooltip label="Download">
                <IconButton
                  icon={<ArrowDownIcon fontSize="1.4rem" />}
                  aria-label="download pictures"
                  onClick={() => emitter.emit(EVENTS.DOWNLOAD_SELECTED_PICS)}
                  {...styles.IconButton}
                />
              </Tooltip>
              <Tooltip label="Trash">
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label="move pictures to recycle"
                  onClick={() => emitter.emit(EVENTS.DELETE_SELECTED_PICS)}
                  {...styles.IconButton}
                />
              </Tooltip>
            </>
          )
        }
      </Flex>

      <Box>
        {/* <IconButton */}
        {/*   isRound={true} */}
        {/*   icon={<AddIcon />} */}
        {/*   aria-label="add" */}
        {/* /> */}
        {/* <IconButton isRound={true} icon={<AddIcon />} aria-label="add" /> */}
      </Box>
      <Input type="file" ref={fileInputRef} onChange={handleFileChange} hidden multiple />
    </Flex >
  );
}

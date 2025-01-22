"use client";

import { Flex, IconButton, Box, Tooltip, Icon, Input } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRef, useState, useEffect } from "react";
import apiUtil from "@/app/lib/utils/apiUtil";
import { useSelector, useDispatch } from "react-redux";
import { selectUploadTasks, addTask, addErrorDetail, completedCountPlusOne, skippedCountPlusOne, failedCountPlusOne } from "@/app/lib/store/uploadTasksSlice";
import { ErrorDetail, UploadTask } from "@/app/lib/definitions";
import dayjs from "dayjs";
import emitter from "@/app/lib/emitter";


export default function TopBar() {
  const fileInputRef = useRef(null);
  const uploadTaskIdRef = useRef(null);
  const abortUploadRef = useRef(false);
  const reduxDispatch = useDispatch();
  const allUploadTasks = useSelector(selectUploadTasks);

  useEffect(() => {
    const curUploadTask = allUploadTasks.tasks.find(ut => ut.id === uploadTaskIdRef.current);
    if (curUploadTask && curUploadTask.isCanceled) {
      abortUploadRef.current = true;
    }
  });

  async function handleFileChange(e) {
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
      emitter.emit('openUploadTasks');

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
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Flex
      justifyContent="space-between"
    >
      <Tooltip label="Upload">
        <IconButton
          isRound={true}
          icon={<AddIcon />}
          aria-label="upload images"
          onClick={() => fileInputRef.current.click()}
        />
      </Tooltip>

      <Box>
        <IconButton
          isRound={true}
          icon={<AddIcon />}
          aria-label="add"
        />
        <IconButton isRound={true} icon={<AddIcon />} aria-label="add" />
      </Box>
      <Input type="file" ref={fileInputRef} onChange={handleFileChange} hidden multiple />
    </Flex >
  );
}

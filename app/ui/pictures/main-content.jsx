"use client";

import { Wrap } from "@chakra-ui/react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import GlobalSpinner from "@/app/ui/components/global-spinner";
import apiUtil from "@/app/lib/utils/apiUtil";
import { useEffect, useState } from "react";
import PictureTile from "@/app/ui/components/picture-tile";
import emitter, { EVENTS } from "@/app/lib/emitter";
import ShowingSinglePicture from "../components/showing-single-picture";
import { showYesCancelDialog, useDialogDispatch } from "@/app/lib/contexts/dialogContext";
import { useSelector } from "react-redux";
import { selectPictureState } from "@/app/lib/store/pictureStateSlice";

export default function MainContent({
  currentPage,
  setTotalPages,
  setIsSelectedPics
}) {
  const [pictures, setPictures] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPicIndices, setSelectedPicIndices] = useState([]);
  const { onOpen: openBigPicture, onClose: closeBigPicture, isOpen: isOpenBigPicture } = useDisclosure();
  const [dialogResult, setDialogResult] = useState(null);
  const [isDownloadSelectedPics, setIsDownloadSelectedPics] = useState(false);
  const dialogDispatch = useDialogDispatch();
  const toast = useToast();
  const pictureState = useSelector(selectPictureState);


  const getPictures = async () => {
    try {
      setIsLoading(true)
      const result = await apiUtil.getAllPictures(pictureState.searchFeed, currentPage, false);
      setPictures(result.data);
      if (result.pagination) {
        const totalPages = Math.ceil(result.pagination.totalCount / result.pagination.limit);
        setTotalPages(totalPages);
      }
    } catch (error) {
      toast({
        title: "error toast",
        description: "Failed to get pictures!",
        status: "error",
        isClosable: true,
      });
    } finally {
      setSelectedPicIndices([]);
      setIsLoading(false);
    }
  };

  const trashSelectedPics = async () => {
    try {
      const result = await apiUtil.recyclePictureByIds(
        selectedPicIndices.map(index => pictures[index]?.id),
        0
      );

      if (result.status === "success") {
        getPictures();
        toast({
          title: "success toast",
          description: "Succese moving pictures to recycle bin!",
          status: "success",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "error toast",
        description: "Failed to moving pictures!",
        status: "error",
        isClosable: true,
      });
    }
  };

  const downloadSelectedPics = async () => {
    try {
      selectedPicIndices.forEach(async index => {
        const picture = pictures[index];
        let url = picture.src;
        if (!url) {
          const blob = await apiUtil.downloadPictureById(picture?.id);
          url = URL.createObjectURL(blob);
        }
        const a = document.createElement("a");
        a.href = url;
        a.download = picture?.display_name;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
          document.body.removeChild(a);
          // URL.revokeObjectURL(url);
        }, 1000);
      });
    } catch (error) {
      toast({
        title: "error toast",
        description: "Failed to download pictures!",
        status: "error",
        isClosable: true,
      });
    }
  };

  // getPictures
  useEffect(() => {
    getPictures();
  }, [currentPage, pictureState]);

  // register emitters
  useEffect(() => {
    const showDialog = () => {
      dialogDispatch(showYesCancelDialog(
        "Are you sure you want to move the selected pictures to recycle bin?",
        setDialogResult));
    };

    const download = () => {
      setIsDownloadSelectedPics(true);
    }

    emitter.on(EVENTS.PICTURES_FETCH, getPictures);
    emitter.on(EVENTS.DELETE_SELECTED_PICS, showDialog);
    emitter.on(EVENTS.DOWNLOAD_SELECTED_PICS, download);

    // React will call your cleanup function each time before the Effect runs again, 
    // and one final time when the component unmounts (gets removed).
    return () => {
      emitter.off(EVENTS.PICTURES_FETCH, getPictures);
      emitter.off(EVENTS.DELETE_SELECTED_PICS, showDialog);
      emitter.off(EVENTS.DOWNLOAD_SELECTED_PICS, download);
    }
  }, []);

  useEffect(() => {
    setIsSelectedPics(selectedPicIndices.length > 0);
  }, [selectedPicIndices])

  if (isLoading) {
    return (
      <GlobalSpinner />
    );
  }

  if (dialogResult) {
    trashSelectedPics();
    setDialogResult(null);
  }

  if (isDownloadSelectedPics) {
    downloadSelectedPics();
    setIsDownloadSelectedPics(false);
  }


  return (
    <Wrap
      height="75vh"
      overflowY="auto"
      spacing="0.5rem"
      padding="0.2rem"
    >
      {
        pictures?.map((pic, index) =>
        (
          <PictureTile
            key={pic.id}
            picture={pic}
            selectedPicIndices={selectedPicIndices}
            setSelPicIndices={setSelectedPicIndices}
            picIndex={index}
            openBigPicture={openBigPicture}
          />
        ))
      }
      {isOpenBigPicture && <ShowingSinglePicture
        pictures={pictures}
        selectedPicIndex={selectedPicIndices.length > 0 ? selectedPicIndices[0] : -1}
        isOpen={isOpenBigPicture}
        onClose={closeBigPicture}
      />}
    </Wrap >
  );
}

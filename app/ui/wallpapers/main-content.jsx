"use client";

import { Wrap } from "@chakra-ui/react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import GlobalSpinner from "@/app/ui/components/global-spinner";
import apiUtil from "@/app/lib/utils/apiUtil";
import { useEffect, useState } from "react";
import PictureTile from "@/app/ui/wallpapers/picture-tile";
import emitter, { EVENTS } from "@/app/lib/emitter";
import ShowingSinglePicture from "./showing-single-picture";
import { showYesCancelDialog, useDialogDispatch } from "@/app/lib/contexts/dialogContext";

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
  const dialogDispatch = useDialogDispatch();
  const toast = useToast();

  const getPictures = async () => {
    try {
      setIsLoading(true)
      const result = await apiUtil.getAllPictures(currentPage);
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
      setIsLoading(false);
    }
  };

  const deleteSelectedPics = async () => {
    try {
      const result = await apiUtil.deletePictureByIds(
        selectedPicIndices.map(index => pictures[index]?.id)
      );

      console.log("#result:", result);

      if (result.status === "success") {
        getPictures();
        toast({
          title: "success toast",
          description: "Succese to delete pictures!",
          status: "success",
          isClosable: true,
        });
      }
    } catch (error) {

    } finally {

    }
  };

  useEffect(() => {
    getPictures();
  }, [currentPage]);

  // register emitters
  useEffect(() => {
    const showDialog = () => {
      dialogDispatch(showYesCancelDialog(
        "Are you sure you want to delete the selected pictures?",
        setDialogResult));
    };

    emitter.on(EVENTS.PICTURES_FETCH, getPictures);
    emitter.on(EVENTS.DELETE_SELECTED_PICS, showDialog);

    // React will call your cleanup function each time before the Effect runs again, 
    // and one final time when the component unmounts (gets removed).
    return () => {
      emitter.off(EVENTS.PICTURES_FETCH, getPictures);
      emitter.off(EVENTS.DELETE_SELECTED_PICS, showDialog);
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
    deleteSelectedPics();
    setDialogResult(null);
  }


  return (
    <Wrap
      height="75vh"
      overflowY="auto"
      spacing="0.5rem"
      padding="0.2rem"
    >
      {
        pictures?.map((pic, index) => (
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

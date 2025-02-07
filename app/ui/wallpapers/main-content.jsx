"use client";

import { Wrap } from "@chakra-ui/react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import GlobalSpinner from "@/app/ui/components/global-spinner";
import apiUtil from "@/app/lib/utils/apiUtil";
import { useEffect, useState } from "react";
import PictureTile from "@/app/ui/wallpapers/picture-tile";
import emitter, { EVENTS } from "@/app/lib/emitter";
import ShowingSinglePicture from "./showing-single-picture";

export default function MainContent({ currentPage, setTotalPages }) {
  const [pictures, setPictures] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPicIndex, setSelectedPicIndex] = useState(-1);
  const [previewPicIndex, setPreviewPicIndex] = useState(-1);
  const { onOpen: openBigPicture, onClose: closeBigPicture, isOpen: isOpenBigPicture } = useDisclosure();
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

  useEffect(() => {
    getPictures();
  }, [currentPage]);

  useEffect(() => {
    emitter.on(EVENTS.PICTURES_FETCH, getPictures);
    // React will call your cleanup function each time before the Effect runs again, 
    // and one final time when the component unmounts (gets removed).
    return () => emitter.off(EVENTS.PICTURES_FETCH, getPictures);
  }, []);

  const setSelPicIndex = (index) => {
    setSelectedPicIndex(index);
    setPreviewPicIndex(index);
  }


  if (isLoading) {
    return (
      <GlobalSpinner />
    );
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
            selectedPicIndex={selectedPicIndex}
            setSelPicIndex={setSelPicIndex}
            picIndex={index}
            openBigPicture={openBigPicture}
          />
        ))
      }
      {isOpenBigPicture && <ShowingSinglePicture
        pictures={pictures}
        selectedPicIndex={selectedPicIndex}
        isOpen={isOpenBigPicture}
        onClose={closeBigPicture}
      />}
    </Wrap >
  );
}

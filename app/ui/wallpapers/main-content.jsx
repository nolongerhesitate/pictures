"use client";

import { Wrap, useToast } from "@chakra-ui/react";
import GlobalSpinner from "@/app/ui/components/global-spinner";
import apiUtil from "@/app/lib/utils/apiUtil";
import { useEffect, useState } from "react";
import PictureTile from "@/app/ui/wallpapers/picture-tile";
import emitter, { EVENTS } from "@/app/lib/emitter";

export default function MainContent({ currentPage, setTotalPages }) {
  const [pictures, setPictures] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    >
      {
        pictures?.map(pic => (
          <PictureTile
            key={pic.id}
            picture={pic}
          />
        ))
      }
    </Wrap >
  );
}

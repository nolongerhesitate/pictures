"use client";

import { Wrap, Portal } from "@chakra-ui/react";
import GlobalSpinner from "@/app/ui/components/global-spinner";
import apiUtil from "@/app/lib/utils/apiUtil";
import { useEffect, useState } from "react";
import PictureTile from "@/app/ui/wallpapers/picture-tile";

export default function MainContent({ currentPage, setTotalPages }) {
  const [pictures, setPictures] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fecthData = async () => {
      setIsLoading(true)
      const result = await apiUtil.getAllPictures(currentPage);
      setPictures(result.data);
      if (result.pagination) {
        const totalPages = Math.ceil(result.pagination.totalCount / result.pagination.limit);
        setTotalPages(totalPages);
      }
      setIsLoading(false);
    };

    fecthData();
  }, [currentPage]);


  if (isLoading) {
    return (
      <Portal>
        <GlobalSpinner />
      </Portal>
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

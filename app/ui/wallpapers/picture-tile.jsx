import { Image } from "@chakra-ui/react";

export default function PictureTile({ picture }) {
  const picSrc = `${process.env.NEXT_PUBLIC_THUMBNAILS_URL}/${picture.thumbFileName}`;

  /*
  const pics = await Promise.all(result?.data?.map(async (item) => {
    const bolbFile = await apiUtil.downloadPictureById(item.id);
    item.url = URL.createObjectURL(bolbFile);
    return item;
  }));

  setPictures(pics);
  */



  return (
    <Image
      // width={picture.thumbWidth}
      // height={picture.thumbHeight}
      width="16%"
      aspectRatio="1/1"
      src={picSrc}
      objectFit="cover"
      border="1px solid #ccc"
      padding="2px"
      transition="all 0.4s ease-in-out"
      _hover={{
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
        transition: "all 0.4s ease-in-out"
      }}
    />
  );
}

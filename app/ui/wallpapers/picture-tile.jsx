import { Image } from "@chakra-ui/react";

export default function PictureTile({ picture, selectedPicId, setSelectedPicId }) {
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
      border={selectedPicId === picture.id ? "0px" : "1px solid #ccc"}
      outline={selectedPicId === picture.id ? "3px solid orange" : "none"}
      padding="2px"
      onClick={() => setSelectedPicId(picture.id)}
      transition="border 0.2s ease-in-out"
      _hover={{
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
        transition: "box-shadow 0.3s ease-in-out"
      }}
    />
  );
}

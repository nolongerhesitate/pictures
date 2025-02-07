import { Image } from "@chakra-ui/react";

export default function PictureTile({ picture, selectedPicIndex, setSelPicIndex, picIndex, openBigPicture }) {
  const picSrc = `${process.env.NEXT_PUBLIC_THUMBNAILS_URL}/${picture.thumbFileName}`;

  return (
    <Image
      // width={picture.thumbWidth}
      // height={picture.thumbHeight}
      width="16%"
      aspectRatio="1/1"
      src={picSrc}
      objectFit="cover"
      border={selectedPicIndex === picIndex ? "0px" : "1px solid #ccc"}
      outline={selectedPicIndex === picIndex ? "3px solid orange" : "none"}
      padding="2px"
      transition="border 0.2s ease-in-out"
      _hover={{
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
        transition: "box-shadow 0.3s ease-in-out"
      }}
      onClick={() => setSelPicIndex(picIndex)}
      onDoubleClick={() => openBigPicture()}
    />
  );
}

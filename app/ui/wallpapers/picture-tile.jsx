import { Image, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function PictureTile({ picture, selectedPicIndices, setSelPicIndices, picIndex, openBigPicture }) {
  const [SELECT, META, SHIFT] = [0, 1, 2];
  const picSrc = `${process.env.NEXT_PUBLIC_THUMBNAILS_URL}/${picture.thumbFileName}`;
  const isSelected = selectedPicIndices?.includes(picIndex);
  const [multiSelType, setMultiSelType] = useState(SELECT); // 

  const downHandler = ({ key }) => {
    // set status
    if (key === "Meta") setMultiSelType(multiSelType | META);
    else if (key === "Shift") setMultiSelType(multiSelType | SHIFT);
  };

  const upHandler = ({ key }) => {
    // remove status
    if (key === "Meta") setMultiSelType(multiSelType & (~META));
    else if (key === "Shift") setMultiSelType(multiSelType & (~SHIFT));
  };

  const handleClick = () => {
    // shift and meta be pressed simultaneously
    if ((multiSelType & SHIFT) === SHIFT) {
      setSelPicIndices(indices => {
        if (!indices) return [];
        if (indices.length < 1) {
          return [picIndex];
        } else {
          let newIndices = [indices[0]];
          let [start, end] = picIndex < indices[0] ? [picIndex, indices[0]] : [indices[0], picIndex];
          for (let i = start; i <= end; i++) {
            newIndices.push(i);
          }
          return [...newIndices];
        }
      });
    } else if ((multiSelType & META) === META) {
      setSelPicIndices(indices => {
        if (!indices) return [];
        if (indices.includes(picIndex)) {
          return indices.filter(i => i !== picIndex);
        } else {
          return [...indices, picIndex];
        }
      });
    } else {
      setSelPicIndices([picIndex]);
    }
  };

  const handleDoubleClick = () => {
    setSelPicIndices([picIndex]);
    openBigPicture();
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return (
    <Box
      width="16%"
    >
      <Image
        // width={picture.thumbWidth}
        // height={picture.thumbHeight}
        width="100%"
        aspectRatio="1/1"
        src={picSrc}
        objectFit="cover"
        border={isSelected ? "0px" : "1px solid #ccc"}
        outline={isSelected ? "3px solid orange" : "none"}
        padding="2px"
        transition="border 0.2s ease-in-out"
        _hover={{
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
          transition: "box-shadow 0.3s ease-in-out"
        }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      />
      <Box
        textAlign="center"
        fontSize="0.8rem"
      // margin="0.2rem 0"
      >
        {picture.display_name}
      </Box>
    </Box>
  );
}

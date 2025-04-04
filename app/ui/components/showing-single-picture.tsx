import {
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { Flex, IconButton, Text, Image, Box, Spinner } from "@chakra-ui/react";
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useToast } from '@chakra-ui/react';
import { useState, useEffect } from "react";
import apiUtil from '@/app/lib/utils/apiUtil';
import useStylesColorMode from "@/app/lib/hooks/useStylesColorMode";
import { Picture } from "@/app/lib/types";


export default function ShowingSinglePicture({
  pictures,
  selectedPicIndex,
  isOpen,
  onClose
}: {
  pictures: Picture[],
  selectedPicIndex: number,
  isOpen: boolean,
  onClose: () => void
}) {
  const [picture, setPicture] = useState<Picture | null>(pictures[selectedPicIndex]);
  const [offsetIndex, setOffsetIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const handlePrevPic = () => {
    if ((selectedPicIndex + offsetIndex) <= 0) return;
    setOffsetIndex(offsetIndex - 1);
    setPicture(pictures[selectedPicIndex + offsetIndex - 1]);
  };

  const handleNextPic = () => {
    if ((selectedPicIndex + offsetIndex) >= pictures.length - 1) return;
    setOffsetIndex(offsetIndex + 1);
    setPicture(pictures[selectedPicIndex + offsetIndex + 1]);
  };


  const getOriginalPicture = async () => {
    try {
      setIsLoading(true);
      if (!picture.blobUrl) {
        const bolbFile = await apiUtil.downloadPictureById(picture.id);
        picture.blobUrl = URL.createObjectURL(bolbFile);
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
    getOriginalPicture();
  }, [picture]);


  const styles = {
    chevronButton: {
      isRound: true,
      variant: "outline",
      colorScheme: "gray",
      color: "#B7B7B8",
      bg: useStylesColorMode("none", "gray").bgColor,
      _hover: {
        color: "white",
        cursor: "pointer",
      }
    }
  };


  return (
    <Modal
      size="full"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(1px)'
      />
      <ModalContent bg="none">
        <Flex
          h="100vh"
          w="100vw"
          direction="column"
          gap="0.5rem"
          padding="1rem"
        >
          {/* header */}
          <Flex
            justifyContent="flex-start"
            h="1rem"
            alignItems="center"
            gap="1rem"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "20%",
              zIndex: "-1",
              background: "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7))",
            }}
          >
            {/* close button */}
            <IconButton
              as={CloseIcon}
              variant="ghost"
              color="#B7B7B8"
              h="1rem"
              w="1rem"
              _hover={{
                background: "transparent",
                color: "white",
                cursor: "pointer",
              }}
              aria-label="close"
              onClick={onClose}
            />
            {/* <Text>{picture?.displayName}</Text> */}
            <Text
              color="#f5f5f5"
              fontSize="0.9rem"
            >
              {picture.displayName}
            </Text>
          </Flex>

          {/* middle */}
          <Flex
            flex="1"
            alignItems="center"
            gap="1rem"
            height="0"
          >
            {/* previous */}
            {(selectedPicIndex + offsetIndex > 0)
              && (<IconButton
                as={ChevronLeftIcon}
                onClick={handlePrevPic}
                {...styles.chevronButton}
                aria-label="previous"
              />)}
            {isLoading ? (
              <Box
                display="flex"
                flex="1"
                justifyContent="center"
                alignItems="center"
                width="0"
                height="100%"
              >
                <Spinner
                  size="lg"
                  color="orange"
                />
              </Box>
            ) : (
              <Image
                flex="1"
                src={picture.blobUrl}
                width="0"
                height="100%"
                objectFit="contain"
              />
            )}

            {/* next */}
            {(selectedPicIndex + offsetIndex < pictures.length - 1)
              && (<IconButton
                as={ChevronRightIcon}
                onClick={handleNextPic}
                {...styles.chevronButton}
                aria-label="next"
              />)}
          </Flex>

          {/* footer */}
          <Box
            h="1rem"
          ></Box>
        </Flex>
      </ModalContent>
    </Modal >
  );
}

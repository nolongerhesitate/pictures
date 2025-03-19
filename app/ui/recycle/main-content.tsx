import { useState, useEffect } from "react";
import GlobalSpinner from "@/app/ui/components/global-spinner";
import PictureTile from "@/app/ui/components/picture-tile";
import { Wrap, Box } from "@chakra-ui/react";
import { useDisclosure, useToast } from '@chakra-ui/react';
import ShowingSinglePicture from "@/app/ui/components/showing-single-picture";
import apiUtil from "@/app/lib/utils/apiUtil";
import { useSelector, useDispatch } from "react-redux";
import { selectPictureState, restoreRecyclePictures, deleteRecyclePictures } from "@/app/lib/store/pictureStateSlice";
import { SetUseState, Picture, DataResult, DataResultStatus } from "@/app/lib/types";

export default function MainContent({
  currentPage,
  setTotalPages,
  setIsSelectedPics
}: {
  currentPage: number,
  setTotalPages: SetUseState<number>,
  setIsSelectedPics: SetUseState<boolean>
}) {
  const [pictures, setPictures] = useState<Picture[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPicIndices, setSelectedPicIndices] = useState<number[]>([]);
  const { onOpen: onOpenBigPicture, onClose: onCloseBigPicture, isOpen: isOpenBigPicture } = useDisclosure();
  const toast = useToast();
  const { searchFeed, isRestoreRecyclePictures, isDeleteRecyclePictures } = useSelector(selectPictureState);
  const dispatch = useDispatch();

  const getPictures = async () => {
    try {
      setIsLoading(true)
      const result: DataResult<Picture[]> = await apiUtil.getAllPictures(searchFeed, currentPage, true);
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

  const restorePictures = async (): Promise<boolean> => {
    try {
      const result: DataResult<null> = await apiUtil.recyclePictureByIds(
        selectedPicIndices.map(index => pictures[index]?.id),
        1
      );
      if (result.status === DataResultStatus.Success) {
        toast({
          title: "success toast",
          description: "Succese to restore pictures!",
          status: "success",
          isClosable: true,
        });
        return true;
      }
      return false;
    } catch (error) {
      toast({
        title: "error toast",
        description: "Failed to restore pictures!",
        status: "error",
        isClosable: true,
      })
      return false;
    } finally {
      dispatch(restoreRecyclePictures({ isRestoreRecyclePictures: false }));
    }
  };

  const deletePictures = async (): Promise<boolean> => {
    try {
      const result = await apiUtil.deletePictureByIds(
        selectedPicIndices.map(index => pictures[index]?.id)
      );
      if (result.status === DataResultStatus.Success) {
        toast({
          title: "success toast",
          description: "Pictures had been deleted!",
          status: "success",
          isClosable: true,
        });
        return true;
      }
      return false;
    } catch (error) {
      toast({
        title: "error toast",
        description: "Failed to delete pictures!",
        status: "error",
        isClosable: true,
      })
      return false;
    } finally {
      dispatch(deleteRecyclePictures({ isDeleteRecyclePictures: false }));
    }
  };

  useEffect(() => {
    const runAllAsync = async () => {
      if (isRestoreRecyclePictures && !await restorePictures()) return;

      if (isDeleteRecyclePictures && !await deletePictures()) return;

      await getPictures();
    }

    runAllAsync();
  }, [currentPage, searchFeed, isRestoreRecyclePictures, isDeleteRecyclePictures]);

  useEffect(() => {
    setIsSelectedPics(selectedPicIndices.length > 0);
  }, [selectedPicIndices]);


  if (isLoading) {
    return <GlobalSpinner />;
  }

  if (!pictures || pictures.length === 0) {
    return (
      <Box
        textAlign="center"
        height="75vh"
      >
        No pictures found
      </Box>
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
        pictures?.map((pic, index) =>
        (
          <PictureTile
            key={pic.id}
            picture={pic}
            selectedPicIndices={selectedPicIndices}
            setSelPicIndices={setSelectedPicIndices}
            picIndex={index}
            openBigPicture={onOpenBigPicture}
          />
        ))
      }
      {
        isOpenBigPicture && <ShowingSinglePicture
          pictures={pictures}
          selectedPicIndex={selectedPicIndices.length > 0 ? selectedPicIndices[0] : -1}
          isOpen={isOpenBigPicture}
          onClose={onCloseBigPicture}
        />
      }
    </Wrap>
  );
}

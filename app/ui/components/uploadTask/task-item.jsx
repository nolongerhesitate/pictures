import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { Flex, Progress, Icon, IconButton, Button } from "@chakra-ui/react";
import { BsThreeDotsVertical, BsImage } from "react-icons/bs";
import { CloseIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { selectUploadTasks, cancelUpdateTask, clearCompletedTasks } from "@/app/lib/store/uploadTasksSlice";
import ErrorDetails from './error-details';
import { useDisclosure } from "@chakra-ui/react";

export default function TaskItem({ task }) {
  const reduxDispatch = useDispatch();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const allUploadTasks = useSelector(selectUploadTasks);
  const curErrorDetails = allUploadTasks.errorDetails.filter(item => item.taskId === task.id);
  const processingVal = Math.round(task.completedCount / task.totalCount * 100);

  const resultTag = task.failedCount > 0 ? (
    <Button
      colorScheme="red"
      variant="link"
      fontSize="0.8rem"
      onClick={onOpen}
    >
      {`${task.failedCount} item${task.failedCount == 1 ? '' : 's'} failed`}
    </Button >
  ) : (
    <p>complete</p>
  );


  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      gap="10px"
      mb="1rem"
    >
      <Icon boxSize={6} as={BsImage} />
      <Flex
        flex={1}
        direction="column"
        alignItems="flex-start"
      >
        <p className="font-bold">
          {task.content}
        </p>
        {
          task.isCompleted ?
            resultTag
            :
            <Progress
              value={processingVal}
              width="100%"
              size="xs"
            />
        }
      </Flex>

      {
        (task.isCompleted || task.isCanceled) ? (
          <Menu>
            <MenuButton
              aria-label="detail"
              variant="ghost"
            >
              <BsThreeDotsVertical />
            </MenuButton>
            <MenuList>
              {
                curErrorDetails.length > 0
                && (
                  <MenuItem
                    onClick={onOpen}
                  >
                    Error Details
                  </MenuItem>)
              }
              <MenuItem
                onClick={() => reduxDispatch(clearCompletedTasks(task.id))}
              >
                Clear
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <IconButton icon={<CloseIcon />}
            isRound={true}
            aria-label="close"
            fontSize="0.5rem"
            size="xs"
            onClick={() => reduxDispatch(cancelUpdateTask(task))}
          />
        )}
      <ErrorDetails
        details={curErrorDetails}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  );
}

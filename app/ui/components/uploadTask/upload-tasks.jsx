import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react';
import { IconButton, Flex, Button, Spacer } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { FaTasks } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectUploadTasks, clearCompletedTasks } from '@/app/lib/store/uploadTasksSlice';
import TaskItem from './task-item';
import { useEffect } from 'react';
import emitter from '@/app/lib/emitter';

export default function UploadTasks() {
  const allUploadTasks = useSelector(selectUploadTasks);
  const reduxDispatch = useDispatch();
  const { onOpen, onClose, isOpen } = useDisclosure({ defaultIsOpen: true });

  useEffect(() => {
    emitter.on('openUploadTasks', onOpen);
    emitter.on('closeUploadTasks', onClose);
  }, []);


  async function handleClearCompletedTasks() {
    reduxDispatch(clearCompletedTasks());
  }

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      defaultIsOpen="true"
    >
      <PopoverTrigger>
        <IconButton
          icon={<FaTasks />}
          aria-label="Background Tasks"
          variant="ghost"
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <Flex
            justifyContent="space-between"
          >
            <p className="font-bold text-md">Background Tasks</p>
            <Spacer />
            <Button
              colorScheme="gray"
              variant="link"
              size="sm"
              onClick={handleClearCompletedTasks}
            >
              Clear completed tasks
            </Button>
          </Flex>
        </PopoverHeader>
        <PopoverBody>
          {
            allUploadTasks.tasks.map((task) =>
              <TaskItem key={task.id} task={task}></TaskItem>
            )
          }
        </PopoverBody>
        {/* <PopoverFooter> */}
        {/* placeholder word */}
        {/* </PopoverFooter> */}
      </PopoverContent>
    </Popover>
  );
}


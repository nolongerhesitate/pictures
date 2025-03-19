import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  errorDetails: [],
};

const generateContent = (task) => {
  let uploadedStr = `${task.totalCount} item${task.totalCount === 1 ? '' : 's'} uploaded`;

  if (task.isCanceled && !task.isCompleted) {
    return uploadedStr += ` and ${task.totalCount - task.completedCount} skipped`;
  }

  return task.isCompleted
    ? (task.failedCount === task.totalCount ? 'Failed to upload' : uploadedStr)
    : `Uploading ${task.completedCount} / ${task.totalCount} items...`;
}

const generateCompleted = (task) => {
  return task.completedCount === task.totalCount;
}

export const uploadTasksSlice = createSlice({
  name: "uploadTasks",
  initialState,
  reducers: {
    addTask(state, action) {
      const task = action.payload;
      task.isCompleted = generateCompleted(task);
      task.content = generateContent(task);
      state.tasks.push(task);
    },
    clearCompletedTasks(state, action) {
      if (action.payload) {
        state.tasks = state.tasks.filter((task) => task.id != action.payload);
      } else {
        state.tasks = state.tasks.filter((task) => !task.isCompleted && !task.isCanceled);
      }
    },
    completedCountPlusOne(state, action) {
      const taskId = action.payload.id;
      const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

      if (taskIndex !== -1) {
        const task = state.tasks[taskIndex];
        task.completedCount += 1;
        task.isCompleted = generateCompleted(task);
        task.content = generateContent(task);
      }
    },
    failedCountPlusOne(state, action) {
      const taskId = action.payload.id;
      const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

      if (taskIndex !== -1) {
        const task = state.tasks[taskIndex];
        task.failedCount += 1;
        task.isCompleted = generateCompleted(task);
        task.content = generateContent(task);
      }
    },
    skippedCountPlusOne(state, action) {
      const taskId = action.payload.id;
      const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

      if (taskIndex !== -1) {
        const task = state.tasks[taskIndex];
        task.skippedCount += 1;
        task.isCompleted = generateCompleted(task);
        task.content = generateContent(task);
      }
    },
    updateTask(state, action) {
      const taskId = action.payload.id;
      const updatedTask = action.payload;

      const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

      if (taskIndex !== -1) {
        updateTask.isCompleted = generateCompleted(updateTask);
        updateTask.content = generateContent(updateTask);
        state.tasks[taskIndex] = updatedTask;
      }
    },
    cancelUpdateTask(state, action) {
      const taskId = action.payload.id;

      const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1 && !state.tasks[taskIndex].isCompleted) {
        const task = state.tasks[taskIndex];
        task.isCanceled = true;
        task.isCompleted = generateCompleted(task);
        task.content = generateContent(task);
      }
    },
    addErrorDetail(state, action) {
      state.errorDetails.push(action.payload);
    },
  }
});

export const {
  addTask,
  clearCompletedTasks,
  updateTask,
  addErrorDetail,
  completedCountPlusOne,
  failedCountPlusOne,
  skippedCountPlusOne,
  cancelUpdateTask,
} = uploadTasksSlice.actions;

export const selectUploadTasks = (state) => state.uploadTasks;

export default uploadTasksSlice.reducer;


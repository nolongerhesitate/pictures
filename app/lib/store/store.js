import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice";
import uploadTasksReducer from "./uploadTasksSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      uploadTasks: uploadTasksReducer,
    }
  })
}

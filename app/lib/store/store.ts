import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice";
import uploadTasksReducer from "./uploadTasksSlice";
import pictureStateReducer from "./pictureStateSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      uploadTasks: uploadTasksReducer,
      pictureState: pictureStateReducer,
    }
  });
}

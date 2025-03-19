import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchFeed: "",
  isRestoreRecyclePictures: false,
  isDeleteRecyclePictures: false,
};

export const pictureStateSlice = createSlice({
  name: "pictureState",
  initialState,
  reducers: {
    searchPictures(state, action) {
      state.searchFeed = action.payload.searchFeed;
    },
    restoreRecyclePictures(state, action) {
      state.isRestoreRecyclePictures = action.payload.isRestoreRecyclePictures || false;
    },
    deleteRecyclePictures(state, action) {
      state.isDeleteRecyclePictures = action.payload.isDeleteRecyclePictures || false;
    },
  },
});

export const { searchPictures, restoreRecyclePictures, deleteRecyclePictures } = pictureStateSlice.actions;

export const selectPictureState = (state) => state.pictureState;

export default pictureStateSlice.reducer;

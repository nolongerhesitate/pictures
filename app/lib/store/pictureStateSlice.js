import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchFeed: "",
};

export const pictureStateSlice = createSlice({
  name: "pictureState",
  initialState,
  reducers: {
    searchPictures(state, action) {
      state.searchFeed = action.payload.searchFeed;
    },
  },
});

export const { searchPictures } = pictureStateSlice.actions;

export const selectPictureState = (state) => state.pictureState;

export default pictureStateSlice.reducer;

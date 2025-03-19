import { createSlice } from "@reduxjs/toolkit";

// Define the initial value for the slice state
const initialState = {
  id: "null",
  username: "null",
  description: "null",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.description = action.payload.description;
    },
  },
});

// Export the generated action creators for use in components
export const { setUser } = userSlice.actions;

// Export the selector for use in the store
export const selectUser = (state) => state.user;

// Export the slice reducer for use in the store
export default userSlice.reducer;

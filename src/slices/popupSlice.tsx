import { createSlice } from '@reduxjs/toolkit';

const initialState: { popupVisible: boolean } = {
  popupVisible: false,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    changePopUp: (state) => {
      state.popupVisible = !state.popupVisible;
    },
  },
});

const { actions, reducer } = popupSlice;

export default reducer;
export const { changePopUp } = actions;

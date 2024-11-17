import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { spinnerVisibility: boolean } = {
  spinnerVisibility: false,
};

const spinnersSlice = createSlice({
  name: 'radioFilter',
  initialState,
  reducers: {
    spinnerChanged: (state, action: PayloadAction<boolean>) => {
      state.spinnerVisibility = action.payload;
    },
  },
});

const { actions, reducer } = spinnersSlice;

export default reducer;
export const { spinnerChanged } = actions;

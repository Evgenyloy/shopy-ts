import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { currentPage: number } = {
  currentPage: 1,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export default paginationSlice.reducer;
export const { changeCurrentPage } = paginationSlice.actions;

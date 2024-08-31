import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { categories: string } = {
  categories: 'all',
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoryChange: (state, action: PayloadAction<string>) => {
      state.categories = action.payload;
    },
  },
});

const { reducer, actions } = categoriesSlice;

export default reducer;
export const { categoryChange } = actions;

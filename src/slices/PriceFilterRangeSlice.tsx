import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { minPrice: number; maxPrice: number } = {
  minPrice: 0,
  maxPrice: 1000,
};

const rangeFilterSlice = createSlice({
  name: 'priceFilter',
  initialState,
  reducers: {
    minPriceFilterChanged: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    maxPriceFilterChanged: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
  },
});

const { actions, reducer } = rangeFilterSlice;
export default reducer;
export const { minPriceFilterChanged, maxPriceFilterChanged } = actions;

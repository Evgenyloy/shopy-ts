import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { radioFilter: string } = {
  radioFilter: '',
};

const radioFilterSlice = createSlice({
  name: 'radioFilter',
  initialState,
  reducers: {
    radioFilterChanged: (state, action: PayloadAction<string>) => {
      state.radioFilter = action.payload;
    },
  },
});

const { actions, reducer } = radioFilterSlice;

export default reducer;
export const { radioFilterChanged } = actions;

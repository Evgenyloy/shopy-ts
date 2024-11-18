import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  emailError: '',
  passError: '',
};

const errorSlice = createSlice({
  name: 'formError',
  initialState,
  reducers: {
    setEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    setPasswordError: (state, action) => {
      state.passError = action.payload;
    },
  },
});

export default errorSlice.reducer;
export const { setEmailError, setPasswordError } = errorSlice.actions;

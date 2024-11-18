import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  loginAuthenticationStatus: string;
  loadingDatabaseStatus: string;
} = {
  loginAuthenticationStatus: 'idle',
  loadingDatabaseStatus: 'idle',
};
console.log('loginSlice');
const spinnersSlice = createSlice({
  name: 'radioFilter',
  initialState,
  reducers: {
    authenticationFetching: (state) => {
      state.loginAuthenticationStatus = 'loading';
    },
    authenticationFetched: (state) => {
      state.loginAuthenticationStatus = 'idle';
    },
    authenticationFetchingError: (state) => {
      state.loginAuthenticationStatus = 'error';
    },
    databaseFetching: (state) => {
      state.loadingDatabaseStatus = 'loading';
    },
    databaseFetched: (state) => {
      state.loadingDatabaseStatus = 'idle';
    },
    databaseFetchingError: (state) => {
      state.loadingDatabaseStatus = 'error';
    },
  },
});

const { actions, reducer } = spinnersSlice;

export default reducer;
export const {
  authenticationFetched,
  authenticationFetching,
  authenticationFetchingError,
  databaseFetched,
  databaseFetching,
  databaseFetchingError,
} = actions;
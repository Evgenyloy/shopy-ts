import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../types/types';
import { removeUser } from './userSlice';

const userData = JSON.parse(
  localStorage.getItem(
    'firebase:authUser:AIzaSyAWEVRT308MOF8Lo9_aRbLEdHbgLHcf65E:[DEFAULT]'
  ) || ''
);

const localUserData = JSON.parse(localStorage.getItem('userData') as string);
const localGuestData = JSON.parse(localStorage.getItem('guestData') as string);

interface IInitialFavoriteState {
  favorites: IProduct[];
}
const initialState: IInitialFavoriteState = {
  favorites: userData
    ? localUserData.favorites
    : localGuestData
    ? localGuestData.favorites
    : [],
};

const favoriteProductsSlice = createSlice({
  name: 'favoriteProducts',
  initialState,
  reducers: {
    setFavoriteItems: (state, action: PayloadAction<IProduct[]>) => {
      state.favorites = action.payload;
    },
    addFavoriteItem: (state, action: PayloadAction<IProduct>) => {
      state.favorites.push(action.payload);
    },
    removeFavoriteItem: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (favorite: any) => favorite.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state) => {
      state.favorites = localStorage.getItem('guestData')
        ? JSON.parse(localStorage.getItem('guestData') as string).favorites
        : [];
    });
  },
});

const { actions, reducer } = favoriteProductsSlice;
export default reducer;
export const { addFavoriteItem, removeFavoriteItem, setFavoriteItems } =
  actions;

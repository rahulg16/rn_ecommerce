import {createSlice} from '@reduxjs/toolkit';

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favorite: [],
  },
  reducers: {
    addToFavorite: (state, action) => {
      const itemInCart = state.favorite.find(item => item.id == action.payload.id);
      if (itemInCart) {
        return
      } else {
        state.favorite.push({...action.payload, quantity: 1});
      }
    },
    removeFromFavorite: (state, action) => {
      const removeFromFavorite = state.favorite.filter(
        item => item.id !== action.payload.id,
      );
      state.favorite = removeFromFavorite;
    },
  },
});

export const {addToFavorite, removeFromFavorite} =
  favoriteSlice.actions;

export default favoriteSlice.reducer;

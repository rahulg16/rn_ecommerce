import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './src/store/CartReducer';
import FavReducer from './src/store/FavReducer'

export default configureStore({
  reducer: {
    cart: CartReducer,
    favorite: FavReducer
  },
});

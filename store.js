import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './src/store/CartReducer';

export default configureStore({
  reducer: {
    cart: CartReducer,
  },
});

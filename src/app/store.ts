import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/products/productSlice';
import cartReducer from '../features/cart/cartSlicte';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        products: productReducer,
        cart: cartReducer,
    },
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("cart", JSON.stringify(state.cart.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
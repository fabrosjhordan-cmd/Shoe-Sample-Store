import { configureStore } from "@reduxjs/toolkit";
import productListReducer from './newProductSlice';

export const store = configureStore({
    reducer: {
        product: productListReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
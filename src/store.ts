import { configureStore } from "@reduxjs/toolkit";
import {productReducer, salesReducer} from './newProductSlice';


export const store = configureStore({
    reducer: {
        product: productReducer,
        sales: salesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
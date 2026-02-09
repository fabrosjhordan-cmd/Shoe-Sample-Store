import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { supabase } from "./supabaseClient";
import type { initialStateProps } from "./types";

const initialState : initialStateProps= {items: [], loading: false, error: null}

export const fetchData = createAsyncThunk(
    'product/fetchData',
    async(_, thunkAPI)=>{
        try{
            const {data, error} = await supabase.from('products').select('*').order('created_at', {ascending: false})
            if(error) throw error
            return data
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)


// Make this for orders by user....
export const fetchByUser = createAsyncThunk(
    'product/user',
    async(user_id, thunkAPI) =>{
        try{
            const {data, error} = await supabase.from('products').select('*').eq('id', user_id).order('created_at', {ascending:false})
            if(error) throw error
            return data
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const addOrder = createAsyncThunk(
    'product/addOrder',
    async(items, thunkAPI) =>{
        try{
            const {data, error} = await supabase.from('orders').insert(items).select()
            if(error) throw error
            console.log(data)
            return data
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async({productName, brand, gender, price}:{productName: string, brand: string, gender: string, price: number}, thunkAPI) =>{
        try{
            const {data, error} = await supabase.from('products').insert({name: productName, brand: brand, gender: gender, price: price}).select();
            if(error) throw error
            return data
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async({id, productName, brand, gender, price} : {id: number, productName: string, brand: string, gender: string, price: number}, thunkAPI)=>{
        try{
            const {data, error} = await supabase.from('products').update({name: productName, brand: brand, gender: gender, price: price}).eq('id',id).select().single()
            if(error) throw error
            return data;
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

// reducer

const newProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
    },
     extraReducers: (builders) =>{
        builders
        .addCase(fetchData.pending, state =>{
            state.loading = true
        })
        .addCase(fetchData.fulfilled, (state, action)=>{
            state.loading = false
            state.items = action.payload
        })
        .addCase(addProduct.fulfilled, (state, action)=>{
            state.loading = false
            state.items =action.payload
        })
        .addCase(updateProduct.fulfilled, (state, action)=>{
            state.loading = false
            state.items = action.payload
        })
     }
})

export default newProductSlice.reducer
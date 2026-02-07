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


// Make this for order....
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
     }
})

export default newProductSlice.reducer
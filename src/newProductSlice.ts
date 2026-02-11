import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { supabase } from "./supabaseClient";
import type { initialStateProps } from "./types";

const initialState : initialStateProps= {items: [], sales: [], shipping: [], userSalesList: [],packaging: [], userProfile: [], loading: false, error: null}

export const fetchData = createAsyncThunk(
    'product/fetchData',
    async(_, thunkAPI)=>{
        try{
            const {data, error} = await supabase.from('products').select('*').gt('stock', 0).order('created_at', {ascending: false})
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
    async({cart_id, email, quantity, totalPrice, role} : {cart_id: string, email: string, quantity: number, totalPrice: number, role: string | undefined}, thunkAPI) =>{
        try{
            const {data, error} = await supabase.from('sales').insert({cart_id, email, quantity, total: totalPrice, role}).select()
            if(error) throw error
            return data
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const addOrderList = createAsyncThunk(
    'product/addOrderList',
    async({total, quantity, name, cart_id, order_id, product_id} : {total: number, quantity: number, name: string, cart_id: string, order_id: string, product_id: number}, thunkAPI)=>{
        try{
            const {data, error} = await supabase.from('orders').insert({total, quantity, name, cart_id, order_id, product_id}).select();
            if(error) throw error
            return data
        }catch(error){
            return thunkAPI.rejectWithValue(error)
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

export const viewSales = createAsyncThunk(
    'sales/viewSales',
    async(_, thunkAPI)=>{
        try{
            const {data, error} = await supabase.from('sales').select('*').order('created_at', {ascending: false});
            if(error) throw error
            return data
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const viewAllStatusShip = createAsyncThunk(
    'sales/viewAllStatus',
    async(_, thunkAPI) =>{
        try{
            const {data, error} = await supabase.from('sales').select('*').eq('status', 'Shipping').order('created_at', {ascending:false})
            if(error) throw error
            return data
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
) 

export const viewAllStatusPackaging = createAsyncThunk(
    'sales/viewAllStatusPackaging',
    async(_, thunkAPI) =>{
        try{
            const {data, error} = await supabase.from('sales').select('*').eq('status', 'Packaging').order('created_at', {ascending:false})
            if(error) throw error
            return data
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
) 

export const viewOrdersByUser = createAsyncThunk(
    'user/viewOrdersByUser',
    async(user_id : string, thunkAPI) =>{
        try{
            const {data, error} = await supabase.from('sales').select('*').eq('user_id', user_id).order('created_at', {ascending:false})
            if(error) throw error
            return data
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
) 


export const selectProfile = createAsyncThunk(
    'user/selectProfile',
    async(user_id : string, thunkAPI) =>{
        try{
            const {data, error} = await supabase.from('profiles').select('*').eq('id', user_id)
            if(error) throw error
            return data
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
) 

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async({user_id, address, firstName, lastName} :{user_id: string, firstName: string, lastName: string, address: string}, thunkAPI) =>{
        try{
            const {data, error} = await supabase.from('profiles').update({address, first_name: firstName, last_name: lastName }).eq('id', user_id).select('*')
            if(error) throw error
            return data
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
        .addCase(addOrder.fulfilled, (state, action)=>{
            state.loading = false
            state.items = action.payload
        })
        .addCase(addOrderList.fulfilled, (state, action)=>{
            state.loading = false
            state.items = action.payload
        })
        
        
     }
})

const newSalesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers:{},
    extraReducers: (builders) =>{
        builders
         .addCase(viewSales.pending, state =>{
            state.loading =true
        })
        .addCase(viewSales.fulfilled, (state, action)=>{
            state.loading = false
            state.sales = action.payload
        })
        .addCase(viewAllStatusShip.pending, state=>{
            state.loading = true
        })
        .addCase(viewAllStatusShip.fulfilled, (state, action)=>{
            state.loading = false
            state.shipping = action.payload
        })
        .addCase(viewAllStatusPackaging.pending, state=>{
            state.loading = true
        })
        .addCase(viewAllStatusPackaging.fulfilled, (state, action)=>{
            state.loading = false
            state.packaging = action.payload
        })
    }
})

const userOrderList = createSlice({
    name: 'user',
    initialState,
    reducers:{},
    extraReducers: (builders) =>{
        builders
        .addCase(viewOrdersByUser.pending, state=>{
            state.loading = true
        })
        .addCase(viewOrdersByUser.fulfilled, (state, action)=>{
            state.loading = false
            state.userSalesList = action.payload
        })
        .addCase(selectProfile.pending, state=>{
            state.loading = true
        })
        .addCase(selectProfile.fulfilled, (state, action)=>{
            state.loading = false
            state.userProfile = action.payload
        })
        .addCase(updateProfile.fulfilled, (state, action)=>{
            state.loading = false
            state.userProfile = action.payload
        })
    }
})

export const productReducer = newProductSlice.reducer
export const salesReducer = newSalesSlice.reducer
export const userSalesOrder = userOrderList.reducer
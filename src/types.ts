import type{ Session } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

export type HomeProps = {
    isScrolled: boolean
    isDarkMode: boolean
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
    session: Session | undefined
    loading: boolean
}


export type ThemeProps = {
    isScrolled: boolean
    isDarkMode: boolean
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
} 

export type HeroProps = {
    isDarkMode: boolean
} 

export type NavProps = {
    isScrolled: boolean
}

export type PageProps ={
    isScrolled: boolean
    isDarkMode: boolean
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export type ProductProps = {
    id: number
    brand: string
    title: string
    image: string
    gender: string
    avg_price: number
}

export type AuthData = {
    session: Session | undefined
    profile: any
    loading: boolean
}

export type StoreProps = {
    shoes: Tables<'products'>[]
    isLoading: boolean
}

export type CartItem = {
    id: string
    product: Tables<'products'>
    product_id: number
    title: string
    brand: string
    image: string
    gender: string
    avg_price: number
    quantity: number
}

export type CartType = {
    items: CartItem[]
    addItem: (product: ProductProps) => void
    updateQuantity: (itemId: string, amount: 1 | -1) => void
    total: number
}

export type Orders = {
    id: string
    product: Tables<'products'>
    quantity: number
}


export type CartProps ={
    isScrolled: boolean
    isDarkMode: boolean
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
    session: Session | undefined
    loading: boolean
}

export type ProfileProps = {
    loading: boolean
    isScrolled: boolean
    isDarkMode: boolean
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
    session: Session | undefined
}

export type SideBarProp = {
     setScreen: React.Dispatch<React.SetStateAction<"home" | "products" | "orders" | "settings" | "newProduct">>
}

export type Section = "home" | "products" | "orders" | "settings" | "newProduct";

export type SideBarLink = {
  label: string;
  icon: React.ReactNode;
  href: Section;
};

export type ProductListProps = {
    setId: React.Dispatch<React.SetStateAction<number>>
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
    setScreen: React.Dispatch<React.SetStateAction<"home" | "products" | "orders" | "settings" | "newProduct">>
}

export type NewProductProps = {
    id: number
    isEditing: boolean
    setScreen: React.Dispatch<React.SetStateAction<"home" | "products" | "orders" | "settings" | "newProduct">>
}

export type adminOrderList = {
    setScreen: React.Dispatch<any>
}

export type initialStateProps ={
    items: Tables<'products'>[]
    sales: Tables<'sales'>[]
    shipping: Tables<'sales'>[]
    packaging: Tables<'sales'>[]
    userSalesList: Tables<'sales'>[]
    userProfile: Tables<'profiles'>[]
    orderList: Tables<'orders'>[]
    loading: boolean
    error: string | null
}

export type HistoryProps ={
    user: Tables<'sales'>[]
}

export type UserProfileProps= {
    profile: Tables<'profiles'>[]
    session: Session | undefined
    loading: boolean
}

export type PayPalProps = {
    totalPrice: number
    shippingFee: number
    totalFee: number
    email: string
    address: string
    sum: number
    setOrders: React.Dispatch<React.SetStateAction<Orders[]>>
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>
    orders: Orders[]
}


export const defaultShoeImage = 'https://imgs.search.brave.com/6aMZmWrpV715g9FN5lfgcWj3O1hON1r8PfWra6g5qSM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMS5z/bmRjZG4uY29tL2Fy/dHdvcmtzLUcxRWNR/YkR6TGVFRzIzSzkt/N1FTVFZRLXQxMDgw/eDEwODAuanBn';

export const tableHeader = ['Date', 'Status', 'Order ID','Email', 'Role', 'Address', 'Quantity', 'Action']

export const userOrderTable = ['Date', 'Quantity', 'Status', 'Action']

export const orderAction = ['waiting', 'packaging', 'shipping']
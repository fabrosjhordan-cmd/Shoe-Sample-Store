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
    session: Session | undefined
}

export type CartItem = {
    id: string
    product: ProductProps
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
    product: ProductProps
    quantity: number
}


export type CartProps ={
    isScrolled: boolean
    isDarkMode: boolean
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export type SideBarProp = {
    setActiveSection: React.Dispatch<React.SetStateAction<"home" | "products" | "orders">>
}

export type Section = "home" | "products" | "orders";

export type SideBarLink = {
  label: string;
  icon: React.ReactNode;
  href: Section;
};

export type ProductListProps = {
    setId: React.Dispatch<React.SetStateAction<number>>
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export type NewProductProps = {
    id: number
    isEditing: boolean
}

export type initialStateProps ={
    items: Tables<'products'>[]
    loading: boolean
    error: string | null
}
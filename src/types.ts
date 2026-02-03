import type{ Session } from "@supabase/supabase-js";

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
    index: number
    id: string
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

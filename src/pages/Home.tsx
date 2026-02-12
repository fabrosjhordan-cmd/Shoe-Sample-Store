import { NavBar } from "../Components/user/NavBar"
import { ThemeToggle } from "../Components/ThemeToggle";
import { HeroSection } from "../Components/user/HeroSection";
import type { HomeProps } from "../types";
import { StoreSection } from "../Components/user/StoreSection";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchData } from "../newProductSlice";
import { Loader } from "../Components/user/Loader";
import { useEffect } from "react";

export const Home = ({ isScrolled, isDarkMode, setIsDarkMode} : HomeProps) =>{
    const shoes = useAppSelector((state)=> state.product.items);
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchData());
    }, [])
    
    if(shoes.length < 1){
        return <Loader />
    }else{
    }

    return(
        <>
            {/* Theme */}
            <ThemeToggle isScrolled={isScrolled} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            {/* NavBar */}
            <NavBar isScrolled={isScrolled} />

            {/* Main Sections */}
            <div id="home" className="min-h-screen container bg-background text-foreground overflow-x-hidden ">   
                <main>
                    <HeroSection isDarkMode={isDarkMode}/>
                    <StoreSection shoes={shoes}/>
                </main>
            </div>

            {/* Footer */}
        </>
    )
}
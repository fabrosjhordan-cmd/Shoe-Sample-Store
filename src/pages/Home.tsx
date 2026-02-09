import { NavBar } from "../Components/user/NavBar"
import { ThemeToggle } from "../Components/ThemeToggle";
import { HeroSection } from "../Components/user/HeroSection";
import type { HomeProps } from "../types";
import { StoreSection } from "../Components/user/StoreSection";
import { useAppSelector } from "../hooks";
import { Loader } from "../Components/user/Loader";


export const Home = ({ isScrolled, isDarkMode, setIsDarkMode} : HomeProps) =>{
    const isLoading = useAppSelector((state) => state.product.loading);
    
    return(
        <>
            {isLoading && <Loader />}
            {/* Theme */}
            <ThemeToggle isScrolled={isScrolled} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            {/* NavBar */}
            <NavBar isScrolled={isScrolled} />

            {/* Main Sections */}
            <div id="home" className="min-h-screen container bg-background text-foreground overflow-x-hidden ">   
                <main>
                    <HeroSection isDarkMode={isDarkMode}/>
                    <StoreSection />
                </main>
            </div>

            {/* Footer */}
        </>
    )
}
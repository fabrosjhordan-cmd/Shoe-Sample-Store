import { NavBar } from "../Components/NavBar"
import { ThemeToggle } from "../Components/ThemeToggle";
import { HeroSection } from "../Components/HeroSection";
import type { PageProps } from "../types";
import { StoreSection } from "../Components/StoreSection";
import { UseProducts } from "../api/UseProducts";
import { Loader } from "../Components/Loader";

export const Home = ({isScrolled, isDarkMode, setIsDarkMode} : PageProps) =>{
    const {  loading, error } = UseProducts();
    
    if(loading) return <Loader />
    if(error) return <div>Something went wrong..</div>

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
                    <StoreSection />
                </main>
            </div>

            {/* Footer */}
        </>
    )
}
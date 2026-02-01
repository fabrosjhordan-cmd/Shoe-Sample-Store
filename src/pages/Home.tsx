import { useEffect, useState } from "react";
import { NavBar } from "../Components/NavBar"
import { ThemeToggle } from "../Components/ThemeToggle";

export const Home = () =>{
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(()=>{
        const handleScroll = () =>{
            setIsScrolled(window.scrollY > 10);
        }
        window.addEventListener('scroll', handleScroll);
        return ()=> window.removeEventListener('scroll', handleScroll)
    }, []);

    return(
        <>
            {/* Theme */}
            <ThemeToggle isScrolled={isScrolled} />


            {/* NavBar */}
            <NavBar isScrolled={isScrolled} />

            {/* Main Sections */}
            <div>   
                <main>

                </main>
            </div>

            {/* Footer */}
        </>
    )
}
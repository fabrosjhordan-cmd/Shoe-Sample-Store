import { NavBar } from "../Components/user/NavBar"
import { ThemeToggle } from "../Components/ThemeToggle"
import type { PageProps } from "../types"

export const About = ({isScrolled, isDarkMode, setIsDarkMode} : PageProps) =>{
    return (
        <>
            {/* Theme */}
            <ThemeToggle isScrolled={isScrolled} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            
            
            {/* NavBar */}
            <NavBar isScrolled={isScrolled} />
            
        </>
    )
}
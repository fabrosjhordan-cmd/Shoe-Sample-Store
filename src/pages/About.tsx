import { NavBar } from "../Components/user/NavBar"
import { ThemeToggle } from "../Components/ThemeToggle"
import type { PageProps } from "../types"
import { AboutIntro } from "../Components/user/AboutIntro"

export const About = ({isScrolled, isDarkMode, setIsDarkMode} : PageProps) =>{
    return (
        <>
            {/* Theme */}
            <ThemeToggle isScrolled={isScrolled} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />  
            {/* NavBar */}
            <NavBar isScrolled={isScrolled} />

            <div className="min-h-screen pt-24 container bg-background text-foreground overflow-x-hidden">
                <main>
                    <AboutIntro />
                </main>
            </div>           
        </>
    )
}
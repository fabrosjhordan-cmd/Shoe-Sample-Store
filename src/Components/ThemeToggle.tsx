import { useEffect } from "react"
import type { ThemeProps } from "../types";
import { IoMdMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";

export const ThemeToggle = ({isScrolled, isDarkMode, setIsDarkMode} : ThemeProps) =>{
    
    
    useEffect(()=>{
        const storedTheme = localStorage.getItem('theme') || 'dark';
        if(storedTheme === 'dark'){
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        }else{
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }
        console.log();
    },[isDarkMode]);

    const ToggleTheme = () =>{
        if(isDarkMode){
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
            console.log('light');
        }else{
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
            console.log('dark');
        }
    }

    return (
        <div onClick={ToggleTheme} className={`fixed max-sm:hidden ${isScrolled ? 'top-2' : 'top-5'} z-0 right-8 z-50 p-2 rounded-full transition-all duration-300 focus:outline-hidden`}>
            {isDarkMode ? <IoMdMoon className="w-6 h-6 text-blue-700" /> : <IoSunny className="w-6 h-6 text-yellow-600" />}
        </div>
    )
}
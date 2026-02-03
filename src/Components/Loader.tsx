import { useEffect, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu"

export const Loader = () =>{
    const [isDarkMode, setIsDarkMode] = useState(true);
    useEffect(()=>{
            const storedTheme = localStorage.getItem('theme') || 'dark';
            if(storedTheme === 'dark'){
                document.documentElement.classList.add('dark');
                setIsDarkMode(true);
            }else{
                document.documentElement.classList.remove('dark');
                setIsDarkMode(false);
            }
        },[isDarkMode]);
    return (
        <div className="flex items-center bg-loader justify-center min-h-screen">
            <LuLoaderCircle   size={90} className="animate-spin infinite"/>
        </div>
    )
}
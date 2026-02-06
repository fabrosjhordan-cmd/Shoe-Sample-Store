import { useState } from "react"
import { BiCart, BiMenu, BiX } from "react-icons/bi";
import type { NavProps } from "../../types";

const NavLinks = [
    {href: '/#hero', label: 'Home'},
    {href: '/#store', label: 'Store'},
    {href: 'about', label: 'About'}
]
export const NavBar = ({isScrolled} : NavProps) =>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
    <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'py-2 bg-background/80 backdrop-blur-md shadow-md' : 'py-5'}`}>
        <div className="container flex items-center justify-between">
            <a href="/#hero" className="text-xl font-bold flex items-center gap-2">
                <img src='shoe-svgrepo-com.svg' className="w-6 h-6" alt="Logo"/>
                <span className="relative z-10">
                   <span className="text-primary">Sample </span>Store
                </span>
            </a>

            <div className="mx-auto hidden md:flex space-x-8">
                {NavLinks.map((page, key)=>(
                    <a href={page.href} key={key} className="text-foreground/80 hover:text-primary transition-colors duration-200">
                        {page.label}
                    </a>
                ))}
            </div>
            
            <div className=" flex items-center gap-6" >
                <a href="cart"><BiCart size={20} className="hover:text-primary hover:text-glow"/></a>
                <a href="login" className="px-6 py-2 bg-primary/70 hover:bg-primary/50 hover:text-foreground/70 rounded-full max-sm:hidden">Sign In</a>
            </div>

            <button className="md:hidden z-50">
                {isMenuOpen ? <BiX size={20} onClick={()=>setIsMenuOpen(false)} /> : <BiMenu size={20} onClick={()=>setIsMenuOpen(true)}/>}
            </button>

            <div className={`fixed inset-0 bg-background/20 backdrop-blur-xs z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto': 'opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col space-y-8 text-xl">
                    {NavLinks.map((page, key)=>(
                        <a key={key} href={page.href} onClick={()=>setIsMenuOpen(false)} className="text-foreground/80 hover:text-primary transition-colors duration-200">
                            {page.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </nav>
    )
}
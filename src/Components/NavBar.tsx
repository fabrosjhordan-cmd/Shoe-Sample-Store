import { useEffect, useState } from "react"
import { BiCart, BiMenu, BiX } from "react-icons/bi";
import type { Scroll } from "../types";

const NavLinks = [
    {href: '#hero', label: 'Home'},
    {href: '#store', label: 'Store'},
    {href: '#about', label: 'About'}
]
export const NavBar = ({isScrolled} : Scroll) =>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
    <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'py-3 bg-background/80 backdrop-blur-md shadow-xs' : 'py-5'}`}>
        <div className="container flex items-center justify-between">
            <a href="#hero" className="text-xl font-bold flex items-center gap-2">
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

            <div className=" flex items-center gap-6">
                <button><BiCart size={20} className="hover:text-primary hover:text-glow"/></button>
                <button className="px-6 py-2 bg-primary/70 hover:bg-primary hover:text-secondary/50 rounded-full max-sm:hidden">Sign In</button>
                <button className="md:hidden">
                {isMenuOpen ? <BiX size={20} /> : <BiMenu size={20}/>}
            </button>
            </div>
        </div>
    </nav>
    )
}
import { BiHome } from "react-icons/bi"
import { FaListUl, FaShoppingCart, FaUserTie  } from "react-icons/fa"
import { FaGears } from "react-icons/fa6"

const SideBarLinks = [
    {href: '/dashboard#home', label: 'Home', icon: <BiHome size={20} />},
    {href: '/dashboard#products', label: 'Products', icon: <FaListUl size={20} /> },
    {href: '/dashboard#orders', label: 'Orders', icon: <FaShoppingCart size={20} /> },
    {href: '/dashboard#employees', label: 'Employee', icon: <FaUserTie size={20} /> },
    {href: '/dashboard#settings', label: 'Settings', icon: <FaGears size={20} /> },
]
 
export const SideBar =()=>{
    return (
        <nav className="min-h-screen fixed z-40 transition-all duration-300 py-10 bg-primary/15 w-[35vh]">
            <div className="flex flex-col items-center justify-center">
                <a href="/dashboard" className="text-xl font-bold flex items-center gap-2">
                    <img src='shoe-svgrepo-com.svg' className="w-6 h-6" alt="Logo"/>
                    <span className="relative z-10">
                    <span className="text-primary">Sample </span>Store
                    </span>
                </a>

                <div className="mx-auto mt-10 flex flex-col space-y-3 w-full text-left">
                    {SideBarLinks.map((page, key)=>(
                        <a href={page.href} key={key} className="sidebar-button">
                            {page.icon}{page.label}
                        </a>
                    ))}
                </div>

            </div>
        </nav>
    )
}
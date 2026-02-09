import { BiHome } from "react-icons/bi"
import { FaListUl, FaShoppingCart  } from "react-icons/fa"
import { FaGears } from "react-icons/fa6"

const SideBarLinks = [
    {href: 'home', label: 'Home', icon: <BiHome size={20} />},
    {href: 'products', label: 'Products', icon: <FaListUl size={20} /> },
    {href: 'orders', label: 'Orders', icon: <FaShoppingCart size={20} /> },
    {href: 'settings', label: 'Settings', icon: <FaGears size={20} /> },
]
 
export const SideBar =({setScreen} : any)=>{
    return (
        <nav className="min-h-screen max-sm:hidden fixed z-40 transition-all duration-300 py-10 bg-primary/15 w-[35vh]">
            <div className="flex flex-col items-center justify-center">
                <a href="/dashboard" className="text-xl font-bold flex items-center gap-2">
                    <img src='shoe-svgrepo-com.svg' className="w-6 h-6" alt="Logo"/>
                    <span className="relative z-10">
                    <span className="text-primary">Sample </span>Store
                    </span>
                </a>

                <div className="mx-auto mt-10 flex flex-col space-y-3 w-full text-left">
                    {SideBarLinks.map((page, key)=>(
                        <button onClick={()=>setScreen(page.href)} key={key} className="sidebar-button">
                            {page.icon}{page.label}
                        </button>
                    ))}
                </div>

            </div>
        </nav>
    )
}
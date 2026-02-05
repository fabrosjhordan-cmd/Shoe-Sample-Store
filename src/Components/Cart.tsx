import { BsPlus, BsTrash } from "react-icons/bs";
import type { CartProps } from "../types";
import { NavBar } from "./NavBar";
import { ThemeToggle } from "./ThemeToggle";

export const Cart = ({items, total, isScrolled, isDarkMode, setIsDarkMode}: CartProps) =>{
    return(
    <div>
            {/* Theme */}
            <ThemeToggle isScrolled={isScrolled} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

            {/* NavBar */}
            <NavBar isScrolled={isScrolled} />
        
        <div className="container flex flex-row bg-background text-foreground overflow-x-hidden gap-8"> 
            {/* Order list */}
            <div className="relative flex flex-col min-h-screen pt-24 w-[100vh]">
                <h1 className="text-xl font-bold">Cart</h1>
                <div className="flex flex-row w-full my-2 max-sm:flex-col gap-2 rounded-lg">
                    <img src="https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/24a4bdc5-9808-4625-96eb-83ab10c4869f/JORDAN+1+RETRO+HIGH+OG+%28TD%29.png" className="h-40 w-50 max-sm:w-full max-sm:h-60 rounded-lg" />
                    <div className="flex max-sm:flex-col gap-3 flex-row justify-between lg:gap-32 w-full">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold">Jordan 1 Retro High OG</h1>
                            <p>Baby/Toddlers</p>
                        </div>
                        <div className="flex flex-col justify-between">
                            <p className="text-xl font-bold">10119.00 Php</p>
                            <div className="flex flex-row justify-between border border-foreground/30 rounded-full px-1 py-2">
                                <button><BsTrash size={25} /></button>
                                <p>1</p>
                                <button><BsPlus size={25} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
            {/* Summary */}
            <div className="relative flex flex-col w-[40vh] min-h-screen pt-24 max-sm:hidden gap-6">
                <h1 className="text-xl font-bold">Summary</h1>
                <div className="flex flex-row justify-between">
                    <p className="text-lg font-semibold">Total</p>
                    <p className="text-lg font-semibold">10119.00 Php</p>
                </div>
                <button className="py-2 bg-primary/60 hover:bg-primary/80 rounded-full">Checkout</button>
            </div>
        </div>
    </div>
    )

    
}

// {items.map((item)=>(
//                     <div className="flex flex-row" key={item.id}>
//                         <img src={item.image} />
//                         <div className="text-xl font-semibold">
//                             <h1>{item.id}</h1>
//                             <h2>{item.title}</h2>
//                             <p>${total}</p>
//                         </div>
//                     </div>
//                 ))}
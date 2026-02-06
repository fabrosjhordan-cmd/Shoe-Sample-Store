import { BsPlus, BsTrash } from "react-icons/bs";
import type { CartProps, Orders } from "../../types";
import { NavBar } from "./NavBar";
import { ThemeToggle } from "../ThemeToggle";
import { useEffect, useState } from "react";
import { BiMinus } from "react-icons/bi";
import { useCart } from "../../provider/CartProvider";

export const Cart = ({isScrolled, isDarkMode, setIsDarkMode}: CartProps) =>{
    const [orders, setOrders] = useState<Orders[]>([]); 
    const [totalPrice, setTotalPrice] = useState(0);

    const {updateQuantity, items, total} = useCart();

    useEffect(()=>{
        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('total', String(total));
        const storedOrder = localStorage.getItem('items')
        if(storedOrder){
            setOrders(JSON.parse(storedOrder) ?? [])
            console.log(JSON.parse(storedOrder))
        }
        const storedSum = localStorage.getItem('total')
        if(storedSum){
            setTotalPrice(Number(storedSum) ?? 0);
        }
        
    }, [items]);

    const checkOut = () =>{
        localStorage.setItem('items', JSON.stringify([]));
        localStorage.setItem('total', String(0));
        const storedOrder = localStorage.getItem('items')
        if(storedOrder){
            setOrders([])
        }
        const storedSum = localStorage.getItem('total')
        if(storedSum){
            setTotalPrice(0);
        }
        console.log('chckout');
    }
    
    return(
    <div>
            {/* Theme */}
            <ThemeToggle isScrolled={isScrolled} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

            {/* NavBar */}
            <NavBar isScrolled={isScrolled} />
        
        <div className="container flex flex-row bg-background text-foreground overflow-x-hidden gap-8"> 
            {/* Order list */}
            <div className="relative flex flex-col min-h-screen pt-24 w-full">
                <h1 className="text-xl font-bold">Cart</h1>
                <div className="flex flex-col w-full my-2 max-sm:flex-col gap-2 rounded-lg">
                {orders.length === 0 ? 
                <div className="flex flex-col gap-3 min-h-[50vh] items-center justify-center w-full">
                        <h1 className="text-6xl">No Items</h1>
                        <p className="text-foreground/50">Add items to your cart here</p>
                        <a href='/#store'className="bg-primary/70 px-12 py-2 rounded-sm hover:bg-primary/80">Store</a>
                </div> 
                : 
                orders.map((items)=>(
                    <div key={items.id} className="flex flex-row w-full bg-foreground/4 px-3 py-4 my-2 max-sm:flex-col gap-2 rounded-lg">
                        <img src={items.product.image} className="h-40 w-50 max-sm:w-full max-sm:h-60 rounded-lg" />
                        <div className="flex max-sm:flex-col gap-3 flex-row justify-between lg:gap-32 w-full">
                            <div className="flex flex-col">
                            <h1 className="text-xl font-bold">{items.product.title}</h1>
                            <p>{items.product.gender}</p>
                        </div>
                        <div className="flex flex-col justify-between">
                            <p className="text-xl font-bold">₱ {(items.product.avg_price * items.quantity).toFixed(2)}</p>
                            <div className="flex flex-row justify-between border border-foreground/30 rounded-full px-3 py-2">
                                {items.quantity > 1 ? <button><BiMinus onClick={()=>updateQuantity(items.id, -1)} size={25} /></button> : <button><BsTrash onClick={()=>updateQuantity(items.id, -1)} size={25} /></button>}
                                <p>{items.quantity}</p>
                                <button><BsPlus onClick={()=>updateQuantity(items.id, 1)} size={25} /></button>
                            </div>
                        </div>

                        </div>
                     </div>
                ))
                }
                </div>
            </div>   
            
            {/* Summary */}
            <div className="relative flex flex-col w-[40vh] min-h-screen pt-24 max-sm:hidden gap-6">
                <h1 className="text-xl font-bold">Summary</h1>
                <div className="flex flex-row justify-between">
                    <p className="text-lg font-semibold">Total</p>
                    <p className="text-lg font-semibold">₱ {totalPrice.toFixed(2)}</p>
                </div>
                <button onClick={checkOut} className="py-5 bg-primary text-xl font-semibold hover:bg-primary/70 rounded-full">Checkout</button>
            </div>
        </div>
    </div>
    )

    
}

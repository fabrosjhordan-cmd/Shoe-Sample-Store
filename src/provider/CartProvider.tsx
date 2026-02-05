import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { type CartType, type CartItem, type ProductProps } from "../types";

const CartContext = createContext<CartType>({
    items: [],
    addItem: ()=>{},
    updateQuantity: ()=>{},
    total: 0
});

const CartProvider = ({children} : PropsWithChildren)=>{
    const [items,setItems] = useState<CartItem[]>(()=>{
        const storedItems = localStorage.getItem('items')
        return storedItems ? JSON.parse(storedItems) : []
    })
    
    const total = items.reduce((sum, item) => sum + item.product.avg_price * item.quantity, 0)
    
    useEffect(()=>{
        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('total', String(total));
    }, [items, total])


    const addItem = (product : ProductProps) =>{
        const existingItem = items.find((item)=> item.product.id === product.id)
        if(existingItem){
            updateQuantity(existingItem?.id, 1)
            return;
        }
        const newCartItem = {
            id: crypto.randomUUID(),
            product,
            quantity: 1,
        }
        setItems((exisitingItems : any)=> [newCartItem, ...exisitingItems]);
    }

    const updateQuantity = (itemId: string, amount: 1 | -1) =>{
        setItems((existingItems)=>
        existingItems.map((item)=> itemId === item.id ? {...item, quantity: item.quantity + amount} : item)
        .filter((item)=> item.quantity > 0))
    }

    const clearCart = ()=>{
        setItems([]);
    }

    // Create a checkout logic

    return (
        <CartContext.Provider value={{items, addItem, updateQuantity, total}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

export const useCart = ()=> useContext(CartContext);
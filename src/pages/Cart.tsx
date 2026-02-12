import { BsPlus, BsTrash } from "react-icons/bs";
import type { CartProps, Orders } from "../types";
import { NavBar } from "../Components/user/NavBar";
import { ThemeToggle } from "../Components/ThemeToggle";
import { useEffect, useState } from "react";
import { BiMinus } from "react-icons/bi";
import { useCart } from "../provider/CartProvider";
import { selectProfile } from "../newProductSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { PayPal } from "../api/payments/PayPal";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "../Components/user/Loader";

export const Cart = ({loading, session, isScrolled, isDarkMode, setIsDarkMode}: CartProps) =>{
    const profile = useAppSelector((state)=> state.users.userProfile)
    const isLoading = useAppSelector((state)=>state.users.loading);
    const [orders, setOrders] = useState<Orders[]>([]); 
    const [totalPrice, setTotalPrice] = useState(0);
    const shippingFee : number = 58;
    const totalFee = totalPrice+shippingFee;
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const dispatch = useAppDispatch();
    const {updateQuantity, items, total} = useCart();
    const sum = orders.map((items)=> items.quantity).reduce((acc,val)=>acc+val, 0)
    const [payPal, setPayPal] = useState(false);

    useEffect(()=>{
        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('total', JSON.stringify(total));
        const storedOrder = localStorage.getItem('items');
        const storedSum = localStorage.getItem('total');
        if(storedOrder){
            setOrders(JSON.parse(storedOrder) ?? [])
        }
        if(storedSum){
            setTotalPrice(Number(storedSum) ?? 0);
        }
       
    }, [items, total])

    useEffect(()=>{
        localStorage.setItem('items', JSON.stringify(orders));
        localStorage.setItem('total', String(totalPrice));
    }, [orders, totalPrice]);

    useEffect(()=>{
        if(session){
            dispatch(selectProfile(session?.user.id));
            setEmail(session?.user.email ?? '');
        }
    }, [loading]);

    useEffect(()=>{
        if(isLoading) return;
        const profileAddress = profile[0]?.address || '';
        if(profileAddress){
            setAddress(profileAddress);
        }
    }, [isLoading])

    const checkOut = (event : any) =>{
        event.preventDefault();
    }

    const validateOrders = (condition: string) =>{
        if(orders.length < 1 || items.length < 1 ){
           return toast.error('The cart cannot be empty',{
                        position: "bottom-right",
                        theme: "dark",
                        closeOnClick: true,
                        hideProgressBar: true
                    })
        }
        if(email.trim() === '' || address.trim() === ''){
            return toast.error('The email and address cannot be empty',{
                        position: "bottom-right",
                        theme: "dark",
                        closeOnClick: true,
                        hideProgressBar: true
                    })
        }
        if(condition === 'open'){
            setPayPal(true);
        }
        if(condition === 'close'){
            setPayPal(false);
        }
    }

if(loading) return <Loader />

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
                    <img src={items.product.image ? items.product.image : ''} className="h-40 w-50 max-sm:w-full max-sm:h-60 rounded-lg" />
                    <div className="flex max-sm:flex-col gap-3 flex-row justify-between lg:gap-32 w-full">
                        <div className="flex flex-col">
                        <h1 className="text-xl font-bold">{items.product.name}</h1>
                        <p>{items.product.gender}</p>
                    </div>
                    <div className="flex flex-col justify-between">
                        <p className="text-xl font-bold">₱ {(items.product.price * items.quantity).toFixed(2)}</p>
                        <div className="flex flex-row justify-between border border-foreground/30 rounded-full px-3 py-2">
                            {items.quantity > 1 ? <button><BiMinus onClick={()=>{updateQuantity(items.id, -1), setPayPal(false)}} size={25} /></button> : <button><BsTrash onClick={()=>{updateQuantity(items.id, -1), setPayPal(false)}} size={25} /></button>}
                            <p>{items.quantity}</p>
                            <button><BsPlus onClick={()=>{updateQuantity(items.id, 1), setPayPal(false)}} size={25} /></button>
                        </div>
                    </div>
                    </div>
                    </div>
            ))
            }
            </div>
        </div>   
        
        {/* Summary */}
        <div className="relative flex flex-col w-[60vh] min-h-screen pt-24 pb-12 max-sm:hidden gap-2">
        <form onSubmit={checkOut} className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">Summary</h1>
            {/* Email */}
            <h1 className="text-md font-semibold">Email: </h1>
            <input type='email' onChange={(e)=>setEmail(e.target.value)} value={email} className="border p-2 rounded-md focus:outline-hidden" placeholder="Put your email here.." readOnly={session ? true : false} required/>
            {/* Address */}
            <h1 className="text-md font-semibold">Address: </h1>
            <input type='text' onChange={(e)=>setAddress(e.target.value)} value={address} className="border p-2 rounded-md focus:outline-hidden" placeholder="Put your address here.." required/>
            <p className="text-xs text-foreground/50">Note: The email you will put here will be the one who will receive the invoice from our store email, but if you are signed in as authenticated user we will use that account's email instead.</p>
            <div className="flex flex-row justify-between mt-4">
                <p className="text-sm">Quantity</p>
                <div className="text-sm">
                    <p>{sum} Pair</p>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <p className="text-sm">Shipping Fee</p>
                <div className="text-sm">
                    <p>₱ {shippingFee.toFixed(2)} </p>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-lg font-semibold">₱ {totalFee.toFixed(2)}</p>
            </div>
            {/* PayPal */}
            {payPal ? 
            <div className="flex flex-col w-full">
                <PayPal email={email} address={address} sum={sum} setTotalPrice={setTotalPrice} totalPrice={totalFee} setOrders={setOrders} orders={orders}/>
                <button onClick={()=>validateOrders('close')} className="px-4 py-2 border border-foreground/70 rounded-md">Cancel</button>
            </div>
                : 
            <button onClick={()=>validateOrders('open')} className="py-5 bg-primary text-xl font-semibold hover:bg-primary/70 rounded-full">Checkout</button>
            }
        </form>
        </div>
    </div>
        <ToastContainer limit={1}/>
    </div>
    )

    
}







// if(!session){
            //     const cart_id = crypto.randomUUID()
            //     dispatch(addOrder({cart_id, email, address, quantity: sum, totalPrice, role: 'guest', user_id: ''}));
            //     {orders.map((items)=>{
            //         const total = items.product.price * items.quantity
            //         dispatch(addOrderList({total, quantity: items.quantity, name: items.product.name, cart_id, order_id: items.id , product_id: items.product.id}));
            //     })}
            //     localStorage.setItem('items', JSON.stringify([]));
            //     localStorage.setItem('total', String(0));
            // }else{
            //     const cart_id = crypto.randomUUID()
            //     dispatch(addOrder({cart_id, email, address, quantity: sum, totalPrice, role: session.user.role, user_id: session.user.id}));
            //     {orders.map((items)=>{
            //         const total = items.product.price * items.quantity
            //         dispatch(addOrderList({total, quantity: items.quantity, name: items.product.name, cart_id, order_id: items.id , product_id: items.product.id}));
            //     })}
            //     localStorage.setItem('items', JSON.stringify([]));
            //     localStorage.setItem('total', String(0));
            // }
            // const storedOrder = localStorage.getItem('items');
            // if(storedOrder){
            //     setOrders([])
            // }
            // const storedSum = localStorage.getItem('total')
            // if(storedSum){
            //     setTotalPrice(0);
            // }
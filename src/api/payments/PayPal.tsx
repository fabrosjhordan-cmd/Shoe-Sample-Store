import { useEffect, useRef } from "react"
import type { PayPalProps } from "../../types";
import { useAuth } from "../../provider/AuthProvider";
import { addOrder, addOrderList } from "../../newProductSlice";
import { useAppDispatch } from "../../hooks";

export const PayPal = ({address, email, sum, setTotalPrice, totalPrice, setOrders, orders} : PayPalProps)=>{
    const paypal = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const {session} = useAuth();

    useEffect(()=>{
        if(!window.paypal || !paypal.current) return
        
        const pay = window.paypal.Buttons({
            createOrder: (data: any, actions: any, err: any) =>{
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: 'Shoe',
                            amount: {
                                currency_code: "PHP",
                                value: totalPrice.toFixed().toString(),
                            }
                        }
                    ]
                })
            },
            onApprove: async (data: any, actions: any)=>{
                const order = await actions.order.capture()
                console.log(order);
                if(!session){
                    const cart_id = crypto.randomUUID()
                    dispatch(addOrder({cart_id, email, address, quantity: sum, totalPrice, role: 'guest', user_id: ''}));
                    {orders.map((items)=>{
                        const total = items.product.price * items.quantity
                        dispatch(addOrderList({total, quantity: items.quantity, name: items.product.name, cart_id, order_id: items.id , product_id: items.product.id}));
                    })}
                    localStorage.setItem('items', JSON.stringify([]));
                    localStorage.setItem('total', String(0));
                }else{
                    const cart_id = crypto.randomUUID()
                    dispatch(addOrder({cart_id, email, address, quantity: sum, totalPrice, role: session.user.role, user_id: session.user.id}));
                    {orders.map((items)=>{
                        const total = items.product.price * items.quantity
                        dispatch(addOrderList({total, quantity: items.quantity, name: items.product.name, cart_id, order_id: items.id , product_id: items.product.id}));
                    })}
                    localStorage.setItem('items', JSON.stringify([]));
                    localStorage.setItem('total', String(0));
                }


                // Clear Items
                const storedOrder = localStorage.getItem('items');
                if(storedOrder){
                    setOrders([])
                }
                const storedSum = localStorage.getItem('total')
                if(storedSum){
                    setTotalPrice(0);
                }
            },
            onError: (err: any)=>{
                console.log(err)
            }
        })

        pay.render(paypal.current);

        return () => {
            pay.close()
        }
    }, [])
    
    return(
        <div>
            <div ref={paypal}></div>
        </div>
    )
}
import { useEffect, useRef } from "react"
import type { PayPalProps } from "../../types";
import { useAuth } from "../../provider/AuthProvider";
import { addOrder, addOrderList } from "../../newProductSlice";
import { useAppDispatch } from "../../hooks";
import { toast } from "react-toastify";
import emailjs from '@emailjs/browser';

export const PayPal = ({address, email, sum, shippingFee, totalFee, setTotalPrice, totalPrice, setOrders, orders} : PayPalProps)=>{
    const paypal = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const {session} = useAuth();

     const successToast = () => toast.success("Email sent!", {
        position: "bottom-right",
        hideProgressBar: true,
        theme: "dark",
        pauseOnHover: false,
        closeOnClick: true
    });

    const errorToast = () => toast.error('Error occured message not sent.',{
        position: "bottom-right",
        hideProgressBar: true,
        theme: "dark",
        pauseOnHover: false,
        closeOnClick: true
    });

    useEffect(()=>{
        if(!window.paypal || !paypal.current) return
        emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
        const pay = window.paypal.Buttons({
            createOrder: (_data: any, actions: any) =>{
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: 'Shoe',
                            amount: {
                                currency_code: "PHP",
                                value: totalFee.toFixed().toString(),
                            }
                        }
                    ]
                })
            },
            onApprove: async (_data: any, actions: any)=>{
                const order = await actions.order.capture()
                console.log(order);
                const role = session?.user.role || 'guest'
                const user_id = session?.user.id || null
                const orderList = orders.map((items)=>({
                    id: items.id,
                    prod_id: items.product.id,
                    name: items.product.name,
                    gender: items.product.gender,
                    image_url: items.product.image,
                    units: items.quantity,
                    price: items.product.price
                }))
                const cart_id = crypto.randomUUID()
                try{
                    await (dispatch(addOrder({cart_id, email, address, quantity: sum, totalFee, role: role, user_id: user_id}))).unwrap();
                    await Promise.all(orderList.map((items)=>{
                        const total = items.price * items.units
                        return dispatch(addOrderList({total, quantity: items.units, name: items.name, cart_id, order_id: items.id , product_id: items.prod_id})).unwrap();
                    }))

                    //  Clear Items
                    setOrders([])
                    setTotalPrice(0);
                    localStorage.setItem('items', JSON.stringify([]));
                    localStorage.setItem('total', String(0));
                }catch(error){
                    console.log(error)
                }
                try{
                    await emailjs.send(
                        import.meta.env.VITE_EMAILJS_SERVICE_ID,
                        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,{
                            logo: {
                                path:'https://www.svgrepo.com/show/475587/shoe.svg',
                                cid: "logo-cid"
                            },
                            email: email,
                        address: address,
                        order_id: cart_id,
                        orders: orderList,
                        cost:{
                            items_total: totalPrice,
                            shipping: shippingFee,
                            total: totalFee
                        }
                    }
                )
                successToast()
                }
            catch(error){
                console.log(error);
                errorToast()
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









// else{
//                     const cart_id = crypto.randomUUID()
//                     dispatch(addOrder({cart_id, email, address, quantity: sum, totalFee, role: session.user.role, user_id: session.user.id}));
//                     {orderList.map((items)=>{
//                         const total = items.price * items.units
//                         dispatch(addOrderList({total, quantity: items.units, name: items.name, cart_id, order_id: items.id , product_id: items.prod_id}));
//                     })}
//                     try{
//                         await emailjs.send(
//                             import.meta.env.VITE_EMAILJS_SERVICE_ID,
//                             import.meta.env.VITE_EMAILJS_TEMPLATE_ID,{
//                             logo: 'https://www.svgrepo.com/show/475587/shoe.svg',
//                             email: email,
//                             address: address,
//                             order_id: cart_id,
//                             orders: orderList,
//                             cost:{
//                                 items_total: totalPrice,
//                                 shipping: shippingFee,
//                                 total: totalFee
//                             }
//                             }
//                         )
//                         successToast()
//                     }catch(error){
//                         console.log(error);
//                         errorToast()
//                     }
//                     localStorage.setItem('items', JSON.stringify([]));
//                     localStorage.setItem('total', String(0));
//                 }

//                
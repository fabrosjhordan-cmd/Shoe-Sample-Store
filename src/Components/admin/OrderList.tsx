import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks"
import { defaultShoeImage, orderAction, type adminOrderList } from "../../types"
import { fetchData, updateSalesAdmin, viewOrdersAdmin } from "../../newProductSlice";
import { BiChevronLeft } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";

export const OrderList = ({setScreen} : adminOrderList) =>{
    const shoes = useAppSelector((state)=> state.product.items);
    const orders = useAppSelector((state)=> state.users.orderList);
    const salesId = sessionStorage.getItem('salesId');
    const findOrder = orders.filter((item)=> item.cart_id === salesId).sort((a,b)=> (b.product_id ?? 0)- (a.product_id ?? 0))
    const findShoe = shoes.filter((shoe)=>
        orders.some((item)=> item.product_id === shoe.id)
    )
    const [target,setTarget] = useState('waiting');
    const [loading, setLoading] = useState(false);
    
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchData());
        dispatch(viewOrdersAdmin(salesId))
    },[])

    useEffect(()=>{
        dispatch(updateSalesAdmin({salesId, target}))
        setLoading(true)
        setTimeout(()=>{
            setLoading(false);
        }, 3000)
        toast.success(`Status changed to ${target}`, {
            position: 'bottom-right',
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: false,
            theme: 'dark'
        })
        console.log(target);
    }, [target])

    const goBack = ()=> {
        sessionStorage.setItem('salesId', '')
        setScreen('orders');
    }

    return (
        <div className="flex flex-col gap-4 min-h-screen overflow-hidden pt-10 pb-5">
            <button onClick={goBack} className="flex flex-row items-center text-xl"><BiChevronLeft size={30}/>Back</button>
            <div className="flex flex-row min-h-[75vh] justify-start gap-6 w-full">
                <div className="flex flex-col gap-2 overflow-y-scroll">
                    {findOrder.map((order, index)=>(
                    <div key={index} className="flex flex-row bg-card px-4 gap-3 py-2 min-w-[120vh] rounded-md">
                        <div className="flex w-full h-45">
                            <img src={findShoe[index]?.image ? findShoe[index]?.image : defaultShoeImage} className="w-full rounded-md"/>
                        </div>
                        <div className="flex flex-col w-full">
                            <h1 className="text-2xl">{order.name}</h1>
                            <h3>{}</h3>
                            <p className="text-lg text-foreground/80">Quantity: {order.quantity}</p>
                        </div>
                        <div className="flex flex-end w-full">
                            <p className="text-lg font-semibold ml-auto">Total: ₱{(order.total)?.toFixed(2)}</p>
                        </div>
                    </div>
                        ))}
                </div>
                <div className="flex flex-col gap-4">
                    {orderAction.map((act, index)=>(
                        <div key={index} className="flex flex-col">
                            <button onClick={()=>setTarget(act)} className={`px-4 py-2 ${target === act ? 'bg-primary/40 border border-primary' : 'bg-card border'} ${loading ? 'bg-foreground/20' : ''} rounded-md capitalize`} disabled={loading}>{act}</button>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
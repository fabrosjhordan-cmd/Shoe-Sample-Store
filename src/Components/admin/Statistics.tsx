import { AiFillLike } from "react-icons/ai"
import { FaBox } from "react-icons/fa"
import { FaTruckFast } from "react-icons/fa6"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { useEffect } from "react"
import { fetchData, viewAllStatusPackaging, viewAllStatusShip, viewSales } from "../../newProductSlice"

export const Statistics = () =>{
    const shoes = useAppSelector((select)=> select.product.items);
    const sales = useAppSelector((select)=>select.sales.sales);
    const shipping = useAppSelector((select)=> select.sales.shipping);
    const packaging = useAppSelector((select)=> select.sales.packaging);
    const totalSales = sales.map((sum)=>sum.quantity).reduce((acc, val)=> acc+val, 0);
    const totalStock = shoes.map((sum)=>sum.stock).reduce((acc, val)=>acc+val, 0);

    const dispatch= useAppDispatch();
    useEffect(()=>{
        const sorting = sessionStorage.getItem('sort')
        const sort = sorting === 'true' ? true : false
        dispatch(viewSales(sort));
        dispatch(fetchData());
        dispatch(viewAllStatusShip());
        dispatch(viewAllStatusPackaging())
    }, [])

    return (
        <div id="home" className="flex flex-col gap-4 min-h-screen overflow-hidden py-10">
           <h1 className="text-4xl">Dashboard</h1>

           <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 items-center justify-center my-4">
            {/* Start Here */}
                <div className="flex flex-col h-full py-8 px-4 w-full text-center bg-primary/20 gap-2 rounded-md">
                    <div className="flex flex-row items-center justify-center gap-3">
                        <AiFillLike size={25} />
                        <h1 className="text-xl font-semibold">Total Sales</h1>
                    </div>
                    <h2 className="text-xl font-bold">{totalSales}</h2>
                </div>

                <div className="flex flex-col h-full py-8 px-4 w-full text-center bg-primary/20 gap-2 rounded-md">
                    <div className="flex flex-row items-center justify-center gap-3">
                        <FaBox size={25} />
                        <h1 className="text-xl font-semibold">Current Overall Stocks</h1>
                    </div>
                    <h2 className="text-xl font-bold">{totalStock}</h2>
                </div>

                <div className="flex flex-col h-full py-8 px-4 w-full text-center bg-primary/20 gap-2 rounded-md">
                    <div className="flex flex-row items-center justify-center gap-3">
                        <FaTruckFast size={25} />
                        <h1 className="text-xl font-semibold">Packaging</h1>
                    </div>
                    <h2 className="text-xl font-bold">{packaging.length}</h2>
                </div>

                <div className="flex flex-col h-full py-8 px-4 w-full text-center bg-primary/20 gap-2 rounded-md">
                    <div className="flex flex-row items-center justify-center gap-3">
                        <FaTruckFast size={25} />
                        <h1 className="text-xl font-semibold">To Ship</h1>
                    </div>
                    <h2 className="text-xl font-bold">{shipping.length}</h2>
                </div>
           </div>

           <div>
                <h2 className="text-3xl">Changes</h2>
           </div>
           
        </div>
    )
}
import { AiFillLike } from "react-icons/ai"
import { FaBox } from "react-icons/fa"
import { FaTruckFast } from "react-icons/fa6"

export const Statistics = () =>{
    return (
        <div id="home" className="flex flex-col gap-4 min-h-screen overflow-hidden py-10">
           <h1 className="text-4xl">Dashboard</h1>

           <div className="container grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-center my-4">
            {/* Start Here */}
                <div className="flex flex-col w-full text-center bg-primary/20 gap-4 py-12 px-4 rounded-md">
                    <div className="flex flex-row items-center justify-center gap-5">
                        <AiFillLike size={25} />
                        <h1 className="text-xl font-semibold">Approved Orders</h1>
                    </div>
                    <h2 className="text-xl font-bold">30</h2>
                </div>

                <div className="flex flex-col w-full text-center bg-primary/20 gap-4 py-12 px-4 rounded-md">
                    <div className="flex flex-row items-center justify-center gap-5">
                        <FaBox size={25} />
                        <h1 className="text-xl font-semibold">Current Stocks</h1>
                    </div>
                    <h2 className="text-xl font-bold">50</h2>
                </div>

                <div className="flex flex-col w-full text-center bg-primary/20 gap-4 py-12 px-4 rounded-md">
                    <div className="flex flex-row items-center justify-center gap-5">
                        <FaTruckFast size={25} />
                        <h1 className="text-xl font-semibold">To Ship</h1>
                    </div>
                    <h2 className="text-xl font-bold">27</h2>
                </div>
           </div>

           <div>
                <h2 className="text-3xl">Changes</h2>
           </div>
           
        </div>
    )
}
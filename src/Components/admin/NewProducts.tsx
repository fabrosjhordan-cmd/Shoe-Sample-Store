import { useEffect, useState } from "react";
import { ProductList } from "../../api/others/dummy"
import type { NewProductProps } from "../../types"

export const NewProducts = ({id, isEditing} : NewProductProps)=>{
    const shoes = ProductList;
    const mapped = shoes.find((prod)=> prod.id === id);
    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [gender, setGender] = useState('');
    const [price, setPrice] = useState<number>(1);

    useEffect(()=>{
        if(isEditing){
            setProductName(mapped?.title ?? '');
            setPrice(mapped?.avg_price ?? 1);
            setBrand(mapped?.brand ?? '');
            setGender(mapped?.gender ?? '');
        }else{
            setProductName('');
            setPrice(1);
            setBrand('');
            setGender('');
        }
    }, [isEditing,id])

    const handleSubmit = (event : any) =>{
        event.preventDefault();
    }
    // create a loading state

    return(
    <div id="new" className="max-sm:hidden flex flex-col  min-h-screen overflow-hidden py-10">
        <a href="dashboard#products" className="container">Back</a>
        <div className="grid grid-cols-2 h-full">
           <form onSubmit={handleSubmit} className="container flex flex-col py-4 gap-4">
            <h1 className="text-4xl">{isEditing ? "Edit Product" : "Create New Product"}</h1>
                <div className="flex flex-col">

                    <input type="file" className="py-1 px-4 bg-primary/40 rounded-md" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="font-bold">Product Name</label>
                    <input onChange={(e)=>setProductName(e.target.value)} value={productName} className="w-full border rounded-md px-4 py-1 focus:outline-hidden" placeholder="Product Name.." />
                </div>
                
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                        <label className="font-bold">Product Brand</label>
                        <input onChange={(e)=>setBrand(e.target.value)} value={brand} className="border rounded-md px-4 py-1 focus:outline-hidden" placeholder="Product Brand.." />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold">Gender</label>
                        <input onChange={(e)=>setGender(e.target.value)} value={gender} className="border rounded-md px-4 py-1 focus:outline-hidden" placeholder="Gender..." />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="font-bold">Price</label>
                    <input type='number' onChange={(e)=>setPrice(parseFloat(e.target.value))} value={price} className="border rounded-md px-4 py-1 focus:outline-hidden" placeholder="₱ 0.00..." />
                </div>
                <div className="flex w-full items-center justify-center">
                    <button className="bg-primary/70 px-4 py-2 rounded-md">{isEditing ? 'Update Product' : 'Create Product'}</button>
                </div>
           </form>

           {/* Change Logs */}
           <div className="container flex flex-col py-4 gap-4">
             <h1 className="text-4xl">Change Logs</h1>
             <div className="h-[80vh] w-full flex flex-col gap-2 items-center justify-center bg-foreground/4 rounded-md px-4 py-2 overflow-y-scroll">
                <h1 className="text-5xl font-semibold">No Entries</h1>
                <p className="text-md text-foreground/50">The product does not yet exist and doesn't have any logs</p>
                {/* Create a table here */}
                
             </div>
           </div>
        </div>
    </div>
    )
}
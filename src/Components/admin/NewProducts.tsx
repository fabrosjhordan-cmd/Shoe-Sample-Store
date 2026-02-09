import { useEffect, useState } from "react";
import type { NewProductProps } from "../../types"
import { useAppDispatch, useAppSelector } from "../../hooks";
import { BiChevronLeft } from "react-icons/bi";
import { addProduct, fetchData, updateProduct } from "../../newProductSlice";

export const NewProducts = ({id, isEditing, setScreen} : NewProductProps)=>{
    const shoes = useAppSelector((state)=> state.product.items);
    const mapped = shoes.find((prod)=> prod.id === id); 
    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [gender, setGender] = useState('');
    const [price, setPrice] = useState<number>(1);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchData());
    }, []);

    useEffect(()=>{
            if(isEditing){  
                setProductName(mapped?.name ?? '');
                setPrice(mapped?.price ?? 1);
                setBrand(mapped?.brand ?? '');
                setGender(mapped?.gender ?? '');
            }else{
                setProductName('');
                setPrice(99999);
                setBrand('');
                setGender('');
            }
    }, [isEditing, shoes])


    const handleSubmit = async (event : any) =>{
        event.preventDefault();
        if(productName.trim() === '' || brand.trim() === '' || gender.trim() === ''){
            console.log("There shouldn't be empty input")
        }
        if(isEditing){
            dispatch(updateProduct({productName, brand, gender, price, id}));
            setScreen('products');
        }else{
            dispatch(addProduct({productName, brand, gender, price}));
            setScreen('products');
        }
    }
    // create a loading state

    return(
    <div id="new" className="max-sm:hidden flex flex-col  min-h-screen overflow-hidden py-10">
        <p onClick={()=>setScreen('products')} className="flex items-center gap-2 hover:cursor-pointer hover:text-foreground/50 text-primary/80 hover:underline"><span><BiChevronLeft size={25} /></span>Back</p>
        <div className="grid grid-cols-2 h-full">
           <form onSubmit={handleSubmit} className="container flex flex-col py-4 gap-4">
            <h1 className="text-4xl">{isEditing ? "Edit Product" : "Create New Product"}</h1>
                <div className="flex flex-col">

                    <input type="file" className="py-1 px-4 bg-primary/40 rounded-md" />
                </div>
                <div className="flex flex-col w-full">
                    <label className="font-bold">Product Name</label>
                    <input onChange={(e)=>setProductName(e.target.value)} value={productName} className="w-full border rounded-md px-4 py-1 focus:outline-hidden" placeholder="Product Name.." required/>
                </div>
                
                <div className="grid grid-cols-2 gap-4 items-center justify-between">
                    <div className="flex flex-col">
                        <label className="font-bold">Product Brand</label>
                        <input onChange={(e)=>setBrand(e.target.value)} value={brand} className="border rounded-md px-4 py-1 focus:outline-hidden" placeholder="Product Brand.." required/>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold">Gender</label>
                        <input onChange={(e)=>setGender(e.target.value)} value={gender} className="border rounded-md px-4 py-1 focus:outline-hidden" placeholder="Gender..." required/>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="font-bold">Price</label>
                    <input type='number' onChange={(e)=>setPrice(parseFloat(e.target.value))} value={price} className="border rounded-md px-4 py-1 focus:outline-hidden" placeholder="₱ 0.00..." required/>
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
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { defaultShoeImage, type ProductListProps } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchData } from "../../newProductSlice";

export const Products = ({setId, setIsEditing, setScreen} : ProductListProps) =>{
    const shoes = useAppSelector((state)=> state?.product.items);
    const storedShoe = Array.isArray(shoes) ? shoes : [];
    const dispatch = useAppDispatch()
    const [currentPage, setCurrentPage] = useState<number>(()=>{
            const storedPage : any = sessionStorage.getItem('pageAdmin')
            return storedPage ? Number(storedPage) : 1;
        });
        const itemsPerPage = 10;
        const numberedPage : any[] = []
        
        const lastIndex = currentPage * itemsPerPage
        const firstIndex = lastIndex - itemsPerPage;
        const totalPage = Math.ceil(shoes.length / itemsPerPage);
        const productsPage = storedShoe.slice(firstIndex, lastIndex);

         for(let i : number = 0; i  < totalPage; i++){
            numberedPage.push(i);
        }

        useEffect(()=>{
               sessionStorage.setItem('pageAdmin', String(currentPage));
               dispatch(fetchData());
            }, [currentPage]);

        const pageSetter = (direction : any) =>{
            if(direction === 'previous'){
                setCurrentPage(currentPage-1)
            }else{
                setCurrentPage(currentPage+1)
            }
        }

    return (
        <div id="products" className="flex flex-col min-h-screen py-10 gap-4 overflow-y-hidden">
            <h1 className="text-4xl">Product List</h1>
            <div className="flex flex-row items-center justify-between">
                <button onClick={()=>{setIsEditing(false), setScreen('newProduct')}} className="flex items-center gap-8 px-6 py-2 bg-primary/40 hover:bg-primary/60 rounded-lg"><FaPlus /> New</button>
                <input type="text" className="border rounded-lg px-2 py-1 focus:outline-hidden" placeholder="Search.." />
            </div>
            {/* lists */}
            <div className="container min-h-[65vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 py-2 bg-foreground/10 rounded-lg">
                {productsPage.map((product)=>(
                    <div key={product.id} className="flex flex-col gap-2 bg-card group overflow-hidden rounded-lg shadow-xs card-hover px-2 py-1">
                        <div className="h-30 overflow-hidden mb-4">
                            <img src={product.image ? product.image : defaultShoeImage} className="w-full h-full rounded-md" />
                        </div>
                        {/* Title */}
                        <div className="relative">
                            <div className="peer h-8 font-medium text-lg overflow-hidden">{product.name}</div>
                            <div className="absolute left-0 bottom-full z-50 mt-1 hidden max-w-xs rounded bg-black px-2 py-1 text-sm text-white peer-hover:block">{product.name}</div>
                        </div>
                        {/* Gender */}
                        <div className="relative">
                            <div className="peer h-8 text-sm text-foreground/60 capitalize overflow-hidden">{product.gender}</div>
                            <div className="absolute left-0 bottom-full z-50 mt-1 hidden max-w-xs rounded bg-black px-2 py-1 text-sm text-white peer-hover:block">{product.gender}</div>
                        </div>
                        {/* Price */}
                        <div className="flex flex-row items-center justify-between mt-auto">
                            <h1 className="text-sm text-primary/90">₱ {product.price.toFixed(2)}</h1>
                            <button onClick={()=>{setId(product.id), setIsEditing(true), setScreen('newProduct')}} className="hover:text-primary"><CiEdit size={23}/></button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-row max-sm:flex-wrap items-center justify-center gap-2">
                <button onClick={()=>pageSetter('previous')} className={`flex flex-row gap-2 items-center justify-center ${currentPage === 1 ? 'py-2 px-2 rounded-sm hover:bg-foreground/20 border bg-foreground/20 cursor-pointer' : 'page-setter'}`} disabled={currentPage === 1 ? true : false}>
                    <FaChevronLeft size={15} />Previous
                </button>
                {numberedPage.map((page)=>(
                    <button key={page} onClick={()=>setCurrentPage(page+1)} className={`${currentPage === page+1 ? 'active-page border border-primary' : 'page-button'}`}>
                        {page + 1 }
                    </button>
                ))}
                <button onClick={()=>pageSetter('next')} className={`flex flex-row gap-2 items-center justify-center ${currentPage === totalPage ? 'py-2 px-2 rounded-sm hover:bg-foreground/20 border bg-foreground/20 cursor-pointer' : 'page-setter'}`} disabled={currentPage === totalPage ? true : false}>
                    Next <FaChevronRight size={15} />
                </button>
            </div>
        </div>
        
    )
}
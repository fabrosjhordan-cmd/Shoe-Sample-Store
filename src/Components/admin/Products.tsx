import { useEffect, useState } from "react";
import { ProductList } from "../../api/others/dummy"
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import type { ProductListProps } from "../../types";

export const Products = ({setId, setIsEditing} : ProductListProps) =>{
    const shoes = ProductList;
    const [currentPage, setCurrentPage] = useState<number>(()=>{
            const storedPage : any = sessionStorage.getItem('pageAdmin')
            return storedPage ? Number(storedPage) : 1;
        });
        const itemsPerPage = 14;
        const numberedPage : any[] = []
    
    
        const lastIndex = currentPage * itemsPerPage
        const firstIndex = lastIndex - itemsPerPage;
        const totalPage = Math.ceil(shoes.length / itemsPerPage);
        const productsPage = shoes.slice(firstIndex, lastIndex);

         for(let i : number = 0; i  < totalPage; i++){
            numberedPage.push(i);
        }

        useEffect(()=>{
               sessionStorage.setItem('pageAdmin', String(currentPage));
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
                <a href="dashboard#new" onClick={()=>setIsEditing(false)} className="flex items-center gap-8 px-6 py-2 bg-primary/40 hover:bg-primary/60 rounded-lg"><FaPlus /> New</a>
                <input type="text" className="border rounded-lg px-2 py-1 focus:outline-hidden" placeholder="Search.." />
            </div>
            {/* lists */}
            <div className="container min-h-[65vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 py-2 bg-foreground/10 rounded-lg">
                {productsPage.map((product)=>(
                    <div key={product.id} className="flex flex-col gap-2 group bg-card rounded-lg overflow-hidden shadow-xs card-hover px-2 py-1">
                        <div className="h-40 overflow-hidden mb-4">
                            <img src={product.image} className="w-full h-full rounded-md" />
                        </div>
                        <div className="font-medium text-lg">{product.title}</div>
                        <div className="text-sm text-foreground/60 capitalize">{product.gender}</div>
                        {/* Price */}
                        <div className="flex flex-row items-center justify-between mt-auto">
                            <h1 className="text-sm text-primary/90">${product.avg_price.toFixed(2)}</h1>
                            <a href='dashboard#new' onClick={()=>{setId(product.id), setIsEditing(true)}} className="hover:text-primary"><CiEdit size={23}/></a>
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
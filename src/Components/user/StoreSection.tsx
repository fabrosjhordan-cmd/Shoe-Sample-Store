
import { BiCart } from "react-icons/bi";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCart } from "../../provider/CartProvider";
import { ToastContainer, toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchData } from "../../newProductSlice";

export const StoreSection = () =>{
    const shoes = useAppSelector((state)=> state.product.items);
    const dispatch = useAppDispatch()
    const {addItem} = useCart();
    const [currentPage, setCurrentPage] = useState<number>(()=>{
        const storedPage : any = sessionStorage.getItem('page')
        return storedPage ? Number(storedPage) : 1;
    });

    const itemsPerPage = 6;
    const numberedPage : any[] = []

    const lastIndex = currentPage * itemsPerPage
    const firstIndex = lastIndex - itemsPerPage;
    const totalPage = Math.ceil(shoes.length / itemsPerPage);
    const productsPage = shoes.slice(firstIndex, lastIndex);

    for(let i : number = 0; i  < totalPage; i++){
        numberedPage.push(i);
    }

    useEffect(()=>{
       sessionStorage.setItem('page', String(currentPage));
       dispatch(fetchData());
    }, [currentPage]);


    const pageSetter = (direction : any) =>{
        if(direction === 'previous'){
            setCurrentPage(currentPage-1)
        }else{
            setCurrentPage(currentPage+1)
        }
    }

    const handleCart = (item : any) =>{
        if(!item){
            return
        }
        const addList : any = shoes.find((prod)=> prod.id === item)
        addItem(addList);
        toast.success('Item Added to your Cart',{
            position: "bottom-right",
            theme: "dark",
            closeOnClick: true,
            autoClose: 2000,
            pauseOnHover: true,
        })
    }

    return(
        <section id='store' className="relative rounded-xl mb-12">
                <h1 className="text-primary text-5xl font-bold mb-12 text-center">Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6 bg-secondary/2 mb-12">
                    {productsPage.map((product)=>(
                        <div key={product.id} className="relative flex flex-col gap-2 group bg-card rounded-lg overflow-hidden shadow-xs card-hover px-2 py-1">
                            <div className="h-80 overflow-hidden mb-4">
                                <img src={product.image ? product.image : ''} className="w-full h-full rounded-md" />
                            </div>
                            <div className="font-medium text-lg">{product.name}</div>
                            <div className="text-sm text-foreground/60 capitalize">{product.gender}</div>
                            <div className="text-sm text-primary/90 mt-auto">$ {product.price.toFixed(2)}</div>
                            <button onClick={()=>handleCart(product.id)} className="flex flex-row items-center justify-center gap-4 w-full py-1.5 bg-primary/30 rounded-md mt-auto mb-2 hover:scale-103 hover:bg-primary/60 duration-200"><BiCart size={20} />Add to Cart</button>
                        </div>
                    ))
                    }
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
                <ToastContainer />
        </section>
    )
}





import { FaChevronLeft, FaChevronRight, FaSortNumericDownAlt, FaSortNumericUpAlt } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { tableHeader, type adminOrderList } from "../../types";
import { useEffect, useState } from "react";
import { viewSales } from "../../newProductSlice";
import dayjs from 'dayjs';
import { RiExternalLinkLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";

export const Orders = ({setScreen} : adminOrderList) =>{
    const sales = useAppSelector((state)=> state?.sales.sales);
    const storedSales = Array.isArray(sales) ? sales : [];
    const dispatch = useAppDispatch();
    const [sort, setSort] = useState(()=>{
        const storedSort = sessionStorage.getItem('sort');
        return storedSort === 'true' ? true : false
    });
    const [currentPage, setCurrentPage] = useState<number>(()=>{
        const storedPage : any = sessionStorage.getItem('pageAdmin')
        return storedPage ? Number(storedPage) : 1;
    });
    const [currentId, setCurrentId] = useState(()=>{
       const storedId = sessionStorage.getItem('salesId');
       return storedId ? storedId : ''
    })
    const itemsPerPage = 5;
    const numberedPage : any[] = []
    
    const lastIndex = currentPage * itemsPerPage
    const firstIndex = lastIndex - itemsPerPage;
    const totalPage = Math.ceil(sales.length / itemsPerPage);
    const salesPage = storedSales.slice(firstIndex, lastIndex);

    for(let i : number = 0; i  < totalPage; i++){
        numberedPage.push(i);
    };

    useEffect(()=>{
        dispatch(viewSales(sort));
        sessionStorage.setItem('sort', String(sort));
    }, [sort]);

    useEffect(()=>{
        sessionStorage.setItem('salesId', currentId);
        const storedId = sessionStorage.getItem('salesId');
        if(storedId !== ''){
            setScreen('orderlist')
        }
    }, [currentId])
    
    const sortSetter = (condition: boolean) =>{
        setSort(condition);
    }
    
    const currentIdSetter = (id: string)=>{
        setCurrentId(id);
    }

    const pageSetter = (direction : any) =>{
        if(direction === 'previous'){
            setCurrentPage(currentPage-1)
        }else{
            setCurrentPage(currentPage+1)
        }
    }

    return (
        <div id='orders' className="flex flex-col gap-4 min-h-screen overflow-hidden pt-10 pb-5">
            {/* <h1 className="text-4xl">Orders</h1> */}
            <div className="flex flex-row justify-start gap-12 items-center">
                <div className="relative group flex flex-row gap-2 items-center">
                    <input type="search" className="border border-foreground/60 rounded-md py-1 px-2 focus:outline-hidden" placeholder="Search.." />
                    <button className="absolute right-2 focus:outline-hidden"><IoIosSearch size={20} /></button>
                </div>
                <button className="flex flex-row items-center gap-3 py-1 px-4 bg-primary/30 rounded-lg text-lg" onClick={()=>sortSetter(sort ? false : true)}>{sort ? <FaSortNumericDownAlt /> : <FaSortNumericUpAlt />}Sort</button>
            </div>
                {/* Create a pagination */}
            <table className="container border border-foreground/40">
            {/* Header */}
            <thead>
                <tr className="bg-foreground/10">
                    {tableHeader.map((header, index)=>(
                        <th key={index} className="p-2">{header}</th>
                    ))}
                </tr>
            </thead>
            {/* Body */}
            <tbody>
                {salesPage.map((data, index)=>(
                    <tr key={index} className="border border-foreground/40">
                        <td className="px-4 py-3 border-r border-foreground/40">{dayjs(data.created_at).format('MMM. D YYYY hh:mm:s')}</td>
                        <td className="px-4 py-3 border-x border-foreground/40">{data.status}</td>
                        <td className="px-4 py-3 border-x border-foreground/40">{data.cart_id}</td>
                        <td className="px-4 py-3 border-x border-foreground/40">{data.email}</td>
                        <td className="px-4 py-3 border-x border-foreground/40 capitalize">{data.role}</td>
                        <td className="px-4 py-3 border-x border-foreground/40">{data.address}</td>
                        <td className="px-4 py-3 border-l border-foreground/40">{data.quantity}</td>
                        <td className="px-4 py-3 border-l border-foreground/40"><button className="px-1 py-2 rounded-xl" onClick={()=>currentIdSetter(data.cart_id)}><RiExternalLinkLine /></button></td>
                    </tr>
                ))
            }
            </tbody>
        </table>

        <div className="flex flex-row max-sm:flex-wrap items-center justify-center gap-2 mt-auto">
            <button onClick={()=>pageSetter('previous')} className={`flex flex-row gap-2 items-center justify-center ${currentPage === 1 ? 'py-2 px-2 rounded-sm hover:bg-foreground/20 border bg-foreground/20 cursor-pointer' : 'page-setter'}`} disabled={currentPage === 1 ? true : false}>
                <FaChevronLeft size={15} />Previous
            </button>
            {numberedPage.map((page)=>(
                <button key={page} onClick={()=>setCurrentPage(page+1)} className={`${currentPage === page+1 ? 'active-page border border-primary' : 'page-button'}`}>
                    {page + 1 }
                </button>
            ))}
            <button onClick={()=>pageSetter('next')} className={`flex flex-row gap-2 items-center justify-center ${currentPage === totalPage || totalPage === 0 ? 'py-2 px-2 rounded-sm hover:bg-foreground/20 border bg-foreground/20 cursor-pointer' : 'page-setter'}`} disabled={currentPage === totalPage || totalPage === 0? true : false}>
                Next <FaChevronRight size={15} />
            </button>
        </div>
        </div>
    )
}
import axios from "axios";
import { useEffect, useState } from "react";
import type { ProductProps } from "../types";

export const UseProducts = () =>{
    const [shoes, setShoes] = useState<ProductProps[]>([]);
    const [error,setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
            const fetchProducts = async ()=>{
                try{
                const res = await axios.get("https://api.kicks.dev/v3/stockx/products?query=jordan&limit=20",{
                        headers: {
                            'Authorization': `Bearer ${import.meta.env.VITE_KICKSDB_API}`,
                        },
                    });
                    setShoes(res.data.data ?? []);
                } catch(err : any) {
                    console.log(err.res?.data.message || err.message);
                    setError(err.res?.data.message || err.message);
                }finally{
                    setLoading(false);
                }
            }
            fetchProducts();
        }, []);

        return {shoes, error, loading}
}
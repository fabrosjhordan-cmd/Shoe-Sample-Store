
import { BiCart } from "react-icons/bi";
import { UseProducts } from "../api/UseProducts";

export const StoreSection = () =>{
    const {shoes, loading, error}  = UseProducts();

    if(loading) return <div>Loading...</div>
    if(error) return <div>Something went wrong..</div>

    return(
        <section id='store' className="relative min-h-screen px-4 py-16 bg-secondary/2 rounded-xl mb-12">
                <h1 className="text-primary text-5xl font-bold mb-12 text-center">Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                    {shoes.map((product)=>(
                        <div key={product.id} className="relative flex flex-col gap-2 group bg-card rounded-lg overflow-hidden shadow-xs card-hover px-2 py-1">
                            <div className="h-40 overflow-hidden mb-4">
                                <img src={product.image} className="w-full h-full rounded-md" />
                            </div>
                            <div className="font-medium text-lg">{product.title}</div>
                            <div className="text-sm text-foreground/60 capitalize">{product.gender}</div>
                            <div className="text-sm text-primary/90">$ {product.avg_price.toFixed(2)}</div>
                            <button className="flex flex-row items-center justify-center gap-4 w-full py-1.5 bg-primary/30 rounded-md mt-auto mb-2 hover:scale-103 hover:bg-primary/60 duration-200"><BiCart size={20} />Add to Cart</button>
                        </div>
                    ))
                    }
                </div>
                <div>
                    {}
                </div>
        </section>
    )
}










{/* <div className="h-40 w-40">
    <img src={shoes[0].image} />
    <h1 className="font-bold text-xl">{shoes[0].title}</h1>
    <p>{shoes[0].brand}</p>
</div> */}
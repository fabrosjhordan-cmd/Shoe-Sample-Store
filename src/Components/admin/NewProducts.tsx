import type { NewProductProps } from "../../types"

export const NewProducts = ({id, isEditing} : NewProductProps)=>{
    return(
        <div id="new" className="max-sm:hidden flex flex-col gap-4 min-h-screen overflow-hidden py-10">
           <h1 className="text-4xl">{isEditing ? "Edit Product" : "Create New Product"}</h1>
           <div className="container flex flex-wrap items-center justify-center">
                <label>Lebel</label>
                <input className="border rounded-md px-4 py-1 focus:outline-hidden" placeholder="yes" />
           </div>
        </div>
    )
}
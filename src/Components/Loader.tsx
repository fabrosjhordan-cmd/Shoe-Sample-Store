import { LuLoaderCircle } from "react-icons/lu"

export const Loader = () =>{
    return (
        <div className="flex items-center bg-background justify-center min-h-screen">
            <LuLoaderCircle   size={90} className="animate-spin infinite"/>
        </div>
    )
}
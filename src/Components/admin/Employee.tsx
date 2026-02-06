import { FaSortAlphaDown } from "react-icons/fa"

export const Employee = () =>{
    return (
        <div id="employees" className="flex flex-col gap-4 min-h-screen overflow-hidden py-10">
            <h1 className="text-4xl">Employees</h1>
            <div className="flex flex-row justify-between items-center">
                <button className="flex flex-row items-center gap-3 py-1 px-4 bg-primary/30 rounded-lg text-lg"><FaSortAlphaDown />Sort</button>
                {/* create a table here */}
            </div>
        </div>
    )
}
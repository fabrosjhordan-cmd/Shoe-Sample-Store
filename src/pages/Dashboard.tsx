import { useState } from "react"
// import { Employee } from "../Components/admin/Employee"
import { Orders } from "../Components/admin/Orders"
import { Products } from "../Components/admin/Products"
import { Settings } from "../Components/admin/Settings"
import { SideBar } from "../Components/admin/SideBar"
import { Statistics } from "../Components/admin/Statistics"
import { ThemeToggle } from "../Components/ThemeToggle"
import type { HomeProps } from "../types"
import { NewProducts } from "../Components/admin/NewProducts"
import { useNavigate } from "react-router-dom"

export const DashBoard = ({session, isScrolled, isDarkMode, setIsDarkMode} : HomeProps) =>{
    const [id, setId] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const nav = useNavigate();

    // if(!session){
    //     nav('/');
    // }
    return (
        <>
        <ThemeToggle isScrolled={isScrolled} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div className="flex flex-row md:h-screen bg-background text-foreground overflow-x-hidden overflow-y-hidden">
            <SideBar />
            <div className="dashboard-screen">
                <Statistics />
                <Products setId={setId} setIsEditing={setIsEditing} />
                <NewProducts id={id} isEditing={isEditing}  />
                <Orders />
                {/* <Employee /> */}
                <Settings />
            </div>
    
        </div>
        </>
    )
}
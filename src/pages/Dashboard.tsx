import { Employee } from "../Components/admin/Employee"
import { Orders } from "../Components/admin/Orders"
import { Products } from "../Components/admin/Products"
import { Settings } from "../Components/admin/Settings"
import { SideBar } from "../Components/admin/SideBar"
import { Statistics } from "../Components/admin/Statistics"
import { ThemeToggle } from "../Components/ThemeToggle"
import type { HomeProps } from "../types"

export const DashBoard = ({session, isScrolled, isDarkMode, setIsDarkMode} : HomeProps) =>{
    
    return (
        <>
        <ThemeToggle isScrolled={isScrolled} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div className="flex flex-row h-screen bg-background text-foreground overflow-x-hidden overflow-y-hidden">
            <SideBar />
            <div className="dashboard-screen">
                <Statistics />
                <Products />
                <Orders />
                <Employee />
                <Settings />
            </div>
    
        </div>
        </>
    )
}
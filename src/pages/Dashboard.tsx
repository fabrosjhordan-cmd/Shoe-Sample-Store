import { useEffect, useState } from "react"
import { Orders } from "../Components/admin/Orders"
import { Products } from "../Components/admin/Products"
import { Settings } from "../Components/admin/Settings"
import { SideBar } from "../Components/admin/SideBar"
import { Statistics } from "../Components/admin/Statistics"
import { ThemeToggle } from "../Components/ThemeToggle"
import { type HomeProps } from "../types"
import { NewProducts } from "../Components/admin/NewProducts"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks"
import { Loader } from "../Components/user/Loader"

export const DashBoard = ({session, isScrolled, isDarkMode, setIsDarkMode} : HomeProps) =>{
    const [id, setId] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [screen, setScreen] = useState<any>(()=>{
        const storedScreen = sessionStorage.getItem('screen');
        return storedScreen ? storedScreen : 'home'
    });
    const isLoading = useAppSelector((state) => state.product.loading);
    const nav = useNavigate()

    useEffect(()=>{
        sessionStorage.setItem('screen', screen);
    }, [screen])
    // if(!session){
    //     nav('/');
    // }
    return (
        <>
        {isLoading && <Loader />}
        <ThemeToggle isScrolled={isScrolled} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div className="flex flex-row bg-background text-foreground overflow-x-hidden">
            <SideBar setScreen={setScreen} />
            <div className="dashboard-screen">
                {screen === 'home' && <Statistics  />}
                {screen === 'products' && <Products setId={setId} setIsEditing={setIsEditing} setScreen={setScreen} />}
                {screen === 'orders' && <Orders />}
                {screen === 'settings' && <Settings />}
                {screen === 'newProduct' && <NewProducts id={id} isEditing={isEditing} setScreen={setScreen} />}
            </div>
    
        </div>
        </>
    )
}
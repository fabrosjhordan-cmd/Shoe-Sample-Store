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
import { useAppDispatch, useAppSelector } from "../hooks"
import { Loader } from "../Components/user/Loader"
import { selectProfile } from "../newProductSlice"
import { OrderList } from "../Components/admin/OrderList"

export const DashBoard = ({loading, session, isScrolled, isDarkMode, setIsDarkMode} : HomeProps) =>{
    const [id, setId] = useState(()=>{
        const storedId = sessionStorage.getItem('id')
        return storedId ? Number(storedId) : 0
    });
    const [isEditing, setIsEditing] = useState(()=>{
        const storedEdit = sessionStorage.getItem('edit');
        return storedEdit ? Boolean(storedEdit) : false
    });
    const [screen, setScreen] = useState<any>(()=>{
        const storedScreen = sessionStorage.getItem('screen');
        return storedScreen ? storedScreen : 'home'
    });
    const isLoading = useAppSelector((state) => state.product.loading);
    const profile = useAppSelector((state)=> state.users.userProfile);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        sessionStorage.setItem('screen', screen);
        sessionStorage.setItem('edit', String(isEditing));
        sessionStorage.setItem('id', String(id));
    }, [screen, isEditing]);

    useEffect(()=>{
        if(!loading && session){
            dispatch(selectProfile(session?.user.id));
        }
        if(!loading && !session){
            navigate('/', {replace: true});
        }
    }, [loading]);

    useEffect(()=>{
        if(loading || isLoading) return;
        if(profile.length < 1) return;
        const role = profile[0]?.role || '';
        if(role !== 'admin'){
            navigate('/', {replace: true});
        }
    }, [isLoading,profile])

    return (
        <>
        {isLoading && <Loader />}
        <ThemeToggle isScrolled={isScrolled} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div className="flex flex-row bg-background text-foreground overflow-x-hidden">
            <SideBar setScreen={setScreen} />
            <div className="dashboard-screen">
                {screen === 'home' && <Statistics  />}
                {screen === 'products' && <Products setId={setId} setIsEditing={setIsEditing} setScreen={setScreen} />}
                {screen === 'orders' && <Orders setScreen={setScreen} />}
                {screen === 'settings' && <Settings />}
                {screen === 'newProduct' && <NewProducts id={id} isEditing={isEditing} setScreen={setScreen} />}
                {screen === 'orderlist' && <OrderList setScreen={setScreen} />}
            </div>
    
        </div>
        </>
    )
}
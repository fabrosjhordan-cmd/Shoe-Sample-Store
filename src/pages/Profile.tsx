import { useNavigate } from "react-router-dom"
import { ThemeToggle } from "../Components/ThemeToggle"
import { History } from "../Components/user/History"
import type { ProfileProps } from "../types"
import { NavBar } from "../Components/user/NavBar"
import { useAppDispatch, useAppSelector } from "../hooks"
import { selectProfile, viewOrdersByUser } from "../newProductSlice"
import { useEffect } from "react"
import { Settings } from "../Components/user/Settings"
import { Loader } from "../Components/user/Loader"

export const Profile = ({loading, session, isScrolled, isDarkMode, setIsDarkMode} : ProfileProps) =>{
    const user = useAppSelector((state)=> state.users.userSalesList);
    const profile = useAppSelector((state)=>state.users.userProfile);
    const profileLoading = useAppSelector((state)=>state.users.loading);
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    
    useEffect(()=>{
        if(session){
            dispatch(viewOrdersByUser(session?.user.id));
            dispatch(selectProfile(session?.user.id));
        }
        if(!loading && !session){
            navigation('/', {replace: true});
        }
    }, [loading]);
    
    if(loading || profileLoading) return <Loader /> 
    return (
        <>
        <ThemeToggle isScrolled={isScrolled} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <NavBar isScrolled={isScrolled} />
            <div className="min-h-screen container bg-background text-foreground overflow-x-hidden">
                <main>
                    <Settings loading={loading} session={session} profile={profile} />
                    <History user={user}/>
                </main>
            </div>
        </>
    )
}
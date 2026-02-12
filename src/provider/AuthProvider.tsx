import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { type AuthData } from "../types";
import { supabase } from "../supabaseClient";

const AuthContext = createContext<AuthData>({
    session: undefined,
    profile: null,
    loading: true,
})

export default function AuthProvider({children} : PropsWithChildren){
    const [session, setSession] = useState(undefined);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hydrated, setHydrated] = useState(false);

    useEffect(()=>{
        const hydrate = async () =>{
            const {data} : any = await supabase.auth.getSession();
            setSession(data.session);
            setHydrated(true);
            setLoading(false);
        }

        hydrate()
    
    const {data: listener} = supabase.auth.onAuthStateChange(
        async (_event, newSession: any) =>{
            setSession(newSession);

            if(hydrated && newSession?.user){
                setLoading(true)
                const {data: profileData} = await supabase
                .from('profiles')
                .select('*')
                .eq('id', newSession.id)
                .single()
                setProfile(profileData || null);
                setLoading(false);
            }else{
                setProfile(null);
                setLoading(false);
            }
        }
    )
   
    return ()=> listener.subscription.unsubscribe();
    }, [])



    return(
        <AuthContext value={{session, profile, loading}}>
            {children}
        </AuthContext>
    )
}

export const useAuth = () => useContext(AuthContext);
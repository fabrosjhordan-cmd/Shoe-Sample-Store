import { useState } from "react"
import { ThemeToggle } from "../Components/ThemeToggle"
import type { ThemeProps } from "../types"
import { BiChevronLeft } from "react-icons/bi";
import { supabase } from "../supabaseClient";
import { Loader } from "../Components/user/Loader";

export const SignUp = ({isDarkMode, isScrolled, setIsDarkMode}: ThemeProps) =>{
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (event : any) =>{
            event?.preventDefault()
            setLoading(true);
            
            const {error} = await supabase.auth.signUp({
                    email: email,
                    password: password
                })
                if(error){
                    console.log(error.cause || error.message);
                    setLoading(false)
                }else{ 
                    setLoading(false)
                }
        }
    
        if(loading) return <Loader />
    return(
        <div className="container md:px-24 flex flex-col items-center justify-center min-h-screen gap-9">
            <ThemeToggle isScrolled={isScrolled} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <div className={`flex text-left w-full md:px-10 lg:px-20 xl:px-80`}>
                <a href='login' className="flex flex-row gap-3 font-bold text-primary text-lg hover:underline hover:text-primary/50 "><span><BiChevronLeft size={28}/></span>Sign in</a>
            </div>

            <form className="flex flex-col text-center items-center justify-center gap-6 bg-foreground/5 py-12 px-6 rounded-xl shadow-lg" onSubmit={handleSignUp}>
                <p className="text-2xl font-semibold">Sign with your Email and Password</p>

                <input
                className="w-full border px-3 py-2 rounded-lg"
                type="email"
                placeholder="Your email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                />

                <input
                className="w-full border px-3 py-2 rounded-lg"
                type="password"
                placeholder="******"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)} 
            />

            <div>
                <button className='login-button' disabled={loading}>
                Sign up
                </button>
            </div>
            </form>
        </div>
    )
}
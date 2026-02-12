import { useEffect, useState } from "react"
import { Loader } from "../Components/user/Loader";
import { supabase } from "../supabaseClient";
import { ThemeToggle } from "../Components/ThemeToggle";
import type { ThemeProps } from "../types";
import { BiChevronLeft } from "react-icons/bi";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

export const SignIn = ({isDarkMode, isScrolled, setIsDarkMode}: ThemeProps) =>{
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {session} = useAuth();
    const navigate = useNavigate();

     useEffect(()=>{
        if(session){
            navigate('/', {replace: true});
        }
    }, [session])

    const handleLogin = async (event : any) =>{
        event?.preventDefault()
        setLoading(true);
        
        const {error} = await supabase.auth.signInWithPassword({
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

    return (
    <div className="container md:px-24 flex flex-col items-center justify-center min-h-screen gap-9">
        <ThemeToggle isScrolled={isScrolled} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div className={`flex text-left w-full md:px-10 lg:px-20 xl:px-80`}>
            <a href='/' className="flex flex-row gap-3 font-bold text-primary text-lg hover:underline hover:text-primary/50"><span><BiChevronLeft size={28}/></span>Back</a>
        </div>

        {/* Log in Form */}
        <form className="flex flex-col text-center items-center justify-center gap-4 bg-foreground/5 py-12 px-6 rounded-xl shadow-lg" onSubmit={handleLogin}>
            <p className="text-2xl font-semibold">Sign in with your Email and Password</p>
            
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
            <div className="flex w-full px-2 justify-between">
                <div className="text-primary hover:text-primary/70">
                    <a href="#">Forgot password?</a>
                </div>
                <div>
                    <a href="signup" className="text-primary hover:text-primary/70">Sign up</a>
                </div>
            </div>
            <div>
                <button className='login-button' disabled={loading}>
                Sign In
                </button>
            </div>
        </form>
        
    </div>
  )
}




// {/* <div className="text-center my-3">or</div>
//         {/* Another form of login */}
//         <div className="flex flex-col text-center items-center justify-center gap-4 bg-foreground/5 py-12 px-6 rounded-xl">
//             <input
//                 className="w-full border px-3 py-2 rounded-lg"
//                 type="email"
//                 placeholder="Your email"
//                 value={email}
//                 required={true}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//              <input
//                 className="w-full border px-3 py-2 rounded-lg"
//                 type="email"
//                 placeholder="Your email"
//                 value={email}
//                 required={true}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//              <input
//                 className="w-full border px-3 py-2 rounded-lg"
//                 type="email"
//                 placeholder="Your email"
//                 value={email}
//                 required={true}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//         </div> */}
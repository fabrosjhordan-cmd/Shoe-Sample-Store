import { useEffect, useState } from "react"
import type { UserProfileProps } from "../../types";
import { useAppDispatch } from "../../hooks";
import { updateProfile } from "../../newProductSlice";
import { useNavigate } from "react-router-dom";

export const Settings = ({profileLoading, loading, session, profile} : UserProfileProps) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastname] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(profile && session){
            setEmail(session.user.email ?? '');
            setAddress(profile[0]?.address ?? '');
            setFirstName(profile[0]?.first_name ?? '');
            setLastname(profile[0]?.last_name ?? '');
            console.log(profile)
        }
    },[loading, profile, isEditing])
    
    const handleEdit = (condition: string)=>{
        if(condition === 'save'){
            setIsEditing(false);
            if(session){
                dispatch(updateProfile({address, firstName, lastName, user_id: session.user.id}));
                navigate('/profile', {replace: true});
            }
        }else{
            setIsEditing(false);
        }
    }

    return (
        <div className="min-h-screen justify-center flex flex-col text-foreground overflow-x-hidden gap-4">               
            <div className="flex flex-col gap-4 px-6 rounded-md">
                <form className="flex flex-col gap-4 justify-center">
                    <h1 className="text-4xl font-bold mb-2">Settings</h1>
                    {/* First & Last Name */}
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-semibold">First Name</label>
                            <input onChange={(event)=>setFirstName(event.target.value)} value={firstName} placeholder="First name" autoComplete="off" readOnly={isEditing ? false : true} className="px-3 py-1 border border-foreground/10 rounded-md w-full focus:outline-hidden capitalize"/>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-semibold">Last Name</label>
                            <input onChange={(event)=>setLastname(event.target.value)} value={lastName} placeholder="Surname" autoComplete="off" readOnly={isEditing ? false : true} className="px-3 py-1 border border-foreground/10 rounded-md w-full focus:outline-hidden capitalize"/>
                        </div>
                    </div>
                    {/* Email & Password */}
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-semibold">Email</label>
                            <input type="email" onChange={(event)=>setEmail(event.target.value)} value={email} placeholder="example@gmail.com" autoComplete="off" readOnly className="px-3 py-1 border border-foreground/10 rounded-md w-full focus:outline-hidden"/>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-semibold">Password</label>
                            <input type='password' onChange={(event)=>setPassword(event.target.value)} value={password} placeholder="********" autoComplete="off" readOnly={isEditing ? false : true} className="px-3 py-1 border border-foreground/10 rounded-md w-full focus:outline-hidden"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Address</label>
                            <textarea onChange={(event)=>setAddress(event.target.value)} value={address} placeholder="Put your address here.." autoComplete="off" readOnly={isEditing ? false : true} className="px-3 py-1 border border-foreground/10 rounded-md focus:outline-hidden resize-none"/>
                    </div>
                </form>
                {isEditing ?
                <div className="flex flex-row gap-2 justify-end">
                    <button onClick={()=>handleEdit('save')} className="py-2 px-6 bg-primary/40 rounded-md">Save</button>
                    <button onClick={()=>handleEdit('cancel')}className="py-2 px-6 bg-foreground/10 rounded-md">Cancel</button>
                </div>
                :
                <div className="flex justify-end">
                    <button onClick={()=>setIsEditing(true)} className="py-2 px-12 bg-primary/40 rounded-md">Edit</button> 
                </div>
                }
             </div>
        </div>
    )
}
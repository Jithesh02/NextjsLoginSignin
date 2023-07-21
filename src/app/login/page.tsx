"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:"",
        password:"",
    })
    const [butttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading,setLoading] = React.useState(false); 

    const onLogin = async () =>{

        try{
            setLoading(true);
            const respone = await axios.post("/api/users/login", user);
            console.log(respone,'Login success');
            router.push("/profile");

        } catch(error:any) {
            console.log("Login Failed", error.message)
        } finally{
            setLoading(false);
        }


    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0)
        {
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    })
    return (<div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Login</h1>
        <hr/>
        <label>Email</label>
        <input type="text" style={{color:'black'}} onChange={(e)=>setUser({...user, email: e.target.value})} placeholder="email" />
        <label>Password</label>
        <input type="text" style={{color:'black'}} onChange={(e)=>setUser({...user, password: e.target.value})} placeholder="password" />
        <button onClick={onLogin}>Signup here</button>
        <Link href="/signup">Vist Signup here</Link>
    </div>);
}
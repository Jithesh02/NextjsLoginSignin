"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:""
    })

    const [butttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    const onSignup = async () =>{

        try{
            setLoading(true);
            console.log(user,'user')
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup sucess", response.data);
            router.push("/login");

        } catch (error: any){
            console.log('failed',error.message);
            toast.error(error.message)

        }finally {
            setLoading(false);
        }

    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }

    },[user])
    return (<div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{!loading ?'Signup' : 'Processing'}</h1>
        <hr/>
        <label>Username</label>
        <input type="text" style={{color:'black'}} onChange={(e)=>setUser({...user, username: e.target.value})} placeholder="username" />
        <label>Email</label>
        <input type="text" style={{color:'black'}} onChange={(e)=>setUser({...user, email: e.target.value})} placeholder="email" />
        <label>Password</label>
        <input type="text" style={{color:'black'}} onChange={(e)=>setUser({...user, password: e.target.value})} placeholder="password" />
        <button onClick={onSignup}>{butttonDisabled ? "No signup" : "SignUp"}</button>
        <Link href="/login">Vist login here</Link>
    </div>);
}
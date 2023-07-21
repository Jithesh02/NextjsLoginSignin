'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage(){
    const router = useRouter();
    const [data,setData] = useState("nothing")
    const logout = async ()=>{
        try{
            await axios.get('/api/users/logout')
            router.push('/login')

        } catch (error:any){
            console.log(error.message);
        }
    }
    const getUserDetails = async () =>{
        const res = await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data._id);
    }
    return(
    <div className="">
        <h1>Profile</h1>
        <hr />
        <h2>{data==='nothing'?"Nothing": <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <button onClick={logout} className="bg-blue-500 mt-4">Logout</button>
    <button onClick={getUserDetails} className="bg-red-500 mt-4">fetch users</button>
    </div>);
}
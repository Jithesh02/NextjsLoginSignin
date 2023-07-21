import { NextResponse } from "next/server";

export async function GET(){
    try{
        console.log('hi')
        const response = NextResponse.json(
            {
                messages: "Logout",
                success: true,
            }
        )
        console.log(response,'resp')
        response.cookies.set("token","",{
            httpOnly: true, expires: new Date(0)
        });
        return response;
    } catch(error:any){
        console.log('hi13',error)
        return NextResponse.json({error: error.message},{ status: 500});
    }
}
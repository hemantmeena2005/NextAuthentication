import {connect}  from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextResponse,NextRequest } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect();

export async function POST (req:NextRequest) {
    try {
        const reqBody = await req.json();
        const {email,password} = reqBody;
        console.log(reqBody);

        //check if user exit
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User doesnot exist"},{status:400})
        }
        console.log("user exists");
        
        //check if password is correct
        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Password is InCorrect"},{status:400})
        }


        //create token data
        const tokenData = {
            id : user._id,
            username:user.username,
            email : user.email
        }

        //create roken 
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!, { expiresIn : "1d"})

        const response=NextResponse.json({
            message:"Login Succesfull",
            success:true,
        })
        response.cookies.set("token" , token , {
            httpOnly:true,
            
        })
        return response;

    } catch (error : any) {
        return NextResponse.json({error:error.message},
            {status:500})
    }
}

"use client" // client side
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

const SignUpPage = () => {
  const router = useRouter();
  const [user,setUser] = React.useState({
    email : "",
    password: "",
    username:""
  })
  const [buttonDisabled ,setButtonDisabled] = React.useState(false);
  
  const [loading,setLoading] = React.useState(false);
  const onSignup = async ()=>{
    try {
      setLoading(true);
      const response  = await axios.post("/api/users/signup",user);
      console.log("Signup Scess" , response.data);
      router.push('/login');

    } catch (error:any) {
      console.log("SignUP failer : " + error.message);
      
      toast.error(error.message);
    } finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 &&
      user.username.length>0){
        setButtonDisabled(false);
      }
      else {
        setButtonDisabled(true)
      }
  },[user]);


  return (
    <div className='text-center m-auto w-[40%] flex flex-col  ' >
      <h1>{loading? "Processing" :"SignUp" }</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input type="text" className='p-2 border rounded-full border-gray-300 ml-2 text-black' id='username' value={user.username} placeholder='username'
      onChange={(e)=>setUser({...user,username:e.target.value})} 
      />
      <label htmlFor="email">email</label>
      <input type="text" className='p-2 border rounded-full border-gray-300 ml-2 text-black' id='email' value={user.email} placeholder='email'
      onChange={(e)=>setUser({...user,email:e.target.value})} 
      />
      <label htmlFor="password">password</label>
      <input type="text" className='p-2 border rounded-full border-gray-300 ml-2 text-black' id='password' value={user.password} placeholder='password'
      onChange={(e)=>setUser({...user,password:e.target.value})} 
      />
      <button onClick={onSignup} className={`bg-green-400 ${buttonDisabled?"disabled:true" :"disabled:false"}  w-fit p-2  `} >{buttonDisabled? "Enter Something" : <p>SignUp</p>}</button>
      <Link href="/login"> Visit Login Page</Link>
    </div>
  )
}

export default SignUpPage
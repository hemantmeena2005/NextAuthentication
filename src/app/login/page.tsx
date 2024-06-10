"use client";

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user)
      console.log("Login Success", response.data);
      toast.success("Login Success")
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <div className='text-center m-auto w-[40%] flex flex-col'>
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input type="text" className='p-2 border rounded-full border-gray-300 ml-2 text-black' id='email' value={user.email} placeholder='email'
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">password</label>
      <input type="text" className='p-2 border rounded-full border-gray-300 ml-2 text-black' id='password' value={user.password} placeholder='password'
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={onLogin} className='bg-blue-400 w-fit p-2' disabled={buttonDisabled}>Login here</button>
      <Link href="/signup"> Not registered yet</Link>
    </div>
  )
}

export default LoginPage

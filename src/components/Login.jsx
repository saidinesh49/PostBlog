import React, { useReducer } from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {

  const dispatch=useDispatch();
  const [error, setError]=useState("");
  const {register, handleSubmit}=useForm()


  const handleGoogleSignin=async ()=>{
    try{
      const googleLogindetails=await authService.googleSignin();
      console.log('These are login details send by google: ',googleLogindetails);
    }catch(error){
      console.log('Failed to login with Google!',error);
    }
  }

  const login=async(data)=>{
    setError("");
    try{
        const session=await authService.login(data)
        console.log("session recieved: ",session);
        if(session && session.$id){
            const userData=authService.getCurrentUser()
            if(userData)  
            {dispatch(authLogin.login(userData))
            } else{
              setError("failed to retrieve user data at login")
            }
        }
        else{     
          setError('Login session not recieved');
        }
    }
    catch(error){
      console.log("Error: ",error);
    }
    finally{
      setTimeout(()=>{
        window.location.reload(true);
      },1000)
    }
  }

  return (
    <div className='py-4 flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
         <div className='mb-2 flex justify-center'>
              <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%'/>
              </span>
         </div>
         <h2 className='text-center text-2xl font-bold leading-tight'>
           Signin to your account
         </h2>
         <p className=''>
            Dont&apos;t have an account?&nbsp;
            <Link to="/signup" 
            className='font-medium text-primary transition-all duration-200 hover:underline'>
             Sign Up
            </Link>
         </p>
          {error && <p className='text-red-600 mt-8 text-center'>
            {error}</p>}
        
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input 
                label="Email: "
                placeholder='Enter your email' 
                type='email'
                {...register("email",{
                    required:true,
                    validate:{
                        matchPattern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email id must be valid",
                    }
                })}/>
                <Input 
                label="Password" 
                type='password' 
                placeholder='Enter your password' 
                {...register("password",{
                    required:true,
                })}/>
                <Button 
                type="submit" 
                className='w-full'
                >Sign In</Button>
            </div>
        </form>
        <p className='text-center mt-8'>or</p>
        <Button 
        onClick={()=>{handleGoogleSignin();}} 
        className="my-4 py-2.5 flex flex-row justify-center w-full rounded-md space-x-3 hover:shadow-xl bg-black">
        <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
        <span className='text-slate-50'>Continue with Google</span>
       </Button>
      </div>
    </div>
  )
}

export default Login

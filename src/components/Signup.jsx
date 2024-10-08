import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate=useNavigate();
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

    const create=async(data)=>{
        setError("");
        try{
          const userData=await authService.accountCreate(data)
          if(userData){
            const userData=authService.getCurrentUser();
            if(userData) dispatch(login(userData))
            navigate("/all-posts")
          }
        }
        catch(error){
            setError(error.message);
        }
    }
    return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
         <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%'/>
            </span>
         </div>
         <h2 className='text-center text-2xl font-bold leading-tight'>Signup to create account</h2>
         <p className='mt-2 text-center text-base text-black/10'>
            Already have an account?&nbsp;
            <Link to="/login" 
            className='font-medium text-primary transition-all duration-200 hover: underline'>
            SignIn
            </Link>
         </p>
         {error && <p className='text-red-600 mt-8 text-center'>
            {error}</p>}
         <form onSubmit={handleSubmit(create)}>
            <div className='space-y-5'>
                    <Input 
                    label="Full Name: " 
                    placeholder="Enter your name"
                    {...register("name",{
                        required:true
                    })}
                    />
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
                    >Create Account</Button>
                </div>
            </form>
            <Button 
                onClick={()=>{handleGoogleSignin();}} 
                className="my-4 py-2.5 flex flex-row justify-center w-full rounded-md space-x-3 hover:shadow-xl" 
                bgColor='bg-slate-950' 
                textColor='text-white'>
                <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                <span className='text-slate-50'>Continue with Google</span>
            </Button>
        </div>
    </div>
    )
}

export default Signup

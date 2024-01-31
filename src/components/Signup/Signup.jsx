import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import Input from '../Input/Input';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import authService from '../../appwrite/auth'
import {login as authLogin} from  '../../store/authSlice'

export function Signup() {
    const dispatch = useDispatch() ; 
    const navigate=  useNavigate() ; 
    const {register , handleSubmit} = useForm() ;
    const [error , setError] = useState("");

    const submit =async (data) => {
        if(data.password.length < 8 ){
            setError('Password should be of at least 8 characters')
            return ;  
        }
        setError("") ; 
        try {
            const userData  =await authService.createAccount(data) ;
                dispatch(authLogin(userData)), 
                navigate('/') 
                
        } catch (error) {
            setError(error.message) ; 
        }
       
        
         
    }
    
  return (

    <div className="flex flex-col items-center 
        justify-center w-full">
            <div className={`mx-auto w-full max-w-lg 
            bg-gray-100 rounded-xl p-10 border border-black/10`}>

                 <div className="mb-2 flex justify-center">
                       <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                        </span>
                 </div>
                 <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                 
                 <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                          Sign in
                    </Link>
                 </p>
                 {error && <p className='text-red-600 mt-1 text-center'>{error}</p>}

                 <form className='mt-6 flex flex-col gap-3' onSubmit={handleSubmit(submit)}>
                    <Input 
                      label="Full Name:"
                      placeholder="Enter full name"
                      {
                        ...register('username',{ required:true })
                      }
                      autocomplete="off"
                    />
                   <Input
                    label="Email:"
                    placeholder="Enter Email"
                    {...register('email' ,{
                        required:true , 
                        validate: {
                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            setError("Email address must be a valid address"),
                        }
                    })}
                    autocomplete="off"
                    />
                    <Input
                    label="Password:"
                    placeholder="Enter Password"
                    {...register('password' , {required:true })}
                    className=''
                    autocomplete="off"
                    />

                    <Button type='submit'>
                        Create Account
                    </Button>
                      
                    
                 </form>

                 </div>

                 
                
        </div>
   
   
  )
}


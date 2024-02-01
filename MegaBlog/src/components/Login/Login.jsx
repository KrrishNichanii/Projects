import React, { useState } from 'react'
import { useDispatch , useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import Input from '../Input/Input';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import authService from '../../appwrite/auth'
import {login as authLogin} from  '../../store/authSlice'

export function Login() {
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
            const session  =await authService.login(data) ;
            
            if(session){
                const userData =  await authService.getCurrentUser();
                //console.log("This is userdata before giving to store " ,userData);
                if(userData)
                dispatch(authLogin(userData)) 
                navigate('/')
            }
            else{
                   setError("No such user found") ; 
            }
        } catch (error) {
            setError(error) ; 
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
                 <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                 
                 <p className="mt-2 text-center text-base text-black/60">
                    Don't have any account?
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                          Sign Up
                    </Link>
                 </p>
                 {error && <p className='text-red-600 mt-1 text-center'>{error}</p>}

                 <form className='mt-6 flex flex-col gap-3' onSubmit={handleSubmit(submit)}>
                   <Input
                    label="Email:"
                    placeholder="Enter Email"
                    autocomplete="off"
                    {...register('email' ,{
                        required:true , 
                        validate: {
                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            setError("Email address must be a valid address"),
                        }
                    })}
                    />
                    <Input
                    label="Password:"
                    placeholder="Enter Password"
                    {...register('password' , {required:true })}
                    className=''
                    autocomplete="off"
                    />

                    <Button type='submit'>
                        Submit
                    </Button>
                      
                    
                 </form>

                 </div>

                 
                
        </div>
   
   
  )
}


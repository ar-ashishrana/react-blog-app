import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login as authLogin } from '../store/authSlice'
import { Link, useNavigate } from 'react-router'
import authService from '../appwrite/auth';
import { Logo, Button, Input } from './index';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    const login = async (data)=>{
        setLoading(true);
        setError("");
        try {
            const session = await authService.login(data);
            if(session){
                const userData = await authService.getCurrentUser(data);
                if(userData){
                    dispatch(authLogin(userData));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }
    const primaryBg = useSelector((state)=>state.theme.primaryBg)
    
  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg ${primaryBg} rounded-xl p-10 border border-white/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%' />
                </span>
            </div>
            <h2 className='text-2xl text-center font-bold leading-tight'>Login to your Account</h2>
            <p className='mt-2 text-center text-xs'>
                Don't have any account? <Link to="/signup">Sign up</Link>
            </p>
            {error && (<p className='text-red-600 text-center mt-8'>{error}</p>)}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input label="Email: " placeholder="Enter your email" type="email" {...register("email", {
                        required:true,
                        validate: {
                            matchPatern: (value)=>/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/ .test(value) || "Email address must be a valid email address",
                        }
                    })} />
                    <Input label="Password: " placeholder="Enter your password" type="password" {...register("password", {
                        required:true,
                    })} />
                    <Button type='submit' className='w-full' disabled={loading}>{loading ? "Signing In" : "Sign In"}</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login

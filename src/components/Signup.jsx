import React, { useState } from 'react'
import {Logo, Input, Button } from "./index"
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/auth';
import { Link } from 'react-router';
import { login as authLogin } from '../store/authSlice';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const{ register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const handleRegister = async (data)=>{
            setError("");
            setLoading(true);
            try {
                const userData = await authService.createAccount(data);
            if(userData){
                const userData = await authService.getCurrentUser();
                if(userData) dispatch(authLogin(userData));
                navigate('/');
            }
            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
    }

    const primaryBg = useSelector((state)=> state.theme.primaryBg);

  return (
    <div className='flex items-center justify-center w-full'>
    <div className={`mx-auto w-full max-w-lg ${primaryBg} rounded-xl p-10 border border-white/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%' />
                </span>
            </div>
        <h2 className='text-2xl text-center font-bold leading-tight'>Signup for a new Account</h2>
        <p className='mt-2 text-center text-xs'>
            Already have an account? <Link to="/login">Login</Link>
        </p>
        {error && <p className='text-red-600 text-center mt-8'>{error}</p>}
       <form onSubmit={handleSubmit(handleRegister)}>
            <div className="space-y-5">
                <Input label="Name" placeholder="Enter Your Name" type="text" {...register("name", { required:true })} />
                <Input label="Email: " placeholder="Enter your email" type="email" {...register("email", {
                                    required:true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                    }
                                })} />
                <Input label="Password: " placeholder="Enter your password" type="password" {...register("password", {
                    required:true
                })} />
                <Button type='submit' className='w-full'>Sign up</Button>
            </div> 
       </form>
    </div>
</div>
  )
}

export default Signup


import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import loginCover from "/pexels-prabal-9609843.jpg"
import { setCredentials } from '../../redux/features/auth/authSlice';
import Loader from '../../components/Loader';
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector(state => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";




    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            toast.success("Logged in successfully");
            dispatch(setCredentials({ ...res }));
            navigate(redirect);


        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }

    }

    return (
        <section className='my-[5rem] flex gap-6 mx-4 lg:w-[60%] lg:mx-auto'>
            <div className='px-8 w-[25rem] py-8 flex flex-col gap-6 rounded-lg shadow-md shadow-slate-300'>
                <h1 className='text-3xl text-orange-400 font-bold'>LOGIN</h1>
                <form onSubmit={submitHandler} className='flex flex-col gap-5'>
                    <div>
                        <label htmlFor="email" className='text-gray-400 text-lg font-bold'>Email</label>
                        <br />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border-2 mt-2 border-gray-600 rounded-md hover:border-orange-400 px-2 py-[0.2rem] w-full' id='email' />
                    </div>


                    <div>
                        <label htmlFor="password" className='text-gray-400 text-lg font-bold'>Password</label>
                        <br />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border-2 mt-2 border-gray-600 rounded-md hover:border-orange-400 px-2 py-[0.2rem] w-full' id='password' />
                    </div>
                    <button disabled={isLoading} type='submit' className='bg-orange-400 text-white font-bold py-[0.5rem] px-2 rounded-md'>{isLoading ? <Loader /> : "Sign in"}</button>

                    <div className=''>
                        <p>New Customer?{" "}
                            <Link to={!redirect ? `register?redirect${redirect}` : '/register'} className='text-orange-400'>Register</Link>
                        </p>
                    </div>
                </form>
            </div>
            <div className='hidden md:block rounded-lg shadow-md shadow-slate-300'>
                <img src={loginCover} alt="" className='bg-cover w-[25rem] h-full rounded-lg' />
            </div>

        </section>
    )
}

export default Login;

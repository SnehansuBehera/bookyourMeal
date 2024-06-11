import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useUpdateProfileMutation } from '../../redux/api/usersApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router';
import Loader from '../../components/Loader';

const UpdateProfile = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    useEffect(() => {
        setUsername(userInfo.username);
        setEmail(userInfo.email);
    }, [userInfo.email, userInfo.username]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (confirmPassword === password) {
            try {
                const res = await updateProfile({ _id: userInfo._id, email, username, password }).unwrap();
                toast.success("Profile updated successfully");
                dispatch(setCredentials({ ...res }));
                navigate("/profile");

            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        } else {
            toast.error("Confirm your password correctly");
        }
    }

    return (
        <div className='flex items-center justify-center h-[100vh]'>
            <div className=' flex items-center justify-start gap-8'>
                <div className='bg-orange-400 px-4 py-52 rounded-l-lg'></div>
                <form action="" onSubmit={submitHandler} className='flex flex-col items-start justify-center gap-4 w-[20rem]'>
                    <div className='flex flex-col gap-3 w-full'>
                        <label htmlFor="username" className='text-gray-400 text-lg font-bold'>Username</label>
                        <input type="name" value={username} id='username' onChange={(e) => setUsername(e.target.value)} className='border-2 border-gray-600 rounded-md hover:border-orange-400 px-2 py-[0.2rem] w-full' />
                    </div>
                    <div className='flex flex-col gap-3 w-full'>
                        <label htmlFor="email" className='text-gray-400 text-lg font-bold'>Email</label>
                        <input type="email" value={email} id='email' onChange={(e) => setEmail(e.target.value)} className='border-2 border-gray-600 rounded-md hover:border-orange-400 px-2 py-[0.2rem] w-full' />
                    </div>
                    <div className='flex flex-col gap-3 w-full'>
                        <label htmlFor="password" className='text-gray-400 text-lg font-bold'>Password</label>
                        <input type="password" value={password} id='password' onChange={(e) => setPassword(e.target.value)} className='border-2 border-gray-600 rounded-md hover:border-orange-400 px-2 py-[0.2rem] w-full' />
                    </div>
                    <div className='flex flex-col gap-3 w-full'>
                        <label htmlFor="confirmPassword" className='text-gray-400 text-lg font-bold'>Confirm Password</label>
                        <input type="password" value={confirmPassword} id='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} className='border-2 border-gray-600 rounded-md hover:border-orange-400 px-2 py-[0.2rem] w-full' />
                    </div>
                    <button type='submit' className='bg-orange-400 text-white font-medium px-4 py-2 flex gap-4 rounded-md'>

                        {isLoading ? <Loader /> : <p>Update</p>}
                    </button>

                </form>

            </div>


        </div>
    )
}

export default UpdateProfile

import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return (
        <div className='flex items-center justify-center h-[100vh]'>
            <div className='flex items-center justify-center p-8 gap-10 rounded-l-md shadow-md shadow-slate-300'>
                <FaUserAlt style={{ color: 'orange' }} size={76} className='' />
                <div className='flex flex-col items-start justify-center gap-2'>
                    <h1 className='text-[3rem] font-semibold leading-9'>{userInfo.username}</h1>
                    <p className='text-[1rem] text-gray-500 font-normal'>{userInfo.email}</p>
                    <Link to='/profile/edit'>
                        <div className='flex justify-between items-center gap-2'>
                            <p className='text-[0.8rem] font-medium'>Edit profile</p>
                            <MdKeyboardArrowRight size={20} className='hover:translate-x-2 delay-100 duration-700' />
                        </div>

                    </Link>
                </div>

            </div>
            <div className='bg-orange-400 px-4 py-20 rounded-r-md shadow-md shadow-slate-300'></div>

        </div>
    )
}

export default Profile

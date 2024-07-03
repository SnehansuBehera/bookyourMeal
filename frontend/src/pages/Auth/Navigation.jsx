import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import './Navigation.css';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from "../../redux/api/usersApiSlice"
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import FavoritesCount from "../Products/FavoritesCount"




const Navigation = () => {

    const [dropDownMenu, setDropDownMenu] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const { userInfo } = useSelector(state => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();
    const logoutHandler = async () => {
        try {
            const res = await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
            toast.success(res.message);
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }



    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }
    const toggleDropDown = () => {
        setDropDownMenu(!dropDownMenu);
        console.log(dropDownMenu)
    }
    const closeDropDown = () => {
        setShowSidebar(false);
    }







    return (
        <div className={`${showSidebar ? 'hidden' : 'flex'} hidden h-[100vh] z-10 lg:flex bg-orange-500 text-white flex-col p-4 w-[4%] hover:w-[15%] fixed`} id='navigation-container'>


            <div className='flex flex-col justify-center gap-10 my-8'>
                <Link to='/' className='flex items-center transition-transform transform hover:translate-x-2 gap-3'>
                    <AiOutlineHome className='mr-2' size={26} />
                    <span className='hidden nav-item-name'>HOME</span>
                </Link>
                <Link to='/shop' className='flex items-center transition-transform transform hover:translate-x-2 gap-3 '>
                    <AiOutlineShopping className='mr-2' size={26} />
                    <span className='hidden nav-item-name'>SHOP</span>
                </Link>
                <Link to="/cart" className="flex relative">
                    <div className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
                    </div>

                    <div className="absolute top-9">
                        {cartItems.length > 0 && (
                            <span>
                                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                                </span>
                            </span>
                        )}
                    </div>
                </Link>
                <Link to="/favorite" className="flex relative">
                    <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
                        <FaHeart className="mt-[3rem] mr-2" size={20} />
                        <span className="hidden nav-item-name mt-[3rem]">
                            Favorites
                        </span>{" "}
                        <FavoritesCount />
                    </div>
                </Link>
            </div>



            <div className="relative">
                <button onClick={toggleDropDown} className='flex items-center transition-transform transform hover:translate-x-2 text-white focus:outline-none'>
                    {
                        userInfo ?
                            <>
                                <span>{userInfo.username}</span>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className={`ml-3 h-4 w-4 ${dropDownMenu ? 'transform rotate-180' : ''} hidden nav-item-name`}
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='white'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth="2" d={dropDownMenu ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}></path>
                                </svg></> :
                            <></>
                    }
                    {

                    }
                </button>
                {dropDownMenu && userInfo &&
                    <ul className={`absolute mt-2 space-y-2 right-0 ml-14 bg-gray-100 text-gray-600 ${userInfo.isAdmin ? '-top-50' : '-top-20'} `}>

                        {userInfo.isAdmin ?
                            <>
                                <Link to='/admin/dashboard'><li className='px-4 py-2 bg-gray-100 hover:bg-gray-400'>Dashboard</li></Link>
                                <Link to='/admin/productList'><li className='px-4 py-2 bg-gray-100 hover:bg-gray-400'>Products</li></Link>
                                <Link to='/admin/categoryList'><li className='px-4 py-2 bg-gray-100 hover:bg-gray-400'>Category</li></Link>
                                <Link to='/admin/orderList'><li className='px-4 py-2 bg-gray-100 hover:bg-gray-400'>Orders</li></Link>
                                <Link to='/admin/usersList'><li className='px-4 py-2 bg-gray-100 hover:bg-gray-400'>Users</li></Link>
                                <button onClick={logoutHandler} className='w-full text-left'><li className='px-4 py-2 bg-orange-300 hover:bg-gray-400 text-white'>Logout</li></button>
                            </> :
                            <>
                                <Link to='/profile'><li className='px-4 py-2 bg-gray-100 hover:bg-gray-400'>Profile</li></Link>
                                <button onClick={logoutHandler}><li className='px-4 py-2 bg-gray-100 hover:bg-gray-400'>Logout</li></button>
                            </>

                        }

                    </ul>
                }
            </div>

            {!userInfo && <ul className='my-8 flex flex-col gap-6'>
                <li>
                    <Link to='/login' className='flex items-center transition-transform transform hover:translate-x-2 gap-3'>
                        <AiOutlineLogin className='mr-2' size={26} />
                        <span className='hidden nav-item-name'>LOGIN</span>
                    </Link>
                </li>
                <li>
                    <Link to='/register' className='flex items-center transition-transform transform hover:translate-x-2 gap-3'>
                        <AiOutlineUserAdd className='mr-2' size={26} />
                        <span className='hidden nav-item-name'>REGISTER</span>
                    </Link>
                </li>
            </ul>
            }






        </div>
    )
}

export default Navigation;

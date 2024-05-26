import React, { useState } from 'react'
// import { FaHeart } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import './Navigation.css';

const Navigation = () => {
    const [dropDownMenu, setDropDownMenu] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }
    const toggleDropDown = () => {
        setDropDownMenu(!dropDownMenu);
    }
    const closeDropDown = () => {
        setShowSidebar(false);
    }
    return (
        <div className={`${showSidebar ? 'hidden' : 'flex'} hidden z-10 m-5 rounded-xl lg:flex bg-orange-500 text-white flex-col p-4 w-[4%] hover:w-[15%] fixed`} id='navigation-container'>
            <div className='flex flex-col justify-center gap-10 my-8'>
                <Link to='/' className='flex items-center transition-transform transform hover:translate-x-2 gap-3'>
                    <AiOutlineHome className='mr-2' size={26} />
                    <span className='hidden nav-item-name'>HOME</span>
                </Link>
                <Link to='/order' className='flex items-center transition-transform transform hover:translate-x-2 gap-3 '>
                    <AiOutlineShopping className='mr-2' size={26} />
                    <span className='hidden nav-item-name'>ORDER</span>
                </Link>
                <Link to='/cart' className='flex items-center transition-transform transform hover:translate-x-2 gap-3'>
                    <AiOutlineShoppingCart className='mr-2' size={26} />
                    <span className='hidden nav-item-name'>CART</span>
                </Link>
            </div>
            <ul className='my-8 flex flex-col gap-6'>
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
        </div>
    )
}

export default Navigation
